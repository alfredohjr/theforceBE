import request from 'supertest';
import app from '../app';

describe('Main',() => {
    it('Initial test', async () => {
        const response = await request(app).get('/');

        expect(response.body.message).toBe('Ola');
    })
})