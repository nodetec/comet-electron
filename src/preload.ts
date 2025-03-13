// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer, type IpcRendererEvent } from "electron";

import { type InsertNote, type Note } from "./types/Note";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  createNote: (note: InsertNote) =>
    ipcRenderer.invoke("createNote", note) as Promise<string>,
  getNoteFeed: (
    offset: number,
    limit: number,
    sortField: "title" | "createdAt" | "contentUpdatedAt" = "contentUpdatedAt",
    sortOrder: "asc" | "desc" = "desc",
    trashFeed = false,
  ) =>
    ipcRenderer.invoke(
      "getNoteFeed",
      offset,
      limit,
      sortField,
      sortOrder,
      trashFeed,
    ) as Promise<Note[]>,
  getNote: (id: string) => ipcRenderer.invoke("getNote", id) as Promise<Note>,
  saveNote: (update: Partial<Note>) =>
    ipcRenderer.invoke("saveNote", update) as Promise<string>,

  // context menus
  noteCardContextMenu: (noteId: string) =>
    ipcRenderer.send("noteCardContextMenu", noteId),

  // listeners
  onNoteMovedToTrash: (
    handler: (event: IpcRendererEvent, noteId: string) => void,
  ) => {
    ipcRenderer.on("noteMovedToTrash", handler);
  },
  removeNoteMovedToTrashListener: (
    handler: (event: IpcRendererEvent, noteId: string) => void,
  ) => {
    ipcRenderer.removeListener("noteDeleted", handler);
  },
  trashNoteCardContextMenu: (noteId: string) =>
    ipcRenderer.send("trashNoteCardContextMenu", noteId),
  onNoteDeleted: (
    handler: (event: IpcRendererEvent, noteId: string) => void,
  ) => {
    ipcRenderer.on("noteDeleted", handler);
  },
  removeNoteDeletedListener: (
    handler: (event: IpcRendererEvent, noteId: string) => void,
  ) => {
    ipcRenderer.removeListener("noteDeleted", handler);
  },
  onNoteRestored: (
    handler: (event: IpcRendererEvent, noteId: string) => void,
  ) => {
    ipcRenderer.on("noteRestored", handler);
  },
  removeNoteRestoredListener: (
    handler: (event: IpcRendererEvent, noteId: string) => void,
  ) => {
    ipcRenderer.removeListener("noteRestored", handler);
  },
} satisfies Window["api"]);
