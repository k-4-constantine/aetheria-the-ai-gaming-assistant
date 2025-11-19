import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Plus, Trash2, Loader2 } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { AetheriaLogo } from './AetheriaLogo';
import { useChatStore } from '@/lib/chat-store';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
export function SessionsSidebar() {
  const sessions = useChatStore((s) => s.sessions);
  const currentSessionId = useChatStore((s) => s.currentSessionId);
  const isLoadingSessions = useChatStore((s) => s.isLoadingSessions);
  const createNewSession = useChatStore((s) => s.createNewSession);
  const switchSession = useChatStore((s) => s.switchSession);
  const deleteSession = useChatStore((s) => s.deleteSession);
  return (
    <Sidebar className="border-r border-border/50 bg-background/50 backdrop-blur-sm">
      <SidebarHeader className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <AetheriaLogo />
          <Button variant="ghost" size="icon" onClick={createNewSession} className="text-muted-foreground hover:text-foreground">
            <Plus className="size-5" />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        {isLoadingSessions ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <AnimatePresence>
            <motion.ul
              className="space-y-1"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
            >
              {sessions.map((session) => (
                <motion.li
                  key={session.id}
                  layout
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  exit={{ opacity: 0, x: -20 }}
                  className={cn(
                    'group flex items-center justify-between p-2 rounded-md text-sm cursor-pointer transition-colors',
                    currentSessionId === session.id
                      ? 'bg-aetheria-cyan/10 text-aetheria-cyan'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  )}
                  onClick={() => switchSession(session.id)}
                >
                  <MessageSquare className="size-4 mr-2 flex-shrink-0" />
                  <span className="truncate flex-1">{session.title}</span>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete this chat session. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteSession(session.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        )}
      </SidebarContent>
      <SidebarFooter className="p-4 text-xs text-muted-foreground/50">
        Built with ❤️ at Cloudflare
      </SidebarFooter>
    </Sidebar>
  );
}