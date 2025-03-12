// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

import { type InsertNote, type Note } from "./types/Note";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  createNote: (note: InsertNote) =>
    ipcRenderer.invoke("createNote", note) as Promise<string>,
  getNoteFeed: (
    page: number,
    limit: number,
    sortField: "title" | "createdAt" | "contentUpdatedAt" = "contentUpdatedAt",
    sortOrder: "asc" | "desc" = "desc",
  ) =>
    ipcRenderer.invoke(
      "getNoteFeed",
      page,
      limit,
      sortField,
      sortOrder,
    ) as Promise<Note[]>,
  getNote: (id: string) => ipcRenderer.invoke("getNote", id) as Promise<Note>,
  saveNote: (update: Partial<Note>) =>
    ipcRenderer.invoke("saveNote", update) as Promise<string>,
} satisfies Window["api"]);
