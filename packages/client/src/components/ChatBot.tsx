import { Button } from './ui/button';
import { FaArrowUp } from 'react-icons/fa';

function ChatBot() {
  return (
    <div className="relative border-2 p-3 rounded-2xl h-34">
      <textarea
        className="focus:outline-0 border-0 resize-none w-full h-full"
        placeholder="Ask anything..."
        maxLength={1000}
      />
      <Button className="rounded-full h-9 w-9 absolute bottom-2 right-2">
        <FaArrowUp />
      </Button>
    </div>
  );
}

export default ChatBot;
