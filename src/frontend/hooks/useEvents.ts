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

  useEffect(() => {
    const noteDeletedHandler = (
      event: Electron.IpcRendererEvent,
      noteId: string,
    ) => {
      if (activeNoteId === noteId) {
        setActiveNoteId(undefined);
      }
      console.log("Note deleted:", noteId);
      void queryClient.invalidateQueries({ queryKey: ["notes"] });
    };

    window.api.onNoteDeleted(noteDeletedHandler);

    return () => {
      window.api.removeNoteDeletedListener(noteDeletedHandler);
    };
  }, [activeNoteId, queryClient, setActiveNoteId]);

  useEffect(() => {
    const noteRestoredHandler = (
      event: Electron.IpcRendererEvent,
      noteId: string,
    ) => {
      console.log("Note restored:", noteId);
      void queryClient.invalidateQueries({ queryKey: ["notes"] });
    };

    window.api.onNoteRestored(noteRestoredHandler);

    return () => {
      window.api.removeNoteRestoredListener(noteRestoredHandler);
    };
  }, [queryClient]);

  useEffect(() => {
    const notebookHiddenHandler = (
      event: Electron.IpcRendererEvent,
      notebookId: string,
    ) => {
      console.log("Notebook hidden:", notebookId);
      void queryClient.invalidateQueries({ queryKey: ["notebooks"] });
    };

    window.api.onNotebookHidden(notebookHiddenHandler);

    return () => {
      window.api.removeNotebookHiddenListener(notebookHiddenHandler);
    };
  }, [queryClient]);

  useEffect(() => {
    const notebookDeletedHandler = (
      event: Electron.IpcRendererEvent,
      notebookId: string,
    ) => {
      console.log("Notebook deleted:", notebookId);
      void queryClient.invalidateQueries({ queryKey: ["notebooks"] });
    };

    window.api.onNotebookDeleted(notebookDeletedHandler);

    return () => {
      window.api.removeNotebookDeletedListener(notebookDeletedHandler);
    };
  }, [queryClient]);

  useEffect(() => {
    const noteMovedToNotebookHandler = (
      event: Electron.IpcRendererEvent,
      noteId: string,
    ) => {
      console.log("Note moved to notebook:", noteId);
      void queryClient.invalidateQueries({ queryKey: ["notes"] });
    };

    window.api.onNoteMovedToNotebook(noteMovedToNotebookHandler);

    return () => {
      window.api.removeNoteMovedToNotebookListener(noteMovedToNotebookHandler);
    };
  }, [queryClient]);
};
