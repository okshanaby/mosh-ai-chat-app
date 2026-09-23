import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

import { FaArrowUp } from 'react-icons/fa';
import { Button } from './ui/button';

type ChatForm = {
  prompt: string;
};

type ChatResponse = {
  message: string;
};

type Message = {
  content: string;
  role: 'user' | 'bot';
};

function ChatBot() {
  //   const conversationId = useRef(crypto.randomUUID());
  const [conversationId] = useState(crypto.randomUUID());
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const { register, reset, handleSubmit, formState } = useForm<ChatForm>();

  const submitHandler = async ({ prompt }: ChatForm) => {
    setIsBotTyping(true);
    setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);

    reset();

    const { data } = await axios.post<ChatResponse>('/api/v1/chat', {
      prompt,
      conversationId,
    });

    setIsBotTyping(false);
    setMessages((prev) => [...prev, { content: data.message, role: 'bot' }]);
  };

  const enterKeyHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(submitHandler)();
    }
  };

  const copyMessageHandler = (e: React.ClipboardEvent) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData('text/plain', selection);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`py-1.5 px-3 rounded-xl  ${
              message.role === 'user'
                ? 'bg-blue-500 text-white self-end'
                : 'bg-gray-200 text-black self-start'
            }`}
            onCopy={copyMessageHandler}
          >
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ))}
        {isBotTyping && (
          <div className="flex gap-1 self-start p-3 bg-gray-200 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-black animate-pulse [animation-delay:.2s]" />
            <div className="w-2 h-2 rounded-full bg-black animate-pulse [animation-delay:.4s]" />
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="relative border-2 focus-within:border-gray-600 p-3 rounded-2xl h-34"
        ref={formRef}
      >
        <textarea
          {...register('prompt', {
            required: true,
            validate: (value) => value.trim().length > 0,
          })}
          className="focus:outline-0 border-0 resize-none w-full h-full"
          placeholder="Ask anything..."
          maxLength={1000}
          onKeyDown={enterKeyHandler}
        />
        <Button
          disabled={!formState.isValid}
          type="submit"
          className="rounded-full h-9 w-9 absolute bottom-2 right-2"
        >
          <FaArrowUp />
        </Button>
      </form>
    </div>
  );
}

export default ChatBot;
