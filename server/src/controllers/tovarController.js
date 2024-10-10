const pool = require("../../config/bdconfig.js");
const bcrypt = require("bcryptjs");
const { user } = require("pg/lib/defaults.js");
class TovarController {
//   async create(req, res, next) {
//     try {
//       const {name_main_category, route } = req.body;
//       const sql_insert = `INSERT INTO main_category (name_main_category, route) VALUES
//           ($1, $2)`;
//       const values = [name_main_category, route];
//       pool.query(sql_insert, values, (err, result) => {
//         if (err) {
//           if (err.code === "23505") {
//             // код ошибки 23505 обозначает конфликт уникальности
//             return res.status(400).send("Conflict: Data already exists");
//           }
//           console.error(err.message);
//           return res.status(400).send("Bad request - " + err.message);
//         }
//         res.send("Data inserted successfully!");
//       });
//     } catch (e) {
//       throw new Error(e);
//     }
//   }
  async getAll(req, res) {
    const { tovar_type } = req.query; // Например можно получить товар с типом - 1 - стул
    // Например можно получить все товары с типом - 1 - стул
    if(!tovar_type){
        const sql = "SELECT * FROM tovar";
        pool.query(sql, [], (err, result) => {
          if (err) {
            return console.error(err.message);
          }
          if (result.rows.length === 0) {
            return res.status(404).json({ error: "Product not found" });
          }
          res.json(result.rows);
        });
    }
    else{
        const sql = "SELECT * FROM tovar WHERE type_tovara_id_tovara = $1";
        pool.query(sql, [tovar_type], (err, result) => {
          if (err) {
            return console.error(err.message);
          }
          if (result.rows.length === 0) {
            return res.status(404).json({ error: "Products not found" }); 
          }
          res.json(result.rows);
        });
    }
 
  }
  async getOne(req, res) {
    const id_tovar = req.params.id;
    const { tovar_type } = req.query; // Например можно получить товар с типом - 1 - стул
    if(!tovar_type) return res.status(404).json({error: "Tovar type error"});
     const sql = "SELECT * FROM tovar WHERE id_tovar = $1 AND type_tovara_id_tovara = $2";
    pool.query(sql, [id_tovar, tovar_type], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(400).json({ error: "Invalid syntax" }); // Ошибка базы данных
      }
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Product not found" }); 
      }
      res.json(result.rows[0]);
    });
  }

  // async deleteAll(req, res) {
  //   try {
  //     const result = await pool.query("SELECT COUNT(*) FROM client");
  //     const rowCount = result.rows[0].count;
  //     if (rowCount === "0") {
  //       return res.status(400).send("Error: Table is empty!");
  //     }
  //     await pool.query("DELETE FROM client");
  //     res.send("All records deleted successfully!");
  //   } catch (err) {
  //     console.error(err.message);
  //     return res
  //       .status(400)
  //       .send("Error: Failed to delete all records! " + err.message);
  //   }
  // }
//   async deleteOne(req, res) {
//     const id_main_category = req.params.id;
//     try {
//       const result = await pool.query(`SELECT id_main_category FROM main_category WHERE id_main_category = $1`, [
//         id_main_category,
//       ]);
//       if (result.rows.length === 0) {
//         return res.status(400).send("Error: Client not found!");
//       }
//       await pool.query(`DELETE FROM client WHERE id = $1`, [id]);
//       res.send("Your record was deleted successfully!");
//     } catch (err) {
//       console.error(err.message);
//       return res
//         .status(400)
//         .send("Error: Failed to delete the record! " + err.message);
//     }
//   }

}
module.exports = new TovarController();
