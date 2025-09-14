import axios from 'axios';

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

// In-memory store for AI configuration
let currentAiConfig = {
    service: 'openai',
    model: 'gpt-5-2025-08-07',
};

export const getAiConfig = () => currentAiConfig;

export const updateAiConfig = (service: string, model: string) => {
    currentAiConfig = { service, model };
    return currentAiConfig;
};

export const getAiChatResponse = async (message: string) => {
    const { service: aiService } = currentAiConfig;

    if (!message) {
        throw new Error('Message is required');
    }

    // Caching is removed as Redis is replaced by PostgreSQL.
    // A simple caching mechanism can be implemented with a new table in PostgreSQL if needed.

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
                throw new Error('Unsupported AI service');
        }

        if (!apiKey) {
            throw new Error(`API key for ${aiService} is not configured`);
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

        return aiResponse;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error(`Error calling ${aiService} API:`, error.response ? error.response.data : error.message);
        } else {
            console.error(`Error calling ${aiService} API:`, error);
        }
        throw new Error(`Failed to get response from ${aiService}`);
    }
};
