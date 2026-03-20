import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { Transaction } from "@/types";

interface TransactionStore {
  transactions: Transaction[];
  loading: boolean;
  fetchTransactions: (userId: string) => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  loading: false,

  fetchTransactions: async (userId) => {
    set({ loading: true });
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    set({ transactions: (data as Transaction[]) ?? [], loading: false });
  },
}));
