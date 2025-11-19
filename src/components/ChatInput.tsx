import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SendHorizonal, CornerDownLeft } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
type ChatInputProps = {
  onSubmit: (message: string) => void;
  isLoading: boolean;
};
export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [input]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSubmit(input);
    setInput('');
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 w-full p-4 bg-background/80 backdrop-blur-md"
    >
      <div className="relative max-w-3xl mx-auto">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Aetheria about your game..."
          className="w-full min-h-[52px] max-h-48 resize-none rounded-full border-2 border-border bg-card py-3.5 pl-6 pr-20 text-base focus-visible:ring-2 focus-visible:ring-aetheria-cyan focus-visible:ring-offset-0"
          rows={1}
          disabled={isLoading}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full size-10 bg-aetheria-cyan hover:bg-aetheria-cyan/90 text-aetheria-indigo disabled:bg-muted disabled:text-muted-foreground"
                  disabled={!input.trim() || isLoading}
                >
                  <SendHorizonal className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send Message</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <CornerDownLeft className="size-3" /> Enter
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </form>
  );
}