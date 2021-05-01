import request from 'supertest';
import { Connection, createConnection, getConnection } from 'typeorm';
import app from '../app';

let connection: Connection;

describe('Logout',() => {

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

        await request(app).post('/user').send({
            name:'Alfredo Holz Junior',
            email:'alfredo@localhost.com.br',
            password:'123456'
        })
    });

    afterAll(async () => {
        const mainConnection = getConnection(); 

        await connection.close();
        await mainConnection.close();
    });

    it('Logout user', async () => {
        var response = await request(app).post('/login')
        .send({
            email:'alfredo@localhost.com.br',
            password: '123456'
        });

        const { token } = response.body;

        response = await request(app).post('/logout')
        .set({'Authorization':`Bearer ${token}`});

        expect(response.body.message).toBe('success');

        response = await request(app).post('/logout')
        .set({'Authorization':`Bearer ${token}`});

        expect(response.body.error).toBe('invalid token');
    });
});