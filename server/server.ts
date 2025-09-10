import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { createClient } from 'redis';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://redis:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

app.use(cors());
app.use(express.json());

const getSystemPrompt = () => `You are an AI assistant for AquaPump Industries, a leading provider of industrial pumping solutions with over 25 years of experience.

COMPANY CONTEXT:
- We specialize in centrifugal pumps, submersible pumps, and custom solutions
- We serve manufacturing, oil & gas, water treatment, mining, agriculture, and construction industries
- We offer installation, maintenance, repair, and 24/7 emergency services
- Based in Dallas, TX with offices in Houston and Oklahoma City

YOUR ROLE:
- Help customers select the right pump for their applications
- Provide technical specifications and performance data
- Assist with quote requests and service scheduling
- Offer maintenance and troubleshooting advice
- Be professional, knowledgeable, and solution-focused

AVAILABLE PRODUCTS:
1. Centrifugal Pumps (AquaCent series): 150-1000 GPM, $2,450-$8,950
2. Submersible Pumps (AquaSub series): 200-800 GPM, $3,250-$9,850
3. Custom Solutions: Engineered for specific requirements

SERVICES:
- Installation & Setup: $850+, 2-5 business days
- Maintenance Plans: $299-$999/month
- 24/7 Emergency Service: 2-4 hour response
- Custom Engineering: 2-8 weeks

Always ask relevant questions to understand customer needs and recommend appropriate solutions. Encourage users to contact our team for detailed quotes and technical consultations.`;

app.post('/api/ai', async (req, res) => {
    const { message, aiService } = req.body;

    if (!message || !aiService) {
        return res.status(400).json({ error: 'Message and aiService are required' });
    }

    const cacheKey = `${aiService}:${message}`;

    try {
        const cachedResponse = await redisClient.get(cacheKey);

        if (cachedResponse) {
            return res.json({ response: cachedResponse, fromCache: true });
        }
    } catch (error) {
        console.error('Redis error:', error);
    }


    let apiKey;
    let apiUrl;
    let requestBody;
    let headers;

    const messages = [
        { role: 'system', content: getSystemPrompt() },
        { role: 'user', content: message }
    ];

    try {
        switch (aiService) {
            case 'openai':
                apiKey = process.env.OPENAI_API_KEY;
                apiUrl = 'https://api.openai.com/v1/chat/completions';
                headers = {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                };
                requestBody = {
                    model: 'gpt-5-2025-08-07',
                    messages,
                    temperature: 0.7,
                    max_tokens: 500,
                };
                break;
            case 'claude':
                apiKey = process.env.CLAUDE_API_KEY;
                apiUrl = 'https://api.anthropic.com/v1/messages';
                headers = {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'anthropic-version': '2023-06-01',
                };
                requestBody = {
                    model: 'claude-sonnet-4-20250514',
                    messages: [{ role: 'user', content: message }],
                    system: getSystemPrompt(),
                    max_tokens: 500,
                };
                break;
            case 'perplexity':
                apiKey = process.env.PERPLEXITY_API_KEY;
                apiUrl = 'https://api.perplexity.ai/chat/completions';
                headers = {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                };
                requestBody = {
                    model: 'llama-3.1-sonar-large-128k-online',
                    messages,
                    temperature: 0.7,
                    max_tokens: 500,
                };
                break;
            case 'grok':
                apiKey = process.env.GROK_API_KEY;
                apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
                headers = {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                };
                requestBody = {
                    model: 'llama3-8b-8192',
                    messages,
                    temperature: 0.7,
                    max_tokens: 500,
                };
                break;
            default:
                return res.status(400).json({ error: 'Unsupported AI service' });
        }

        if (!apiKey) {
            return res.status(500).json({ error: `API key for ${aiService} is not configured` });
        }

        const response = await axios.post(apiUrl, requestBody, { headers });

        let aiResponse;
        switch (aiService) {
            case 'openai':
            case 'grok':
                aiResponse = response.data.choices[0].message.content;
                break;
            case 'claude':
                aiResponse = response.data.content[0].text;
                break;
            case 'perplexity':
                aiResponse = response.data.choices[0].message.content;
                break;
        }

        try {
            await redisClient.set(cacheKey, aiResponse, {
                EX: 3600 // cache for 1 hour
            });
        } catch (error) {
            console.error('Redis error:', error);
        }


        res.json({ response: aiResponse, fromCache: false });
    } catch (error: any) {
        console.error(`Error calling ${aiService} API:`, error.response ? error.response.data : error.message);
        res.status(500).json({ error: `Failed to get response from ${aiService}` });
    }
});

const startServer = async () => {
    await redisClient.connect();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startServer();
