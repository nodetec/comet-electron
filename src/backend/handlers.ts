import { ipcMain } from "electron";

import * as api from "./api";

export function setupHandlers(): void {
  ipcMain.handle("createNote", api.createNote);
  ipcMain.handle("getNoteFeed", api.getNoteFeed);
  ipcMain.handle("getNote", api.getNote);
  ipcMain.handle("saveNote", api.saveNote);
  ipcMain.handle("createNotebook", api.createNotebook);
  ipcMain.handle("getNotebook", api.getNotebook);
  ipcMain.handle("getNotebooks", api.getNotebooks);
}
