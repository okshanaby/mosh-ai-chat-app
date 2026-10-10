import {readFileSync} from 'node:fs'
import path from 'node:path';

import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation.repository';
import template from '../prompts/chatbot.txt'

const instructionFileURL = new URL('../prompts/WonderWorld.md', import.meta.url)
const instructionData = readFileSync(instructionFileURL, 'utf8')

const instructions = template.replace('{{parkInfo}}', instructionData)


// Implementation details
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type ChatResponse = {
    id: string;
    message: string;
}

// Public Interface
export const chatService = {
  async sendMessage(conversationId: string, prompt: string): Promise<ChatResponse> {
    const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: prompt,
      instructions,
      temperature: 0.2,
      max_output_tokens: 200,
      previous_response_id: conversationRepository.getLastResponseId(conversationId),
    });

    conversationRepository.setLastResponseId(conversationId, response.id);

    return {
        id: response.id,
        message: response.output_text,
    };
  },
};
