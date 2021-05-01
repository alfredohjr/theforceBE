import request from 'supertest';
import { Connection, createConnection, getConnection } from 'typeorm'; 

import app from '../app';
import CreateConnection from '../database';

let connection: Connection;

describe('Product', () => {

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

    it('Create product', async () => {
        
        var response = await request(app).post('/product')
        .send({
            name: 'numeroUm'
        });

        expect(response.body.error).toBe('please, send valid token');

        response = await request(app).post('/login')
        .send({
            email: 'alfredo@localhost.com.br',
            password: '123456'
        });

        const {token} = response.body;

        response = await request(app).post('/product')
        .set({'Authorization': `Bearer ${token}`})
        .send({
            name: 'numeroUm'
        });

        expect(response.body.name).toBe('numeroUm');

        response = await request(app).post('/product')
        .set({'Authorization': `Bearer ${token}`})
        .send({
            name: 'numeroUm'
        });

        expect(response.body.error).toBe('duplicate name');
    });

    
    it('Alter Product', async () => {});
    
    it('Delete Product', async () => {});
})