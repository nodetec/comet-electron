import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { ScrollArea } from "~/components/ui/scroll-area";

import { AllNotesBtn } from "./AllNotesBtn";
import { Notebooks } from "./Notebooks";
import { Tags } from "./Tags";
import { TrashNotesBtn } from "./TrashNotesBtn";

export function SidebarNav() {
  return (
    <ScrollArea
    //   type="scroll"
    //   className={cn(
    //     "flex h-full flex-col gap-y-2",
    //     !lastTagVisible && tagsCount > 0 && "border-b",
    //   )}
    >
      <div className="flex flex-col gap-y-1 px-3">
        <Accordion
          className="my-0 py-0"
          type="single"
          collapsible
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="pt-0 pb-1.5">
              <div className="flex items-center">
                <div className="ml-1 text-xs">Notes</div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-0.5 pb-0 pl-1">
              <AllNotesBtn />
              <TrashNotesBtn />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Notebooks />
        <Tags />
      </div>
    </ScrollArea>
  );
}
