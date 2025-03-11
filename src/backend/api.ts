// https://pouchdb.com/
// https://pouchdb.com/api.html
// https://pouchdb.com/2014/06/17/12-pro-tips-for-better-code-with-pouchdb.html
// https://pouchdb.com/2014/04/14/pagination-strategies-with-pouchdb.html
// https://pouchdb.com/2015/02/28/efficiently-managing-ui-state-in-pouchdb.html
// https://pouchdb.com/2014/05/01/secondary-indexes-have-landed-in-pouchdb.html

import { type InsertNote, type Note } from "$/types/Note";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

import { db } from "./db";

export async function createNote(insertNote: InsertNote) {
  const note: Note = {
    _id: `note_${uuidv4()}`,
    _rev: undefined,
    type: "note",
    title: dayjs().format("YYYY-MM-DD"),
    content: "",
    notebookId: insertNote?.notebookId,
    createdAt: new Date(),
    updatedAt: new Date(),
    contentUpdatedAt: new Date(),
    author: undefined,
    publishedAt: undefined,
    eventAddress: undefined,
    identifier: undefined,
    pinnedAt: undefined,
    trashedAt: undefined,
    archivedAt: undefined,
  };

  console.log("createNote", note);

  const response = await db.put<Note>(note);
  return response.id;
}

async function getNote(key: string) {
  return await db.get(key);
}

async function getAllNotesDocs() {
  return await db.allDocs({ include_docs: true });
}

export async function getNoteFeed(
  page: number,
  limit: number,
  sortField: "title" | "createdAt" | "contentUpdatedAt" = "contentUpdatedAt",
  sortOrder: "asc" | "desc" = "desc",
) {
  const response = db.find({
    selector: {},
    sort: [{ [sortField]: sortOrder }],
    skip: page * limit,
    limit,
  });

  return response;
}

async function deleteNote(key: string) {
  const note = await db.get<Note>(key);
  return await db.remove(note);
}
