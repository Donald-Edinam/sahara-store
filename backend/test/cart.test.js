import request from 'supertest';
import { expect } from 'chai';
import app from '../index.js';
import dbClient from '../config/dbConfig.js';

before(async () => {
    await dbClient.connect();
});

describe('Cart Operations', () => {
    let token;
    let sessionCookies;

    it('should add items to the cart before authentication', async () => {
        const response = await request(app)
            .post('/api/carts')
            .send({ productId: '66c634672d7e3ef43be90a74', quantity: 2 })
            .expect(201);
        
        sessionCookies = response.headers['set-cookie']; // Capture the session cookies
        expect(response.body).to.be.an('array').that.is.not.empty;
    });

    it('should get the session cart before authentication', async () => {
        const response = await request(app)
            .get('/api/cart')
            .set('Cookie', sessionCookies) // Send the captured session cookies
            .expect(200);

        console.log('cart before auth', response.body);
        expect(response.body).to.be.an('array').that.is.not.empty;
    });

    it('should log in the user and move session cart items to the user cart', async function() {
        this.timeout(8000); // Set timeout to 8 seconds

        const loginResponse = await request(app)
            .post('/auth/login')
            .send({ email: 'johndoe.com', password: '123' }) // Corrected email format
            .set('Cookie', sessionCookies) // Send the captured session cookies
            .expect(200);

        token = loginResponse.body.token; // Capture the token
        console.log('Login token:', token);
    })

    it('should get the cart after authentication', async () => {
        const cartResponse = await request(app)
            .get('/api/cart')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        console.log('cart after auth', cartResponse.body);
    });

    it('should add items to the cart after authentication', async function() {
        this.timeout(5000);

        const response = await request(app)
            .post('/api/carts')
            .set('Authorization', `Bearer ${token}`)
            .send({ productId: '66c5fcf137c47222223b55ce', quantity: 1 })
            .expect(201);

        console.log('Cart after adding new item:', response.body);
    });
});
