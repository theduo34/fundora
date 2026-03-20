import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Profile } from "@/types";

interface AuthStore {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  initialized: boolean;

  initialize: () => void;
  fetchProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (data: { email: string; password: string; firstName: string; lastName: string; phone: string }) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  session: null,
  profile: null,
  loading: false,
  initialized: false,

  initialize: () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({ session, initialized: true });
      if (session) get().fetchProfile();
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session });
      if (session) get().fetchProfile();
      else set({ profile: null });
    });
  },

  fetchProfile: async () => {
    const userId = get().session?.user?.id;
    if (!userId) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (data) set({ profile: data as Profile });
  },

  updateProfile: async (updates) => {
    const userId = get().session?.user?.id;
    if (!userId) return;

    const { data } = await supabase
      .from("profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select()
      .single();

    if (data) set({ profile: data as Profile });
  },

  signIn: async (email, password) => {
    set({ loading: true });
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    set({ loading: false });
    return { error: error?.message ?? null };
  },

  signUp: async ({ email, password, firstName, lastName, phone }) => {
    set({ loading: true });
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName, phone },
      },
    });
    set({ loading: false });
    return { error: error?.message ?? null };
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, profile: null });
  },
}));
