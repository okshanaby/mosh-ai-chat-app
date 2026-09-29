const TypingIndicator = () => {
  return (
    <div className="flex gap-1 self-start p-3 bg-gray-200 rounded-xl">
      <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
      <div className="w-2 h-2 rounded-full bg-black animate-pulse [animation-delay:.2s]" />
      <div className="w-2 h-2 rounded-full bg-black animate-pulse [animation-delay:.4s]" />
    </div>
  );
};

export default TypingIndicator;
