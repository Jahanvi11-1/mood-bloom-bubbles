import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Upload, Mic, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface MessageInputProps {
  onSendMessage: (message: string, imageFile?: File) => void;
  disabled?: boolean;
}

export const MessageInput = ({ onSendMessage, disabled }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim() || selectedFile) {
      onSendMessage(message.trim(), selectedFile || undefined);
      setMessage("");
      setSelectedFile(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error("File size must be less than 10MB");
        return;
      }
      setSelectedFile(file);
      toast.success("File selected successfully");
    }
  };

  const handleMicClick = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.info("Voice recording feature coming soon!");
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="border-t bg-gradient-to-r from-background/95 to-muted/30 backdrop-blur-sm">
      {selectedFile && (
        <div className="px-4 py-2 flex items-center justify-between bg-muted/50">
          <span className="text-sm text-muted-foreground flex items-center">
            📎 {selectedFile.name}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={removeFile}
            className="h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      <div className="flex items-center gap-2 p-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf,.doc,.docx,.txt"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="shrink-0 hover:bg-accent"
          disabled={disabled}
        >
          <Upload className="h-4 w-4" />
        </Button>

        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={disabled}
            className="pr-10 rounded-full border-2 focus:border-primary/50 transition-colors"
          />
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleMicClick}
          className={cn(
            "shrink-0 hover:bg-accent transition-colors",
            isRecording && "text-destructive bg-destructive/10"
          )}
          disabled={disabled}
        >
          <Mic className="h-4 w-4" />
        </Button>

        <Button
          onClick={handleSend}
          disabled={disabled || (!message.trim() && !selectedFile)}
          className="shrink-0 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};