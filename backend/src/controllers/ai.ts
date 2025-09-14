import { Request, Response } from 'express';
import { query } from '../models';
import { getAiChatResponse, getAiConfig, updateAiConfig } from '../services/ai';

export const getAiConfigController = (req: Request, res: Response) => {
    try {
        const config = getAiConfig();
        res.json(config);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

import { query } from '../models';

export const contactController = async (req: Request, res: Response) => {
    try {
        const { name, email, company, phone, service, message } = req.body;
        await query(
            'INSERT INTO contact_submissions (name, email, company, phone, service, message) VALUES ($1, $2, $3, $4, $5, $6)',
            [name, email, company, phone, service, message]
        );
        res.status(200).json({ message: 'Contact form submitted successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
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
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
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
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
