const { query } = require("../../models/query");
const { paramsValidation } = require("./validation");

const queryGet = async (request, response) => {
  const { table, id } = request.params;
  let condition = request.query;
  try {
    if (id) condition = { [`id_${table}`]: id };
    else {
      if (Object.keys(condition).length === 0) condition = "";
      else {
        await paramsValidation({ condition, table });
      }
    }
    let sql = `SELECT * FROM ${table}`;
    condition ? (sql = sql + " WHERE ?") : (sql = sql);
    const resultQuery = await query(sql, condition);
    if (resultQuery.length > 1) {
      response.json({
        info: { count: resultQuery.length },
        data: resultQuery,
      });
    } else {
      response.json({ data: resultQuery });
    }
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const queryCreateRegister = async (request, response) => {
  const { table } = request.params;
  const values = request.body;
  try {
    if (Object.keys(values).length === 0)
      throw new Error("Información insuficiente para crear el registro");
    await paramsValidation({ values, table });
    const resultQuery = await query(`INSERT INTO ${table} SET ?`, values);
    response.json({
      info: `Registro creado exitosamente con el id: ${resultQuery?.insertId}`,
    });
  } catch (error) {
    response.status(400).json({ Error: error.message });
  }
};

const queryUpdateRegister = async (request, response) => {
  const { table, id } = request.params;
  const values = request.body;
  try {
    if (Object.keys(values).length === 0)
      throw new Error("Información insuficiente para crear el registro");
    await paramsValidation({ values, table });
    const resultQuery = await query(
      `UPDATE ${table} SET ? WHERE id_${table} = ${id}`,
      values
    );
    if (resultQuery.changedRows === 0)
      throw new Error("No se actualizo ningun registro");
    response.json({ info: "Se actualizo el registro con exito" });
  } catch (error) {
    response.status(400).json({ Error: error.message });
  }
};

const queryDeleteRegister = async (request, response) => {
  const { table, id } = request.params;
  try {
    const resultQuery = await query(
      `DELETE FROM ${table} WHERE id_${table} = ${id}`
    );
    if (resultQuery.affectedRows === 0)
      throw new Error(`El registro con id ${id} no existe.`);
    response.json({ info: "El registro fue eliminado exitosamente" });
  } catch (error) {
    response.status(400).json({ Error: error.message });
  }
};

module.exports = {
  queryGet,
  queryCreateRegister,
  queryUpdateRegister,
  queryDeleteRegister,
};
