import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/v1/chat')
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="text-3xl font-bold">
      {message} - <Button>Click me</Button>






    </div>
  )

  
}

export default App;
