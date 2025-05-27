
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Mic, Image } from 'lucide-react';

const MediBeeChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm MediBee 🐝 Your friendly medical assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: "I understand your concern. Let me analyze that for you. Based on your symptoms, I recommend consulting with a healthcare professional for proper diagnosis.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-medical-gradient rounded-full shadow-lg flex items-center justify-center z-50 transition-all ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <span className="text-2xl animate-pulse">🐝</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] glass rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-white/20"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/20 bg-medical-gradient">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xl">🐝</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">MediBee</h3>
                    <p className="text-white/80 text-sm">Medical Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.type === 'user' 
                      ? 'bg-medical-blue text-white ml-8' 
                      : 'bg-white/20 text-foreground mr-8'
                  }`}>
                    <p className="text-sm terminal-text">{msg.content}</p>
                    <p className={`text-xs mt-1 opacity-70 ${
                      msg.type === 'user' ? 'text-white/70' : 'text-muted-foreground'
                    }`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/20">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about symptoms, medications..."
                    className="w-full p-3 pr-20 bg-white/10 border border-white/20 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-medical-blue terminal-text"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                      <Mic size={16} />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                      <Image size={16} />
                    </button>
                  </div>
                </div>
                <motion.button
                  onClick={handleSendMessage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-medical-blue text-white rounded-xl hover:bg-blue-600 transition-colors"
                >
                  <Send size={16} />
                </motion.button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex gap-2 mt-3">
                {[
                  "🩺 Symptoms",
                  "💊 Medications", 
                  "📊 Reports"
                ].map((action) => (
                  <button
                    key={action}
                    className="px-3 py-1 bg-white/10 rounded-lg text-xs text-foreground hover:bg-white/20 transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MediBeeChat;
