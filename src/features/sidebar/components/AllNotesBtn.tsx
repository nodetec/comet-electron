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

  const isDataActive =
    appFocus?.panel === "sidebar" && appFocus.isFocused && feedType === "all";

  // TODO: consistent buttons for sidebar
  return (
    <button
      onClick={handleAllNotesClick}
      data-active={isDataActive}
      className={`text-secondary-foreground ml-1 flex items-center rounded-md px-2 py-1 text-sm select-none ${feedType === "all" && "bg-accent"} cursor-default data-[active=true]:bg-blue-500/50`}
    >
      <FileText
        data-active={isDataActive}
        className="data-[active=true]:text-secondary-foreground h-4 w-4 text-blue-400/90"
      />
      <span className="ml-2.5">All Notes</span>
    </button>
  );
}
