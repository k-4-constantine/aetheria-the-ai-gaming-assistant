import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bot, User, Gamepad2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Message } from '../../worker/types';
type ChatMessageProps = {
  message: Message;
};
export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn('flex items-start gap-3', isUser ? 'justify-end' : 'justify-start')}
    >
      {!isUser && (
        <div className="flex-shrink-0 size-8 rounded-full bg-aetheria-cyan/20 flex items-center justify-center border border-aetheria-cyan/30">
          <Bot className="size-5 text-aetheria-cyan" />
        </div>
      )}
      <div
        className={cn(
          'max-w-md md:max-w-lg lg:max-w-2xl rounded-2xl px-4 py-3',
          isUser
            ? 'bg-aetheria-cyan text-aetheria-indigo rounded-br-none'
            : 'bg-card border border-border rounded-bl-none'
        )}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className="prose prose-sm prose-invert max-w-none 
                     prose-p:before:content-none prose-p:after:content-none
                     prose-headings:text-aetheria-cyan prose-headings:font-display
                     prose-strong:text-foreground
                     prose-a:text-aetheria-cyan hover:prose-a:text-aetheria-magenta
                     prose-code:text-aetheria-magenta prose-code:bg-background/50 prose-code:p-1 prose-code:rounded-sm
                     prose-blockquote:border-l-aetheria-cyan prose-blockquote:text-muted-foreground"
        >
          {message.content}
        </ReactMarkdown>
      </div>
      {isUser && (
        <div className="flex-shrink-0 size-8 rounded-full bg-aetheria-magenta/20 flex items-center justify-center border border-aetheria-magenta/30">
          <User className="size-5 text-aetheria-magenta" />
        </div>
      )}
    </motion.div>
  );
}
export function StreamingChatMessage({ content }: { content: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 justify-start"
    >
      <div className="flex-shrink-0 size-8 rounded-full bg-aetheria-cyan/20 flex items-center justify-center border border-aetheria-cyan/30">
        <Bot className="size-5 text-aetheria-cyan" />
      </div>
      <div className="max-w-md md:max-w-lg lg:max-w-2xl rounded-2xl px-4 py-3 bg-card border border-border rounded-bl-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className="prose prose-sm prose-invert max-w-none"
        >
          {content}
        </ReactMarkdown>
        <span className="inline-block w-2 h-4 bg-aetheria-cyan animate-pulse ml-1" />
      </div>
    </motion.div>
  );
}
export function WelcomeMessage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 }}
        className="p-4 bg-aetheria-cyan/10 rounded-full mb-6"
      >
        <Gamepad2 className="size-16 text-aetheria-cyan" />
      </motion.div>
      <h1 className="font-display text-4xl md:text-5xl mb-2 text-shadow-glow">Welcome to Aetheria</h1>
      <p className="text-muted-foreground max-w-md">
        Your AI gaming assistant. Ask me for tips, strategies, or lore about your favorite games!
      </p>
      <div className="mt-8 text-sm text-muted-foreground/50">
        <p>AI can make mistakes. Consider checking important information.</p>
        <p>Request limits apply across all users during peak times.</p>
      </div>
    </div>
  );
}