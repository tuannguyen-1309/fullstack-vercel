import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Gọi API từ backend
    const fetchMessage = async () => {
      const response = await fetch("/api/hello"); // Gọi API route
      const data = await response.json();
      setMessage(data.message);
    };

    fetchMessage();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Frontend and Backend on Vercel</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
