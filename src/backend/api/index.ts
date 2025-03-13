// https://pouchdb.com/
// https://pouchdb.com/api.html
// https://pouchdb.com/2014/06/17/12-pro-tips-for-better-code-with-pouchdb.html
// https://pouchdb.com/2014/04/14/pagination-strategies-with-pouchdb.html
// https://pouchdb.com/2015/02/28/efficiently-managing-ui-state-in-pouchdb.html
// https://pouchdb.com/2014/05/01/secondary-indexes-have-landed-in-pouchdb.html

import { type InsertNote, type Note } from "$/types/Note";
import dayjs from "dayjs";
import { type IpcMainEvent, type IpcMainInvokeEvent } from "electron";
import { v4 as uuidv4 } from "uuid";

import { getDb } from "../db";

export async function createNote(
  _: IpcMainInvokeEvent,
  insertNote: InsertNote,
): Promise<string> {
  const db = getDb();
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

  const response = await db.put<Note>(note);
  return response.id;
}

export async function getNote(_: IpcMainInvokeEvent, id: string) {
  const db = getDb();
  const response = await db.get<Note>(id);
  return response;
}

export async function getNoteFeed(
  _: IpcMainInvokeEvent,
  offset: number,
  limit: number,
  sortField: "title" | "createdAt" | "contentUpdatedAt" = "contentUpdatedAt",
  sortOrder: "asc" | "desc" = "desc",
  trashFeed = false,
) {
  const db = getDb();
  console.log("offset", offset);
  const response = await db.find({
    selector: {
      type: "note",
      trashedAt: { $exists: trashFeed }, // Get only non-trashed notes
      contentUpdatedAt: { $exists: true },
    },
    sort: [{ [sortField]: sortOrder }],
    skip: offset,
    limit,
  });

  console.log("response", response);

  const notes = response.docs as Note[];

  return notes;
}

export async function saveNote(_: IpcMainInvokeEvent, update: Partial<Note>) {
  const db = getDb();
  const id = update._id;
  if (!id) return;
  const note = await db.get<Note>(id);
  note.title = update.title ?? dayjs().format("YYYY-MM-DD");
  note.content = update.content ?? "";
  note.updatedAt = new Date();
  note.contentUpdatedAt = new Date();
  const response = await db.put(note);
  return response.id;
}

export async function moveNoteToTrash(_: IpcMainEvent, id: string) {
  const db = getDb();
  const note = await db.get<Note>(id);
  note.trashedAt = new Date();
  const response = await db.put(note);
  return response.id;
}

async function deleteNote(key: string) {
  const db = getDb();
  const note = await db.get<Note>(key);
  return await db.remove(note);
}
