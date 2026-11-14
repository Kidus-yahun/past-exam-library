import { useQuery, useQueryClient } from "@tanstack/solid-query";
import { userId } from "~/lib/auth";
import { fetchBookmarkIds, setBookmarked } from "./api";

/** The signed-in student's bookmarked paper ids, with a toggle that updates instantly. */
export function useBookmarks() {
  const queryClient = useQueryClient();
  const ids = useQuery(() => ({
    queryKey: ["bookmarks", userId()],
    queryFn: fetchBookmarkIds,
    enabled: userId() !== null,
  }));

  async function toggle(paperId: string) {
    const key = ["bookmarks", userId()];
    const before = ids.data ?? new Set<string>();
    const on = !before.has(paperId);
    const after = new Set(before);
    if (on) after.add(paperId);
    else after.delete(paperId);
    queryClient.setQueryData(key, after);
    try {
      await setBookmarked(paperId, on);
    } catch {
      queryClient.setQueryData(key, before);
    } finally {
      void queryClient.invalidateQueries({ queryKey: ["bookmarked-papers"] });
    }
  }

  return {
    enabled: () => userId() !== null,
    has: (paperId: string) => ids.data?.has(paperId) ?? false,
    toggle,
  };
}
