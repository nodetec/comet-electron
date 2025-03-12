import { ipcMain } from "electron";

import * as api from "./api";

export function setupHandlers(): void {
  ipcMain.handle("createNote", api.createNote);
  ipcMain.handle("getNoteFeed", api.getNoteFeed);
  ipcMain.handle("getNote", api.getNote);
}
