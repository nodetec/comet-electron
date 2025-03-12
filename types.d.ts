import { type InsertNote, type Note } from "$/types/Note";
import { type IpcRendererEvent } from "electron";

declare global {
  interface Window {
    api: {
      createNote: (note: InsertNote) => Promise<string>;
      getNoteFeed: (
        page: number,
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
    };
  }
}
