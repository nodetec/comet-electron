// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer, type IpcRendererEvent } from "electron";

import { type InsertNote, type Note } from "./types/Note";
import { type Notebook } from "./types/Notebook";

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
    notebookId,
    trashFeed = false,
  ) =>
    ipcRenderer.invoke(
      "getNoteFeed",
      offset,
      limit,
      sortField,
      sortOrder,
      notebookId,
      trashFeed,
    ) as Promise<Note[]>,
  getNote: (id: string) => ipcRenderer.invoke("getNote", id) as Promise<Note>,
  saveNote: (update: Partial<Note>) =>
    ipcRenderer.invoke("saveNote", update) as Promise<string>,

  // notebooks
  createNotebook: (name: string) =>
    ipcRenderer.invoke("createNotebook", name) as Promise<string>,
  getNotebook: (id: string) =>
    ipcRenderer.invoke("getNotebook", id) as Promise<Notebook>,
  getNotebooks: (showHidden: boolean) =>
    ipcRenderer.invoke("getNotebooks", showHidden) as Promise<Notebook[]>,

  // context menus
  noteCardContextMenu: (note: Note, notebooks: Notebook[]) =>
    ipcRenderer.send("noteCardContextMenu", note, notebooks),

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
  onNoteMovedToNotebook: (
    handler: (event: IpcRendererEvent, noteId: string) => void,
  ) => {
    ipcRenderer.on("noteMovedToNotebook", handler);
  },
  removeNoteMovedToNotebookListener: (
    handler: (event: IpcRendererEvent, noteId: string) => void,
  ) => {
    ipcRenderer.removeListener("noteMovedToNotebook", handler);
  },
  notebookContextMenu: (notebookId: string) =>
    ipcRenderer.send("notebookContextMenu", notebookId),
  onNotebookHidden: (handler: (e: IpcRendererEvent, id: string) => void) =>
    ipcRenderer.on("notebookHidden", handler),
  removeNotebookHiddenListener: (
    handler: (e: IpcRendererEvent, id: string) => void,
  ) => ipcRenderer.removeListener("notebookHidden", handler),
  onNotebookDeleted: (handler: (e: IpcRendererEvent, id: string) => void) =>
    ipcRenderer.on("notebookDeleted", handler),
  removeNotebookDeletedListener: (
    handler: (e: IpcRendererEvent, id: string) => void,
  ) => ipcRenderer.removeListener("notebookDeleted", handler),
} satisfies Window["api"]);
