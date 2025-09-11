import { Router } from 'express';
import { chatController, getAiConfigController, updateAiConfigController } from '../controllers/ai';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/chat', chatController);

// The admin routes for AI config will be protected
router.get('/admin/ai-config', authMiddleware, getAiConfigController);
router.post('/admin/ai-config', authMiddleware, updateAiConfigController);

export default router;
