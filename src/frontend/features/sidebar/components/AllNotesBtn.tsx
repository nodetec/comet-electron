import { SidebarButton } from "~/components/ui/SidebarButton";
import { useAppState } from "~/store";
import { FileText } from "lucide-react";

export function AllNotesBtn() {
  const feedType = useAppState((state) => state.feedType);
  const setFeedType = useAppState((state) => state.setFeedType);

  const appFocus = useAppState((state) => state.appFocus);
  const setAppFocus = useAppState((state) => state.setAppFocus);

  async function handleAllNotesClick() {
    setFeedType("all");
    setAppFocus({ panel: "sidebar", isFocused: true });
  }

  const isFocused =
    appFocus?.panel === "sidebar" && appFocus.isFocused && feedType === "all";

  return (
    <SidebarButton
      isFocused={isFocused}
      onClick={handleAllNotesClick}
      isActive={feedType === "all"}
      icon={<FileText data-focused={isFocused} />}
      label="All Notes"
    />
  );
}
