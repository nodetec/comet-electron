import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

// import { NotebookBtn } from "./NotebookBtn";

export function Notebooks() {
  //   const { data, status } = useNotebooks(true);

  //   if (status === "pending") {
  //     return undefined;
  //   }

  //   if (status === "error") {
  //     return <div>Error fetching notebooks</div>;
  //   }

  return (
    <Accordion
      className="my-0 py-0"
      type="single"
      collapsible
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="pt-2.5 pb-1.5">
          <div className="flex items-center">
            <div className="ml-1 text-xs">Notebooks</div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-0.5 pb-0 pl-1">
          {/* {data?.map((notebook) => (
            <NotebookBtn notebook={notebook} key={notebook.ID} />
          ))} */}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
