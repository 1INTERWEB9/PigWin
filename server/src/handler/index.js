const {
  queryGet,
  queryPost,
  queryPut,
  queryDelete,
} = require("../controllers/queriesControllers/queriesControllers");

const readRegister = async (request, response) => {
  const { table, id } = request.params;
  let condition = request.query;
  try {
    const results = await queryGet({ id, condition, table });
    response.json(results);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const createRegister = async (request, response) => {
  const { table } = request.params;
  const values = request.body;
  try {
    const result = await queryPost({ table, values });
    response.json(result);
  } catch (error) {
    response.status(400).json({ Error: error.message });
  }
};

const updateRegister = async (request, response) => {
  const { table, id } = request.params;
  const values = request.body;
  try {
    const results = await queryPut({ values, table, id });
    response.json(results);
  } catch (error) {
    response.status(400).json({ Error: error.message });
  }
};

const deleteRegister = async (request, response) => {
  const { table, id } = request.params;
  try {
    const results = await queryDelete({ table, id });
    response.json(results);
  } catch (error) {
    response.status(400).json({ Error: error.message });
  }
};

module.exports = {
  readRegister,
  createRegister,
  updateRegister,
  deleteRegister,
};
