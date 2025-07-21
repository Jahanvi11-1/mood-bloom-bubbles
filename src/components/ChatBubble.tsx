import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: string;
  hasImage?: boolean;
  imageUrl?: string;
}

export const ChatBubble = ({ message, isUser, timestamp, hasImage, imageUrl }: ChatBubbleProps) => {
  return (
    <div className={cn(
      "flex w-full mb-4 animate-fade-in",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md",
        isUser 
          ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-br-md" 
          : "bg-gradient-to-br from-card to-muted border rounded-bl-md"
      )}>
        {hasImage && imageUrl && (
          <img 
            src={imageUrl} 
            alt="Uploaded content" 
            className="w-full h-auto rounded-lg mb-2 max-h-64 object-cover"
          />
        )}
        <p className="text-sm leading-relaxed">{message}</p>
        <span className={cn(
          "text-xs mt-2 block opacity-70",
          isUser ? "text-primary-foreground/70" : "text-muted-foreground"
        )}>
          {timestamp}
        </span>
      </div>
    </div>
  );
};