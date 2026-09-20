import express from 'express';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World: ' + process.env.OPENAI_API_KEY);
});

app.get('/api/v1/chat', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// ConversationId -> lastResponseId
// conv1 -> 100
// conv2 -> 4
const conversation = new Map<string, string>();

app.post('/api/v1/chat', async (req, res) => {
  console.log("================= POST: /api/v1/chat - HIT ===============================");

  const { prompt, conversationId } = req.body;

  const response = await client.responses.create({
    model: 'gpt-4o-mini',
    input: prompt,
    temperature: 0.2,
    max_output_tokens: 100,
    previous_response_id: conversation.get(conversationId),
  });

  conversation.set(conversationId, response.id)

  console.log("================= POST: /api/v1/chat - RESPONDED ===============================");

  res.json({ response: response.output_text });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
