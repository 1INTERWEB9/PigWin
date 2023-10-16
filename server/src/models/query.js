const { connection } = require("../database");
const query = async (sql, data) => {
  try {
    const [results] = await connection
      .promise()
      .query(sql, data ? data : undefined);
    if (Object.keys(results).length === 0) throw new Error("Filtro invalido");
    return results;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  query,
};
