import { moveNoteToTrash } from "&/api";
import { ipcMain, Menu } from "electron";

export function setupNoteCardContextMenu() {
  ipcMain.on("noteCardContextMenu", (event, noteId: string) => {
    console.log("Note card right clicked", noteId);

    const template = [
      {
        label: "Trash",
        click: async () => {
          await moveNoteToTrash(event, noteId);
          event.sender.send("noteMovedToTrash", noteId);
        },
      },
    ];

    const menu = Menu.buildFromTemplate(template);

    menu.popup();
    // menu.popup({ x: 100, y: 200 }); // use this later
  });
}
