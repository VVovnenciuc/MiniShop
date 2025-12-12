import request from 'supertest';
import app from '../src/server.js'; // va fi ajustat când integrăm

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ email: 'test@example.com', password: '123456', name: 'Test' });
    expect(res.status).toBe(201);
  });
});
