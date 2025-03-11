// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge } from "electron";

import * as api from "./backend/api";
import { type InsertNote } from "./types/Note";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  createNote: (note: InsertNote) => api.createNote(note),
  getNoteFeed: (
    page: number,
    limit: number,
    sortField?: "title" | "createdAt" | "contentUpdatedAt",
    sortOrder?: "asc" | "desc",
  ) => api.getNoteFeed(page, limit, sortField, sortOrder),
} satisfies Window["api"]);
