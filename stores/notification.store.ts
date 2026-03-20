import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { Notification } from "@/types";

interface NotificationStore {
  notifications: Notification[];
  loading: boolean;
  fetchNotifications: (userId: string) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: (userId: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  loading: false,

  fetchNotifications: async (userId) => {
    set({ loading: true });
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    set({ notifications: (data as Notification[]) ?? [], loading: false });
  },

  markAsRead: async (id) => {
    const now = new Date().toISOString();
    await supabase
      .from("notifications")
      .update({ status: "read", read_at: now, updated_at: now })
      .eq("id", id);

    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, status: "read" as const, read_at: now } : n
      ),
    }));
  },

  markAllAsRead: async (userId) => {
    const now = new Date().toISOString();
    await supabase
      .from("notifications")
      .update({ status: "read", read_at: now, updated_at: now })
      .eq("user_id", userId)
      .eq("status", "unread");

    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.status === "unread" ? { ...n, status: "read" as const, read_at: now } : n
      ),
    }));
  },
}));
