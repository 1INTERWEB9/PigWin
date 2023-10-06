const router = require("express").Router();
const { query } = require("../models/query");

router.get("/query/:table", async (req, res) => {
  const { table } = req.params;
  let { condition } = req.query;
  condition ? (condition = `WHERE ${condition}`) : (condition = "");
  const sql = `SELECT * FROM ${table} ${condition}`;
  let resultQuery;
  try {
    resultQuery = await query(sql);
    res.send({
      Query: resultQuery,
    });
  } catch (error) {
    res.status(404).send(`Error consulta \n${error.message}`);
  }
});

router.get("/query/:table1/:table2", async (req, res) => {
  const { table1, table2 } = req.params;
  let { condition } = req.query;
  const sql = `SELECT * FROM ${table1},${table2} WHERE ${condition}`;
  let resultQuery;
  try {
    resultQuery = await query(sql);
    res.json({
      Query: resultQuery,
    });
  } catch (error) {
    res.status(404).send(`Error consulta \n${error.message}`);
  }
});

router.post("/query/:table", async (req, res) => {
  const { table } = req.params;
  const { values } = req.body;
  let resultQuery;
  try {
    resultQuery = await query(`INSERT INTO ${table} SET ?`, values);
    res.send({
      "New id": resultQuery?.insertId,
    });
  } catch (error) {
    res.status(404).send(`Error consulta \n${error.message}`);
  }
});

router.put("/query/:table/:id", async (req, res) => {
  const { table } = req.params;
  const { id } = req.params;
  const { data } = req.body;
  if (!data) {
    res.status(418).send({ error: "We need information to update register" });
    return;
  }
  let resultQuery = await query(
    `UPDATE ${table} SET ${data?.columns} WHERE id_${table} = ${id}`,
    data?.values
  );
  res.json({ "Update register": resultQuery?.info });
});

router.delete("/query/:table/:id", async (req, res) => {
  const { table } = req.params;
  const { id } = req.params;
  if (!table) {
    res.status(418).send({ error: "We need a table to delete register" });
    return;
  }
  let resultQuery = await query(`DELETE FROM ${table} WHERE id_${table} = ?`, [
    id,
  ]);
  res.json({ "Delete register": resultQuery?.info });
});

module.exports = router;
