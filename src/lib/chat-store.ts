import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Message, SessionInfo } from '../../worker/types';
import { chatService, generateSessionTitle } from './chat';
export type ChatState = {
  sessions: SessionInfo[];
  currentSessionId: string | null;
  messages: Message[];
  streamingMessage: string;
  isProcessing: boolean;
  isLoadingHistory: boolean;
  isLoadingSessions: boolean;
  hasUnsavedSession: boolean;
};
export type ChatActions = {
  initialize: () => Promise<void>;
  loadSessions: () => Promise<void>;
  loadHistory: (sessionId: string) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  switchSession: (sessionId: string) => Promise<void>;
  createNewSession: () => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
  _saveCurrentSessionIfNeeded: () => Promise<void>;
};
export const useChatStore = create<ChatState & ChatActions>()(
  immer((set, get) => ({
    sessions: [],
    currentSessionId: null,
    messages: [],
    streamingMessage: '',
    isProcessing: false,
    isLoadingHistory: true,
    isLoadingSessions: true,
    hasUnsavedSession: false,
    initialize: async () => {
      await get().loadSessions();
      const sessions = get().sessions;
      if (sessions.length > 0) {
        const latestSessionId = sessions[0].id;
        set({ currentSessionId: latestSessionId });
        await get().loadHistory(latestSessionId);
      } else {
        const res = await chatService.createSession('New Game');
        if (res.success && res.data) {
          set({ currentSessionId: res.data.sessionId, hasUnsavedSession: true });
        }
        await get().loadSessions();
      }
      set({ isLoadingHistory: false });
    },
    loadSessions: async () => {
      set({ isLoadingSessions: true });
      const res = await chatService.listSessions();
      if (res.success && res.data) {
        set({ sessions: res.data });
      }
      set({ isLoadingSessions: false });
    },
    loadHistory: async (sessionId: string) => {
      set({ isLoadingHistory: true, messages: [] });
      chatService.switchSession(sessionId);
      const res = await chatService.getMessages();
      if (res.success && res.data) {
        set({ messages: res.data.messages, isProcessing: res.data.isProcessing });
      }
      set({ isLoadingHistory: false, hasUnsavedSession: false });
    },
    sendMessage: async (message: string) => {
      if (get().isProcessing || !message.trim()) return;
      set({ isProcessing: true, streamingMessage: '' });
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: message,
        timestamp: Date.now(),
      };
      set((state) => {
        state.messages.push(userMessage);
      });
      if (get().hasUnsavedSession) {
        const title = generateSessionTitle(message);
        const sessionId = get().currentSessionId;
        if (sessionId) {
          await chatService.updateSessionTitle(sessionId, title);
          set({ hasUnsavedSession: false });
          await get().loadSessions();
        }
      }
      await chatService.sendMessage(message, undefined, (chunk) => {
        set((state) => {
          state.streamingMessage += chunk;
        });
      });
      const res = await chatService.getMessages();
      if (res.success && res.data) {
        set({ messages: res.data.messages });
      }
      set({ isProcessing: false, streamingMessage: '' });
    },
    _saveCurrentSessionIfNeeded: async () => {
      if (get().hasUnsavedSession) {
        const firstUserMessage = get().messages.find((m) => m.role === 'user');
        const title = generateSessionTitle(firstUserMessage?.content);
        const sessionId = get().currentSessionId;
        if (sessionId) {
          await chatService.updateSessionTitle(sessionId, title);
          set({ hasUnsavedSession: false });
          await get().loadSessions();
        }
      }
    },
    switchSession: async (sessionId: string) => {
      if (sessionId === get().currentSessionId) return;
      await get()._saveCurrentSessionIfNeeded();
      set({ currentSessionId: sessionId });
      await get().loadHistory(sessionId);
    },
    createNewSession: async () => {
      await get()._saveCurrentSessionIfNeeded();
      const { data } = await chatService.createSession('New Game');
      if (data) {
        set({
          currentSessionId: data.sessionId,
          messages: [],
          streamingMessage: '',
          hasUnsavedSession: true,
        });
        chatService.switchSession(data.sessionId);
        await get().loadSessions();
      }
    },
    deleteSession: async (sessionId: string) => {
      const { success } = await chatService.deleteSession(sessionId);
      if (success) {
        const remainingSessions = get().sessions.filter((s) => s.id !== sessionId);
        set({ sessions: remainingSessions });
        if (get().currentSessionId === sessionId) {
          if (remainingSessions.length > 0) {
            await get().switchSession(remainingSessions[0].id);
          } else {
            await get().createNewSession();
          }
        }
      }
    },
  }))
);