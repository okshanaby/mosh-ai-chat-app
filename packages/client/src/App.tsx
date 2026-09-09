import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/v1/chat")
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  }, []);

  return <div className="text-3xl font-bold">{message} - 006</div>;
}

export default App;
