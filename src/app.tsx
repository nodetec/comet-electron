import { Bar, Container, Section } from "@column-resizer/react";
import useAppFocus from "~/hooks/useAppFocus";

export default function ResizableLayout() {
  useAppFocus();

  console.log('hi')

  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center">
      <Container className="h-full w-full">
        <Section
          className="select-none bg-sidebar"
          disableResponsive
          defaultSize={200}
          minSize={200}
          maxSize={400}
        >
          {/* <Sidebar /> */}
        </Section>
        <Bar className="flex cursor-col-resize items-center" size={10}>
          <div className="bg-sidebar h-full w-[5px]" />
          <div className="bg-border h-full w-[1px]" />
          <div className="bg-background h-full w-[5px]" />
        </Bar>
        <Section
          className="flex h-full flex-col select-none"
          disableResponsive
          defaultSize={400}
          minSize={250}
        >
          {/* <NotesHeader /> */}
          {/* <SearchBox /> */}
          {/* <NoteList /> */}
        </Section>
        <Bar className="flex cursor-col-resize items-center" size={10}>
          <div className="bg-background h-full w-[5px]" />
          <div className="bg-border h-full w-[1px]" />
          <div className="bg-background h-full w-[5px]" />
        </Bar>
        <Section minSize={400}>
          <div className="flex h-screen flex-col select-none">
            {/* <Editor /> */}
          </div>
        </Section>
      </Container>
    </div>
  );
}
