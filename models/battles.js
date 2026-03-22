import { DatabaseSync } from "node:sqlite";

const db_path = "./models/battles.db";
const db = new DatabaseSync(db_path, { verbose: console.log });

console.log("Connected to database at " + db_path);

  db.exec(`
    CREATE TABLE IF NOT EXISTS battles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      year INTEGER,
      description TEXT
    )
  `);

let db_ops = {
  insert_battle: db.prepare(
    `INSERT INTO battles (name, year, description)
        VALUES (?, ?, ?) RETURNING id, name, year, description;`
  ),

  get_battles_by_year: db.prepare(
    "SELECT id, name, year, description FROM battles WHERE year = ?;"
  ),

  get_all_battles: db.prepare(
    "SELECT id, name, year, description FROM battles;"
  ),

  get_update_battle_by_id: db.prepare(
    "UPDATE battles SET name = ?, year = ?, description = ? WHERE id = ? RETURNING id, name, year, description;"
  ),

  get_battle_by_id: db.prepare(
    "SELECT id, name, year, description FROM battles WHERE id = ?;"
  ),
  
  delete_battle_by_id: db.prepare(
    "DELETE FROM battles WHERE id = ?;"
  )
}

export function Update_Battle_By_Id(id, name, year, description) {
  return db_ops.get_update_battle_by_id.run(name, year, description, id);
}

export function Insert_Battle(name, year, description) {
  console.log(name, year, description);
  return db_ops.insert_battle.run(name, year, description);
}

export function Get_All_Battles() {
  return db_ops.get_all_battles.all();
}

export function Get_Battle_By_Id(id) {
  return db_ops.get_battle_by_id.get(id);
}

export function Get_Battles_By_Year(year) {
  return db_ops.get_battles_by_year.get(year);
}

export function Delete_Battle_By_Id(id) {
  return db_ops.delete_battle_by_id.run(id);
}

export default {
  Insert_Battle,
  Get_All_Battles,
  Get_Battle_By_Id,
  Get_Battles_By_Year,
  Update_Battle_By_Id,
  Delete_Battle_By_Id
};