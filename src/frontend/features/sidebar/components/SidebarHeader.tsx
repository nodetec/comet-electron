import { Button } from "~/components/ui/button";
import { Settings2Icon, UserCircleIcon } from "lucide-react";

export function SidebarHeader() {
  return (
    <header className="flex justify-end gap-1 draggable pt-2 px-4 pb-4">
      <Button type="button" variant="ghost" size="icon">
        <UserCircleIcon />
      </Button>
      <Button type="button" variant="ghost" size="icon">
        <Settings2Icon />
      </Button>
    </header>
  );
}
