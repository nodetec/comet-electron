import { deleteNote, restoreNote } from "&/api";
import { ipcMain, Menu } from "electron";

export function setupTrashNoteCardContextMenu() {
  ipcMain.on("trashNoteCardContextMenu", (event, noteId: string) => {
    const template = [
      {
        label: "Delete",
        click: async () => {
          await deleteNote(event, noteId);
          event.sender.send("noteDeleted", noteId);
        },
      },
      {
        label: "Restore",
        click: async () => {
          await restoreNote(event, noteId);
          event.sender.send("noteRestored", noteId);
        },
      },
    ];

    const menu = Menu.buildFromTemplate(template);

    menu.popup();
  });
}
