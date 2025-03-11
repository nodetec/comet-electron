import { type InsertNote } from "$/types/Note";
import type PouchDB from "pouchdb";

declare global {
  interface Window {
    api: {
      //   createNoteIndexes: () => Promise<void>;
      createNote: (note: InsertNote) => Promise<string>;
      //   getNote: (key: string) => Promise<Note>;
      getNoteFeed: (
        page: number,
        limit: number,
        sortField?: "title" | "createdAt" | "contentUpdatedAt",
        sortOrder?: "asc" | "desc",
      ) => Promise<PouchDB.Find.FindResponse<{}>>;
      //   deleteNote: (key: string) => Promise<string>;
    };
  }
}
