import { useState } from 'react';
import axios from 'axios';

import TypingIndicator from './chat/TypingIndicator';
import type { Message } from './chat/chat-messages';
import ChatMessages from './chat/chat-messages';
import type { ChatForm } from './chat/chat-input';
import ChatInput from './chat/chat-input';

import notificationSound from '@/assets/sounds/notification.mp3';
import popSound from '@/assets/sounds/pop.mp3';

const popAudio = new Audio(popSound);
popAudio.volume = 0.2;

const notificationAudio = new Audio(notificationSound);
notificationAudio.volume = 0.2;

type ChatResponse = {
  message: string;
};

function ChatBot() {
  //   const conversationId = useRef(crypto.randomUUID());
  const [conversationId] = useState(crypto.randomUUID());
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [responseError, setResponseError] = useState<string | null>(null);

  const submitHandler = async ({ prompt }: ChatForm) => {
    console.log(prompt);

    try {
      setIsBotTyping(true);
      setResponseError(null);
      setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
      popAudio.play();

      const { data } = await axios.post<ChatResponse>('/api/v1/chat', {
        prompt,
        conversationId,
      });

      setMessages((prev) => [...prev, { content: data.message, role: 'bot' }]);
      notificationAudio.play();
    } catch (error) {
      console.error(error);
      setResponseError('Something went wrong! Please try again');
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <div className="space-y-10 h-full flex flex-col">
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
        <ChatMessages messages={messages} />
        {isBotTyping && <TypingIndicator />}
        {responseError && <p className="text-red-500">{responseError}</p>}
      </div>
      <ChatInput submitHandler={submitHandler} />
    </div>
  );
}

export default ChatBot;
