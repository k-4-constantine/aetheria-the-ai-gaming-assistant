import React, { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ChatMessage, StreamingChatMessage, WelcomeMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import { useChatStore } from '@/lib/chat-store';
export function HomePage() {
  const initialize = useChatStore((s) => s.initialize);
  const messages = useChatStore((s) => s.messages);
  const streamingMessage = useChatStore((s) => s.streamingMessage);
  const isProcessing = useChatStore((s) => s.isProcessing);
  const isLoadingHistory = useChatStore((s) => s.isLoadingHistory);
  const sendMessage = useChatStore((s) => s.sendMessage);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    initialize();
  }, [initialize]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingMessage]);
  return (
    <AppLayout>
      <div className="relative flex-1 flex flex-col h-full overflow-hidden">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] max-w-[1000px] max-h-[1000px]
                     bg-aetheria-cyan/10 rounded-full blur-3xl pointer-events-none animate-spotlight"
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {isLoadingHistory ? (
              <div className="flex items-center justify-center h-full pt-20">
                <Loader2 className="size-8 animate-spin text-muted-foreground" />
              </div>
            ) : messages.length === 0 && !isProcessing ? (
              <WelcomeMessage />
            ) : (
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
                {streamingMessage && <StreamingChatMessage content={streamingMessage} />}
              </AnimatePresence>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>
        <ChatInput onSubmit={sendMessage} isLoading={isProcessing} />
      </div>
    </AppLayout>
  );
}