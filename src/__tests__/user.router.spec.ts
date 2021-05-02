import request from 'supertest';
import { Connection, createConnection, getConnection } from 'typeorm'; 

import app from '../app';
import CreateConnection from '../database';

let connection: Connection;

describe('User', () => {

    beforeAll(async () => {
        connection = await createConnection();

        await connection.query('DROP TABLE IF EXISTS TOKENS');
        await connection.query('DROP TABLE IF EXISTS STOCKMOVEMENT');
        await connection.query('DROP TABLE IF EXISTS STOCKS');
        await connection.query('DROP TABLE IF EXISTS PRODUCTS_LOG');
        await connection.query('DROP TABLE IF EXISTS DEPOSITS');
        await connection.query('DROP TABLE IF EXISTS DOCUMENTS');
        await connection.query('DROP TABLE IF EXISTS PRODUCTS');
        await connection.query('DROP TABLE IF EXISTS USERS');
        await connection.query('DROP TABLE IF EXISTS migrations');
        await connection.runMigrations();
    });

    afterAll(async () => {
        const mainConnection = getConnection(); 

        await connection.close();
        await mainConnection.close();
    });

    it('Create user', async () => {
        var response = await request(app).post('/user');
        expect(response.body.error).toBe('Please! send name, email and password!');

        response = await request(app).post('/user').send({
         name: 'Alfredo Holz Junior',
         email: 'alfredo@localhost.com.br',
         password: '123456',
        });

        expect(response.body.name).toBe('Alfredo Holz Junior');
        expect(response.body.email).toBe('alfredo@localhost.com.br');
        expect(response.body.password).toBeUndefined();
        expect(response.body.id).toBeUndefined();

        response = await request(app).post('/user').send({
            name: 'Alfredo Holz Junior',
            email: 'alfredo@localhost.com.br',
            password: '123456',
           });
        expect(response.body.error).toBe('Email already used!');
    })

    
    it('Alter user name', async () => {

        var response = await request(app).post('/login')
        .send({
            email: 'alfredo@localhost.com.br',
            password: '123456'
        });

        const {token} = response.body;
        
        response = await request(app).put('/user')
        .set({'Authorization':`Bearer ${token}`})
        .send({
            name: 'Alfredo Holz Junior 2',
            email: 'alfredo@localhost.com.br',
            password: '123456'
        });
        
        expect(response.body.name).toBe('Alfredo Holz Junior 2');
    });
    
    it('Alter user password', async () => {
        
        var response = await request(app).post('/login')
        .send({
            email: 'alfredo@localhost.com.br',
            password: '123456'
        });

        const {token} = response.body;

        response = await request(app).put('/user')
        .set({'Authorization':`Bearer ${token}`})
        .send({
            newPassword: '654321',
            password: '123456',
            email: 'alfredo@localhost.com.br'
        })

        expect(response.status).toBe(200);
    });

    it('Delete user', async () => {
        var response = await request(app).post('/login')
        .send({
            email: 'alfredo@localhost.com.br',
            password: '654321'
        });

        const {token} = response.body;

        response = await request(app).delete('/user')
        .set({'Authorization':`Bearer ${token}`});

        expect(response.body.error).toBe('please, send email and password.');

        response = await request(app).delete('/user')
        .set({'Authorization':`Bearer ${token}`})
        .send({
            email: 'alfredo@localhost.com.br',
            password: '654321'
        });
        expect(response.body.message).toBe('user deleted');

        response = await request(app).delete('/user')
        .set({'Authorization':`Bearer ${token}`})
        .send({
            email: 'alfredo@localhost.com.br',
            password: '654321'
        });
        expect(response.body.error).toBe('invalid token');
    });
})