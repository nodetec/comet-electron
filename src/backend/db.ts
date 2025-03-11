import path from "path";

import { app } from "electron";
import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";

// Windows: C:\Users\<username>\AppData\Roaming\<YourAppName>
// macOS: ~/Library/Application Support/<YourAppName>
// Linux: ~/.config/<YourAppName>

PouchDB.plugin(PouchDBFind);
const dbPath = path.join(app.getPath("appData"), "comet", "comet-alpha");

export const db = new PouchDB(dbPath, {
  revs_limit: 3,
  auto_compaction: true,
});

export const logDbInfo = async () => {
  const info = await db.info();
  console.log("db location", info);
};

export const syncDb = async () => {
  await PouchDB.sync("comet-alpha", "http://localhost:5984/mydb", {
    live: true,
  });
};

export const setupIndexes = async () => {
  await db.createIndex({
    index: {
      fields: ["contentUpdatedAt"],
    },
  });
};
