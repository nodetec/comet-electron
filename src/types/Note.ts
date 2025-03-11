export type InsertNote = {
  notebookId?: string;
};

export type UpdateNote = {
  _id: string;
  _rev: string;
  type: "note";
  title: string;
  content: string;
  notebookId?: string;
  publishedAt?: Date;
  eventAddress?: string;
  identifier?: string;
  pinnedAt?: Date;
  trashedAt?: Date;
  archivedAt?: Date;
  author?: string;
};

export type Note = {
  _id: string;
  _rev: string | undefined;
  type: "note";
  title: string;
  content: string;
  notebookId: string | undefined;
  createdAt: Date;
  updatedAt: Date;
  contentUpdatedAt: Date;
  publishedAt: Date | undefined;
  eventAddress: string | undefined;
  identifier: string | undefined;
  pinnedAt: Date | undefined;
  trashedAt: Date | undefined;
  archivedAt: Date | undefined;
  author: string | undefined;
};
