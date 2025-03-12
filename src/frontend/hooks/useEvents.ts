import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useAppState } from "~/store";

export const useEvents = () => {
  const activeNoteId = useAppState((state) => state.activeNoteId);
  const setActiveNoteId = useAppState((state) => state.setActiveNoteId);

  const queryClient = useQueryClient();

  useEffect(() => {
    const noteMovedToTrashHandler = (
      event: Electron.IpcRendererEvent,
      noteId: string,
    ) => {
      if (activeNoteId === noteId) {
        setActiveNoteId(undefined);
      }
      console.log("Note moved to trash:", noteId);
      void queryClient.invalidateQueries({ queryKey: ["notes"] });
    };

    window.api.onNoteMovedToTrash(noteMovedToTrashHandler);

    return () => {
      // TODO: update type
      window.api.removeNoteMovedToTrashListener(noteMovedToTrashHandler);
    };
  }, [activeNoteId, queryClient, setActiveNoteId]);
};
