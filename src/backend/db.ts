import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";

PouchDB.plugin(PouchDBFind);

let db: PouchDB.Database;

export async function initDb(dbPath: string) {
  db = new PouchDB(dbPath, {
    revs_limit: 3,
    auto_compaction: true,
  });

  void PouchDB.sync(dbPath, "http://localhost:5984/mydb", {
    live: true,
  });

  const createIndexResponse = await db.createIndex({
    index: {
      fields: ["type", "contentUpdatedAt", "trashedAt"],
    },
  });

  console.log("createIndexResponse", createIndexResponse);

  return db;
}

export const getDb = () => db;

export const logDbInfo = async () => {
  const info = await db.info();
  console.log("db location", info);
};
