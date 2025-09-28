import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { MessageSquare, X, Send } from "lucide-react";
import { Input } from "./ui/input";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 1,
          }}
        >
          <Button
            size="lg"
            className="btn-primary rounded-full h-16 w-16 shadow-lg"
            onClick={toggleChat}
            aria-label={isOpen ? "Close Chat" : "Open Chat"}
          >
            {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-24 right-6 w-80 h-[28rem] bg-card rounded-xl shadow-2xl flex flex-col border z-50"
          >
            {/* Header */}
            <header className="bg-primary text-primary-foreground p-4 rounded-t-xl">
              <h3 className="font-bold text-lg">AquaPump Assistant</h3>
              <p className="text-sm opacity-90">How can we help you today?</p>
            </header>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {/* Welcome Message */}
                <div className="flex items-start gap-2.5">
                    <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-muted rounded-e-xl rounded-es-xl">
                        <p className="text-sm font-normal text-foreground">Hello! I'm the AquaPump AI assistant. Feel free to ask me about our products, services, or technical specifications.</p>
                    </div>
                </div>
            </div>

            {/* Input */}
            <footer className="p-4 border-t">
              <div className="relative">
                <Input placeholder="Type your message..." className="pr-12" />
                <Button size="icon" variant="ghost" className="absolute top-1/2 right-1 -translate-y-1/2">
                  <Send className="h-5 w-5 text-primary" />
                </Button>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;