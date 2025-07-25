import { ThemeToggle } from "@/components/ui/theme-toggle";

export const ChatHeader = () => {
  return (
    <div className="border-b bg-gradient-to-r from-background/95 to-muted/30 backdrop-blur-md border-white/20">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <span className="text-lg">☕</span>
          </div>
          <div>
            <h1 className="font-semibold text-lg">MoodMorph</h1>
            <p className="text-xs text-muted-foreground">AI Assistant</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};