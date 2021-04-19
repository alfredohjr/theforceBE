import { response } from 'express';
import request from 'supertest';
import { Connection, createConnection, getConnection } from 'typeorm'; 

import app from '../app';
import CreateConnection from '../database';

describe('Main',() => {
    it('Initial test', async () => {
        const response = await request(app).get('/');

        expect(response.body.message).toBe('Ola');
    })
})

let connection: Connection;

describe('User', () => {

    beforeAll(async () => {
        connection = await createConnection();

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
    })

    it('Delete user', async () => {
        var response = await request(app).delete('/user');
        expect(response.body.error).toBe('error for delete user!');

        response = await request(app).delete('/user').send({
            token:'1',
            email: 'alfredo@localhost.com.br'
        });

        expect(response.body.message).toBe('User deleted');
    });

    it('Alter user name', async () => {
        const response = await request(app).put('/user').send({
            token: '1',
            name: 'Alfredo Holz Junior 2' 
        })

        expect(response.body.name).toBe('Alfredo Holz Junior 2');
    });

    it('Alter user password', async () => {
        const response = await request(app).put('/user').send({
            token: '1',
            password: 'newPassword' 
        })

        expect(response.body.message).toBe('success');
    });
})