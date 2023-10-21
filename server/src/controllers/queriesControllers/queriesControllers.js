const { paramsValidation } = require("./validation");
const { query } = require("../../models/query");

const queryConditionSQL = ({ sql, condition, operator }) => {
  let simbol = "";
  if ((operator = "LIKE")) simbol = "%";
  sql = sql + " WHERE ";
  for (let key in condition) {
    sql =
      sql +
      "`" +
      key +
      "`" +
      `${operator} '${simbol}${condition[key]}${simbol}' AND `;
  }
  sql = sql.slice(0, sql.length - 4);
  return sql;
};

const querySelectionSQL = async ({ table }) => {
  const resultQuery = await query(`SELECT * FROM ${table}`);
  let select = "";
  for (let key in resultQuery[0]) {
    key = "`" + key + "`";
    if (key.toLowerCase().includes("fecha"))
      select = select + `,DATE_FORMAT(${key}, '%H:%i %d-%m') AS ${key}`;
    else {
      if (key != "`id`") select = select + `,${key}`;
    }
  }
  select = select.slice(1, select.length);
  return select;
};

const queryGet = async ({ id, condition, table }) => {
  if (id) condition = { [`id_${table}`]: id };
  else {
    if (Object.keys(condition).length === 0) condition = "";
    else {
      await paramsValidation({ condition, table });
    }
  }
  let sql = `SELECT * FROM ${table}`;
  let operator = "=";
  if (table.includes("reporte")) {
    operator = "LIKE";
    const select = await querySelectionSQL({ table });
    sql = `SELECT ${select} FROM ${table}`;
  }

  if (condition) sql = queryConditionSQL({ sql, condition, operator });
  const resultQuery = await query(sql);
  let results = {};
  if (resultQuery.length > 1) {
    results = {
      info: { count: resultQuery.length },
      data: resultQuery,
    };
  } else {
    results = {
      data: resultQuery,
    };
  }
  return results;
};

const queryPost = async ({ values, table }) => {
  if (Object.keys(values).length === 0)
    throw new Error("Información insuficiente para crear el registro");
  await paramsValidation({ table, values });
  const resultQuery = await query(`INSERT INTO ${table} SET ?`, values);
  const result = {
    info: `Registro creado exitosamente con el id: ${resultQuery?.insertId}`,
  };
  return result;
};

const queryPut = async ({ values, table, id }) => {
  if (Object.keys(values).length === 0)
    throw new Error("Información insuficiente para crear el registro");
  await paramsValidation({ values, table });
  const resultQuery = await query(
    `UPDATE ${table} SET ? WHERE id_${table} = ${id}`,
    values
  );
  if (resultQuery.changedRows === 0)
    throw new Error("No se actualizo ningun registro");
  return { info: "Se actualizo el registro con exito" };
};

const queryDelete = async ({ table, id }) => {
  const resultQuery = await query(
    `DELETE FROM ${table} WHERE id_${table} = ${id}`
  );
  if (resultQuery.affectedRows === 0)
    throw new Error(`El registro con id ${id} no existe.`);
  return { info: "El registro fue eliminado exitosamente" };
};

module.exports = {
  queryGet,
  queryPost,
  queryPut,
  queryDelete,
};
