import { useQuery } from "@tanstack/solid-query";
import { fetchProfile, userId } from "~/lib/auth";

/** The signed-in student's profile; disabled (no data) when signed out. */
export function useProfile() {
  return useQuery(() => ({
    queryKey: ["profile", userId()],
    queryFn: () => fetchProfile(userId() ?? ""),
    enabled: userId() !== null,
  }));
}
