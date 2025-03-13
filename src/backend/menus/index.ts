import { setupNoteCardContextMenu } from "./noteCardContextMenu";
import { setupTrashNoteCardContextMenu } from "./trashNoteCardContextMenu";

export function setupContextMenus() {
  setupNoteCardContextMenu();
  setupTrashNoteCardContextMenu();
}
