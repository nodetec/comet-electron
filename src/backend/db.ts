import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";

PouchDB.plugin(PouchDBFind);

let db: PouchDB.Database;

export function initDb(dbPath: string) {
  db = new PouchDB(dbPath, {
    revs_limit: 3,
    auto_compaction: true,
  });

  void PouchDB.sync(dbPath, "http://localhost:5984/mydb", {
    live: true,
  });

  return db;
}

export function getDb() {
  if (!db) throw new Error("DB not initialized");
  return db;
}

export const logDbInfo = async () => {
  const info = await db.info();
  console.log("db location", info);
};

export const setupIndexes = async () => {
  await db.createIndex({
    index: {
      fields: ["contentUpdatedAt"],
    },
  });
};
