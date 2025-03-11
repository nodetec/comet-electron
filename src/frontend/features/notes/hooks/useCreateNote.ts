import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createNote(notebookId?: string) {
  await window.api.createNote({
    notebookId,
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,
    onSuccess: (_) => {
      void queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      void queryClient.invalidateQueries({
        queryKey: ["activeNote"],
      });
    },
  });
}
