import type { Session } from "@supabase/supabase-js";
import { createRoot, createSignal } from "solid-js";
import { z } from "zod";
import { supabase } from "./supabase";

/**
 * Signed-in state for the whole app. `ready` turns true once the stored
 * session has been read, so screens can avoid flashing "signed out".
 */
const state = createRoot(() => {
  const [session, setSession] = createSignal<Session | null>(null);
  const [ready, setReady] = createSignal(false);

  void supabase.auth.getSession().then(({ data }) => {
    setSession(data.session);
    setReady(true);
  });
  supabase.auth.onAuthStateChange((_event, next) => {
    setSession(next);
    setReady(true);
  });

  return { session, ready };
});

export const session = state.session;
export const authReady = state.ready;
export const userId = () => state.session()?.user.id ?? null;

export const Profile = z.object({
  id: z.uuid(),
  display_name: z.string(),
  grade: z.number().int().nullable(),
  stream: z.enum(["natural", "social"]).nullable(),
  role: z.enum(["student", "admin"]),
  daily_goal_minutes: z.union([z.literal(15), z.literal(25), z.literal(50)]),
  onboarded_at: z.string().nullable(),
});
export type Profile = z.infer<typeof Profile>;

export async function fetchProfile(id: string): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, grade, stream, role, daily_goal_minutes, onboarded_at")
    .eq("id", id)
    .single();
  if (error) throw error;
  return Profile.parse(data);
}

export type ProfileUpdate = Partial<
  Pick<Profile, "display_name" | "grade" | "stream" | "daily_goal_minutes" | "onboarded_at">
>;

export async function updateProfile(id: string, changes: ProfileUpdate): Promise<void> {
  const { error } = await supabase.from("profiles").update(changes).eq("id", id);
  if (error) throw error;
}

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName }, emailRedirectTo: `${location.origin}/welcome` },
  });
  if (error) throw error;
  /** False when the project requires email confirmation before signing in. */
  return { signedIn: data.session !== null };
}

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${location.origin}/welcome` },
  });
  if (error) throw error;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
