// AuthController.test.ts

import request from 'supertest';
import App from '../../index'; 

describe('AuthController', () => {
  describe('register', () => {
    it('should return a 400 status code when the password is missing in the request body', async () => {
      const response = await request(App)
        .post('/api/v1/auth/register')
        .send({ username: 'testUser' });

      expect(response.status).toBe(400);
    //   expect(response.body.message).toBe('Username and password are required');
    });
  });
});
describe('AuthController', () => {
  describe('register', () => {
    it('should return an error when the username is missing in the request body', async () => {
      const response = await request(App)
        .post('/api/v1/auth/register')
        .send({ password: 'password123' });

      expect(response.status).toBe(400);
    //   expect(response.body.message).toBe('Username and password are required');
    });
  });
});