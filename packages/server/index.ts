import express from 'express';
import dotenv from 'dotenv';
import { z } from 'zod';
import { chatService } from './src/services/chat.service';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get('/api/v1/chat', (req, res) => {
  res.json({ message: 'Hello World!' });
});

const conversationSchema = z.object({
  conversationId: z.uuid(),
  prompt: z
    .string()
    .trim()
    .min(1, 'Prompt cant be empty')
    .max(1000, 'Prompt cant exeed 1000 characters'),
});

app.post('/api/v1/chat', async (req, res) => {
  console.log('================= POST: /api/v1/chat - HIT ===============================');

  const { success, data, error } = conversationSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ error: z.flattenError(error).fieldErrors });
  }

  try {
    const { prompt, conversationId } = data;

    const response = await chatService.sendMessage(conversationId, prompt);

    console.log('================= POST: /api/v1/chat - RESPONDED ===============================');

    res.json({ response: response.message });
  } catch (error) {
    console.error('================= POST: /api/v1/chat - ERROR ==========================');
    console.error(error);
    return res.status(500).json({ error: 'Failed to generate prompt response, try again' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
