import { type InsertNote, type Note } from "$/types/Note";
import { type IpcRendererEvent } from "electron";

declare global {
  interface Window {
    api: {
      createNote: (note: InsertNote) => Promise<string>;
      getNoteFeed: (
        offset: number,
        limit: number,
        sortField: "title" | "createdAt" | "contentUpdatedAt",
        sortOrder: "asc" | "desc",
        trashFeed?: boolean,
      ) => Promise<Note[]>;
      getNote: (id: string) => Promise<Note>;
      saveNote: (update: Partial<Note>) => Promise<string>;
      // context menus
      noteCardContextMenu: (noteId: string) => void;
      onNoteMovedToTrash: (
        handler: (event: IpcRendererEvent, noteId: string) => void,
      ) => void;
      removeNoteMovedToTrashListener: (
        handler: (event: IpcRendererEvent, noteId: string) => void,
      ) => void;
      trashNoteCardContextMenu: (noteId: string) => void;
      onNoteDeleted: (
        handler: (event: IpcRendererEvent, noteId: string) => void,
      ) => void;
      removeNoteDeletedListener: (
        handler: (event: IpcRendererEvent, noteId: string) => void,
      ) => void;
      onNoteRestored: (
        handler: (event: IpcRendererEvent, noteId: string) => void,
      ) => void;
      removeNoteRestoredListener: (
        handler: (event: IpcRendererEvent, noteId: string) => void,
      ) => void;
    };
  }
}
