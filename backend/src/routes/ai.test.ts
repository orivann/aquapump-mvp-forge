import request from 'supertest';
import { getAiChatResponse } from '../services/ai';

jest.mock('../models');
jest.mock('../services/ai');

describe('AI Routes', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('POST /api/ai/chat', () => {
    it('should return 200 OK and an AI response', async () => {
      (getAiChatResponse as jest.Mock).mockResolvedValue('Test AI response');

      const app = (await import('../index')).default;
      const res = await request(app)
        .post('/api/ai/chat')
        .send({ message: 'Hello' });

      expect(res.statusCode).toEqual(200);
      expect(res.body.response).toEqual('Test AI response');
    });
  });
});
