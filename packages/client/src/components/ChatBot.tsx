import { Button } from './ui/button';
import { FaArrowUp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRef } from 'react';

type ChatForm = {
  prompt: string;
};

function ChatBot() {
  const conversationId = useRef(crypto.randomUUID());
  const { register, reset, handleSubmit, formState } = useForm<ChatForm>();

  const submitHandler = async ({ prompt }: ChatForm) => {
    reset();

    const { data } = await axios.post('/api/v1/chat', {
      prompt,
      conversationId: conversationId.current,
    });

    console.log(data);
  };

  const enterKeyHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(submitHandler)();
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="relative border-2 p-3 rounded-2xl h-34">
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
  );
}

export default ChatBot;
