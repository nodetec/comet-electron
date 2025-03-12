import { type InsertNote } from "$/types/Note";

declare global {
  interface Window {
    api: {
      createNote: (note: InsertNote) => Promise<string>;
      getNoteFeed: (
        page: number,
        limit: number,
        sortField: "title" | "createdAt" | "contentUpdatedAt",
        sortOrder: "asc" | "desc",
      ) => Promise<any>;
    };
  }
}
