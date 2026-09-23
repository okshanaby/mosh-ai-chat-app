import { z } from 'zod';
import type { Request, Response } from 'express';
import { chatService } from '../services/chat.service';

// Implementation details
const conversationSchema = z.object({
  conversationId: z.uuid(),
  prompt: z
    .string()
    .trim()
    .min(1, 'Prompt cant be empty')
    .max(1000, 'Prompt cant exeed 1000 characters'),
});

//   Public Interface
export const chatController = {
  async sendMessage(req: Request, res: Response) {
    console.log('================= POST: /api/v1/chat - HIT ===============================');

    const { success, data, error } = conversationSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ error: z.flattenError(error).fieldErrors });
    }

    try {
      const { prompt, conversationId } = data;

      const response = await chatService.sendMessage(conversationId, prompt);

      console.log(
        '================= POST: /api/v1/chat - RESPONDED ==============================='
      );

      res.json({ message: response.message });
    } catch (error) {
      console.error('================= POST: /api/v1/chat - ERROR ==========================');
      console.error(error);
      return res.status(500).json({ error: 'Failed to generate prompt response, try again' });
    }
  },
};
