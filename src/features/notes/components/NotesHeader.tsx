import { Button } from "~/components/ui/button";
import { useAppState } from "~/store";
import { PenBoxIcon } from "lucide-react";

// import { useCreateNote } from "../hooks/useCreateNote";

export function NotesHeader() {
  const feedType = useAppState((state) => state.feedType);
  //   const activeNotebook = useAppState((state) => state.activeNotebook);
  //   const createNote = useCreateNote();
  // const activeNote = useAppState((state) => state.activeNote);

  // TODO: just make this a map
  //   const title = useMemo(() => {
  //     if (feedType === "all") return "All Notes";
  //     if (feedType === "notebook") return activeNotebook?.Name;
  //     if (feedType === "trash") return "Trash";
  //   }, [feedType, activeNotebook]);

  return (
    <div className="flex justify-between px-3 pt-2 draggable">
      <div
        id="notes-header"
        className="flex cursor-default items-center justify-center gap-x-1 pl-2"
      >
        <h1 className="line-clamp-1 truncate font-semibold break-all text-ellipsis whitespace-break-spaces select-none">
          {"All Notes"}
        </h1>
        {/* <ChevronDown className="mr-4 mt-1 h-[1rem] w-[1rem] shrink-0 text-muted-foreground" /> */}
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        // disabled={createNote.isPending}
        // onClick={() => createNote.mutate()}
      >
        <PenBoxIcon />
      </Button>
    </div>
  );
}
