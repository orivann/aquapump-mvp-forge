import request from 'supertest';
import { getAiChatResponse } from '../services/ai';
import { Request, Response, NextFunction } from 'express';

jest.mock('../models');
jest.mock('../services/ai');

describe('AI Routes', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('POST /api/ai/chat', () => {
    it('should return 401 Unauthorized if no token is provided', async () => {
      const app = (await import('../index')).default;
      const res = await request(app)
        .post('/api/ai/chat')
        .send({ message: 'Hello' });
      expect(res.statusCode).toEqual(401);
    });

    it('should return 200 OK if token is provided', async () => {
      jest.doMock('express-jwt', () => ({
        __esModule: true,
        expressjwt: () => (req: Request, res: Response, next: NextFunction) => {
          // @ts-ignore
          req.auth = { sub: 'user-id' };
          next();
        },
      }));
      jest.doMock('jwks-rsa', () => ({
        expressJwtSecret: () => (req: Request, res: Response, next: NextFunction) => next(),
      }));

      (getAiChatResponse as jest.Mock).mockResolvedValue('Test AI response');

      const app = (await import('../index')).default;
      const res = await request(app)
        .post('/api/ai/chat')
        .set('Authorization', 'Bearer fake-token')
        .send({ message: 'Hello' });

      expect(res.statusCode).toEqual(200);
      expect(res.body.response).toEqual('Test AI response');
    });
  });
});
