import React, { useState } from 'react';
import "@copilotkit/react-ui/styles.css";

const CopilotBot = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I assist you today?', sender: 'bot' },
  ]);

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage = { id: Date.now(), text: input, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      try {
        const response = await fetch('https://event-planner-73j2.onrender.com/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();
        const botMessage = { id: Date.now() + 1, text: result.message, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now() + 2, text: 'Error processing your request.', sender: 'bot' },
        ]);
      }
      setInput('');
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={`${className} bg-white p-4 rounded-lg shadow-lg`}>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        style={{ backgroundColor: 'white', color: 'purple' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close Copilot' : 'Ask Copilot'}
      </button>

      {isOpen && (
        <div className="mt-4">
          <div className="h-64 overflow-y-auto bg-gray-100 p-3 rounded-lg flex flex-col" aria-live="polite">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 p-2 rounded-lg max-w-[70%] ${
                  msg.sender === 'bot' ? 'bg-white-500 text-white' : 'bg-gray-300 text-black self-end'
                }`}
                style={{
                  backgroundColor: msg.sender === 'bot' ? 'white' : 'lightblue',
                  color: msg.sender === 'bot' ? 'black' : 'purple',
                  alignSelf: msg.sender === 'bot' ? 'flex-start' : 'flex-end',
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex mt-2">
            <input
              type="text"
              className="border p-2 flex-grow rounded-lg"
              style={{ backgroundColor: 'white', color: 'purple' }}
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message..."
            />
            <button
              className="bg-green-500 text-white px-4 ml-2 rounded-lg"
              style={{ backgroundColor: 'white', color: 'purple' }}
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CopilotBot;
