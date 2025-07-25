import { useState } from "react";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatWindow } from "@/components/ChatWindow";
import { MessageInput } from "@/components/MessageInput";
import { RainEffect } from "@/components/RainEffect";
import { toast } from "sonner";
import cozyCafeBackground from "@/assets/cozy-cafe-background.jpg";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  hasImage?: boolean;
  imageUrl?: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm MoodMorph, your AI assistant. I'm here to help brighten your day and assist with any questions you might have. How are you feeling today? 🌟",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (text: string, imageFile?: File) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text || (imageFile ? "📷 Image uploaded" : ""),
      isUser: true,
      timestamp,
      hasImage: !!imageFile,
      imageUrl: imageFile ? URL.createObjectURL(imageFile) : undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's wonderful! I love chatting about that topic. Tell me more about what interests you most.",
        "I understand how you're feeling. Sometimes it helps to talk things through step by step.",
        "That's a great question! Let me think about the best way to help you with that.",
        "I appreciate you sharing that with me. Here's what I think might be helpful...",
        "Thank you for the image! I can see what you're showing me. How can I assist you with this?",
        "It sounds like you're going through quite a bit. Remember, I'm here to support you however I can.",
      ];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: imageFile 
          ? "Thank you for sharing that image! I can see what you've uploaded. How can I help you with this?"
          : responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      if (imageFile) {
        toast.success("Image uploaded and processed successfully!");
      }
    }, 1500 + Math.random() * 2000);
  };

  return (
    <div className="h-screen flex flex-col cozy-background relative">
      <RainEffect />
      
      <div className="flex flex-col h-full max-w-4xl mx-auto w-full relative z-20 backdrop-blur-md bg-background/70 dark:bg-background/50">
        <ChatHeader />
        
        <ChatWindow 
          messages={messages} 
          isTyping={isTyping}
        />
        
        <MessageInput 
          onSendMessage={handleSendMessage}
          disabled={isTyping}
        />
      </div>
    </div>
  );
};

export default Index;
