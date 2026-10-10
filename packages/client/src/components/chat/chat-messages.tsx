import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export type Message = {
  content: string;
  role: 'user' | 'bot';
};

type ChatMessagesProps = {
  messages: Message[];
};

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const copyMessageHandler = (e: React.ClipboardEvent) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData('text/plain', selection);
    }
  };

  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`py-1.5 px-3 rounded-xl max-w-md prose  ${
            message.role === 'user'
              ? 'bg-blue-500 text-white self-end'
              : 'bg-gray-200 text-black self-start'
          }`}
          ref={index === messages.length - 1 ? lastMessageRef : null}
          onCopy={copyMessageHandler}
        >
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      ))}
    </>
  );
};

export default ChatMessages;
