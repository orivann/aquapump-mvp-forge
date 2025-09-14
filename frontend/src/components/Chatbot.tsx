import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, X } from "lucide-react";

// TODO: Replace with a real Grok API key
const GROK_API_KEY = "YOUR_GROK_API_KEY";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! I'm a mock chatbot. To make me real, please add a valid Grok API key in Chatbot.tsx." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Mock API call to Grok
    const botResponse = await mockGrokAPI(input);
    setMessages([...newMessages, { from: "bot", text: botResponse }]);
  };

  const mockGrokAPI = (userInput: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`I'm a mock chatbot. You said: "${userInput}". To make me real, please add a valid Grok API key in Chatbot.tsx.`);
      }, 1000);
    });
  };

  return (
    <div>
      <Button
        className="fixed bottom-4 right-4 w-16 h-16 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </Button>

      {isOpen && (
        <div className="fixed bottom-24 right-4 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col">
          <div className="p-4 bg-primary text-white rounded-t-lg">
            <h3 className="font-bold">Grok Chatbot (Mock)</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="text-center text-sm text-muted-foreground p-2">
              This is a mock chatbot. To enable the real Grok chatbot, please add your API key to `frontend/src/components/Chatbot.tsx`.
            </div>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  msg.from === "bot"
                    ? "bg-accent text-foreground"
                    : "bg-primary text-white self-end"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 p-2 border rounded-l-lg"
              placeholder="Ask something..."
            />
            <Button onClick={handleSend} className="rounded-l-none">
              <Send />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
