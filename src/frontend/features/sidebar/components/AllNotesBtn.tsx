import { SidebarButton } from "~/components/ui/SidebarButton";
import { useAppState } from "~/store";
import { StickyNoteIcon } from "lucide-react";

export function AllNotesBtn() {
  const feedType = useAppState((state) => state.feedType);
  const setFeedType = useAppState((state) => state.setFeedType);

  const appFocus = useAppState((state) => state.appFocus);
  const setAppFocus = useAppState((state) => state.setAppFocus);

  // const notebookId = useAppState((state) => state.activeNotebookId);
  const setNotebookId = useAppState((state) => state.setActiveNotebookId);

  async function handleAllNotesClick() {
    setFeedType("all");
    setNotebookId("all");
    setAppFocus({ panel: "sidebar", isFocused: true });
  }

  const isFocused =
    appFocus?.panel === "sidebar" && appFocus.isFocused && feedType === "all";

  return (
    <SidebarButton
      isFocused={isFocused}
      onClick={handleAllNotesClick}
      isActive={feedType === "all"}
      icon={<StickyNoteIcon data-focused={isFocused} />}
      label="All Notes"
    />
  );
}
