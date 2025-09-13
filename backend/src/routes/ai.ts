import { Router } from 'express';
import { chatController, getAiConfigController, updateAiConfigController } from '../controllers/ai';

const router = Router();

router.post('/chat', chatController);

// The admin routes for AI config will be protected
router.get('/admin/ai-config', getAiConfigController);
router.post('/admin/ai-config', updateAiConfigController);

export default router;
