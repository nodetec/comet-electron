import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  activeNoteId: string | undefined;
  setActiveNoteId: (activeNoteId: string | undefined) => void;

  activeNotebookId: string;
  setActiveNotebookId: (notebookId: string) => void;

  activeNotebookName: string | undefined;
  setActiveNotebookName: (notebookName: string | undefined) => void;

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

      activeNotebookId: "all",
      setActiveNotebookId: (activeNotebookId) => set({ activeNotebookId }),

      activeNotebookName: undefined,
      setActiveNotebookName: (activeNotebookName) =>
        set({ activeNotebookName }),

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
        activeNoteId: state.activeNoteId,
        activeNotebookId: state.activeNotebookId,
        activeNotebookName: state.activeNotebookName,
      }),
    },
  ),
);
