import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  activeNoteId: string | undefined;
  setActiveNoteId: (activeNoteId: string | undefined) => void;

  activeNotebookId: string | undefined;
  setActiveNotebookId: (activeNotebookId: string | undefined) => void;

  feedType: "all" | "notebook" | "trash";
  setFeedType: (feedType: "all" | "notebook" | "trash") => void;

  appFocus:
    | { panel: "sidebar" | "feed" | "editor" | undefined; isFocused: boolean }
    | undefined;
  setAppFocus: (
    appFocus:
      | { panel: "sidebar" | "feed" | "editor" | undefined; isFocused: boolean }
      | undefined,
  ) => void;
}

export const useAppState = create<State>()(
  persist(
    (set) => ({
      activeNoteId: undefined,
      setActiveNoteId: (activeNoteId) => set({ activeNoteId }),

      activeNotebookId: undefined,
      setActiveNotebookId: (activeNotebookId) => set({ activeNotebookId }),

      feedType: "all",
      setFeedType: (feedType) => set({ feedType }),

      appFocus: undefined,
      setAppFocus: (appFocus) => set({ appFocus }),
    }),
    {
      name: "comet-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        feedType: state.feedType,
      }),
    },
  ),
);
