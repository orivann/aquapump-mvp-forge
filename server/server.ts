import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { createClient } from 'redis';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://redis:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

app.use(cors());
app.use(express.json());

// Middleware to protect routes
const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_default_secret');
        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed: Invalid token' });
    }
};


app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;

    const adminUser = process.env.ADMIN_USER || 'admin';
    const adminPasswordHash = process.env.ADMIN_PASSWORD || '$2a$10$vI8aWBz21.2V7s4hA5G45uLp2f.F9A7z0z2a.q2a7z0z2a.q2a7z0'; // Default hash for "password"

    const isPasswordValid = bcrypt.compareSync(password, adminPasswordHash);

    if (username === adminUser && isPasswordValid) {
        const token = jwt.sign(
            { username: adminUser, role: 'admin' },
            process.env.JWT_SECRET || 'your_default_secret',
            { expiresIn: '1h' }
        );
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.get('/api/admin/metrics', authMiddleware, async (req, res) => {
    try {
        const info = await redisClient.info();
        const allKeys = await redisClient.keys('*');
        const keyspace = await redisClient.info('keyspace');
        const db0 = keyspace.split('\\r\\n').find(line => line.startsWith('db0'));
        const keyspaceHits = await redisClient.info('stats').then(info => info.match(/keyspace_hits:(\d+)/)?.[1]);
        const keyspaceMisses = await redisClient.info('stats').then(info => info.match(/keyspace_misses:(\d+)/)?.[1]);

        const metrics = {
            redis_version: info.match(/redis_version:([\d.]+)/)?.[1],
            uptime_in_days: info.match(/uptime_in_days:(\d+)/)?.[1],
            connected_clients: info.match(/connected_clients:(\d+)/)?.[1],
            used_memory_human: info.match(/used_memory_human:([\d.]+[KMGTPEZY])/)?.[1],
            total_keys: allKeys.length,
            keyspace_hits: keyspaceHits ? parseInt(keyspaceHits, 10) : 0,
            keyspace_misses: keyspaceMisses ? parseInt(keyspaceMisses, 10) : 0,
        };
        res.json(metrics);
    } catch (error) {
        console.error('Error fetching Redis metrics:', error);
        res.status(500).json({ message: 'Failed to fetch Redis metrics' });
    }
});

// In-memory store for AI configuration
let currentAiConfig = {
    service: 'openai',
    model: 'gpt-5-2025-08-07',
};

app.get('/api/admin/ai-config', authMiddleware, (req, res) => {
    res.json(currentAiConfig);
});

app.post('/api/admin/ai-config', authMiddleware, (req, res) => {
    const { service, model } = req.body;
    if (service && model) {
        currentAiConfig = { service, model };
        res.json({ message: 'AI configuration updated successfully', config: currentAiConfig });
    } else {
        res.status(400).json({ message: 'Invalid configuration data' });
    }
});


const getSystemPrompt = () => `You are an AI assistant for AquaPump Industries, a new provider of industrial pumping solutions.

COMPANY CONTEXT:
- We are a subsidiary of AQUATECH (www.aquatech.co.il), a leader in water treatment solutions.
- We specialize in centrifugal pumps, submersible pumps, and custom solutions for various industries.
- We serve manufacturing, oil & gas, water treatment, mining, agriculture, and construction industries.
- We offer installation, maintenance, and repair services.
- Our headquarters are in Dallas, TX, with regional offices in Houston and Oklahoma City.

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
    const { message } = req.body;
    const { service: aiService, model } = currentAiConfig;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const cacheKey = `${aiService}:${model}:${message}`;

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
