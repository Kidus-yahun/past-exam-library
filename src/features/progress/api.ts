import { useQuery } from "@tanstack/solid-query";
import { userId } from "~/lib/auth";
import { supabase } from "~/lib/supabase";
import { Progress } from "./progress";

export async function fetchProgress(): Promise<Progress> {
  const { data, error } = await supabase.rpc("my_progress");
  if (error) throw error;
  return Progress.parse(data);
}

/** The signed-in student's progress; refreshed whenever a session finishes. */
export function useProgress() {
  return useQuery(() => ({
    queryKey: ["progress", userId()],
    queryFn: fetchProgress,
    enabled: userId() !== null,
    staleTime: 60 * 1000,
  }));
}
