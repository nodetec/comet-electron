// https://pouchdb.com/
// https://pouchdb.com/api.html
// https://pouchdb.com/2014/06/17/12-pro-tips-for-better-code-with-pouchdb.html
// https://pouchdb.com/2014/04/14/pagination-strategies-with-pouchdb.html
// https://pouchdb.com/2015/02/28/efficiently-managing-ui-state-in-pouchdb.html
// https://pouchdb.com/2014/05/01/secondary-indexes-have-landed-in-pouchdb.html

import path from "path";

import { type InsertNote, type Note } from "$/types/Note";
import dayjs from "dayjs";
import { app, type IpcMainInvokeEvent } from "electron";
import { v4 as uuidv4 } from "uuid";

import { getDb, initDb } from "./db";

// const db = getDb();

const db = initDb(path.join(app.getPath("appData"), "comet", "comet-alpha"));

export async function createNote(
  _: IpcMainInvokeEvent,
  insertNote: InsertNote,
): Promise<string> {
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
  const response = await db.get<Note>(id);
  return response;
}

export async function getNoteFeed(
  _: IpcMainInvokeEvent,
  page: number,
  limit: number,
  sortField: "title" | "createdAt" | "contentUpdatedAt" = "contentUpdatedAt",
  sortOrder: "asc" | "desc" = "desc",
) {
  const response = await db.find({
    selector: {},
    sort: [{ [sortField]: sortOrder }],
    skip: page * limit,
    limit,
  });

  const notes = response.docs as Note[];

  return notes;
}

async function deleteNote(key: string) {
  const db = getDb();
  const note = await db.get<Note>(key);
  return await db.remove(note);
}
