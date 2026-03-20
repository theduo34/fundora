import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { Card } from "@/types";

interface CardStore {
  cards: Card[];
  loading: boolean;
  fetchCards: (userId: string) => Promise<void>;
  addCard: (card: Omit<Card, "id" | "created_at" | "updated_at">) => Promise<{ error: string | null }>;
  updateCardStatus: (cardId: string, status: string) => Promise<void>;
}

export const useCardStore = create<CardStore>((set, get) => ({
  cards: [],
  loading: false,

  fetchCards: async (userId) => {
    set({ loading: true });
    const { data } = await supabase
      .from("cards")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    set({ cards: (data as Card[]) ?? [], loading: false });
  },

  addCard: async (card) => {
    const { data, error } = await supabase
      .from("cards")
      .insert(card)
      .select()
      .single();

    if (data) {
      set((state) => ({ cards: [data as Card, ...state.cards] }));
    }
    return { error: error?.message ?? null };
  },

  updateCardStatus: async (cardId, status) => {
    await supabase
      .from("cards")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", cardId);

    set((state) => ({
      cards: state.cards.map((c) =>
        c.id === cardId ? { ...c, status: status as Card["status"] } : c
      ),
    }));
  },
}));
