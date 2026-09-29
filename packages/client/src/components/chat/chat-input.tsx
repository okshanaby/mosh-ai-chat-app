import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { FaArrowUp } from 'react-icons/fa';

export type ChatForm = {
  prompt: string;
};

type ChatInputProps = {
  submitHandler: (data: ChatForm) => void;
};

const ChatInput = ({ submitHandler }: ChatInputProps) => {
  const { register, reset, handleSubmit, formState } = useForm<ChatForm>();

  const enterKeyHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const onSubmit = handleSubmit((data) => {
    reset({ prompt: '' });
    submitHandler(data);
  });

  return (
    <form
      onSubmit={onSubmit}
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
        autoFocus
      />
      <Button
        disabled={!formState.isValid}
        type="submit"
        className="rounded-full h-9 w-9 absolute bottom-2 right-2"
      >
        <FaArrowUp />
      </Button>
    </form>
  );
};

export default ChatInput;
