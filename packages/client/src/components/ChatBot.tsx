import { Button } from './ui/button';
import { FaArrowUp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRef, useState } from 'react';

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
  const conversationId = useRef(crypto.randomUUID());
  const [messages, setMessages] = useState<Message[]>([]);

  const { register, reset, handleSubmit, formState } = useForm<ChatForm>();

  const submitHandler = async ({ prompt }: ChatForm) => {
    setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);

    reset();

    const { data } = await axios.post<ChatResponse>('/api/v1/chat', {
      prompt,
      conversationId: conversationId.current,
    });

    setMessages((prev) => [...prev, { content: data.message, role: 'bot' }]);
  };

  const enterKeyHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(submitHandler)();
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4">
        {messages.map((message, index) => (
          <p
            key={index}
            className={`py-1.5 px-3 rounded-xl  ${
              message.role === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-black self-start'
            }`}
          >
            {message.content}
          </p>
        ))}
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="relative border-2 focus-within:border-gray-600 p-3 rounded-2xl h-34"
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
