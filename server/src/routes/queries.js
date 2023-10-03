const router = require("express").Router();
const { query } = require("../models/query");

router.get("/query/:table", async (req, res) => {
  const { table } = req.params;
  let { condition, select } = req.body;
  if (!select) select = "*";
  condition ? (condition = `WHERE ${condition}`) : (condition = "");
  const sql = `SELECT ${select} FROM ${table} ${condition}`;
  if (!table) {
    res.status(418).send({ error: "We need to sql query" });
    return;
  }
  let resultQuery = await query(sql);
  res.json({
    Query: resultQuery,
  });
});

router.get("/report/:table1/:table2", async (req, res) => {
  const { table1, table2 } = req.params;
  let { condition, select } = req.body;
  const sql = `SELECT ${select} FROM ${table1},${table2} WHERE ${condition}`;
  if (!table1 || !table2 || !condition || !select) {
    res.status(418).send({ error: "We need more data" });
    return;
  }
  let resultQuery = await query(sql);
  res.json({
    Query: resultQuery,
  });
});

router.post("/query/new/:table", async (req, res) => {
  const { table } = req.params;
  const { values } = req.body;
  if (!values) {
    res.status(418).send({ error: "We need values for the new register" });
    return;
  }
  let resultQuery = await query(`INSERT INTO ${table} SET ?`, values);
  res.json({
    "New id": resultQuery?.insertId,
  });
});

router.put("/query/update/:table/:id", async (req, res) => {
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

router.delete("/query/delete/:table/:id", async (req, res) => {
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
