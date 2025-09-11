import { Request, Response } from 'express';
import { getAiChatResponse, getAiConfig, updateAiConfig } from '../services/ai';

export const getAiConfigController = (req: Request, res: Response) => {
    try {
        const config = getAiConfig();
        res.json(config);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAiConfigController = (req: Request, res: Response) => {
    try {
        const { service, model } = req.body;
        if (!service || !model) {
            return res.status(400).json({ message: 'Invalid configuration data' });
        }
        const config = updateAiConfig(service, model);
        res.json({ message: 'AI configuration updated successfully', config });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const chatController = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        const response = await getAiChatResponse(message);
        res.json({ response });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
