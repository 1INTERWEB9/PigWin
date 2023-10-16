const router = require("express").Router();
const {
  queryGet,
  queryCreateRegister,
  queryUpdateRegister,
  queryDeleteRegister,
} = require("../controllers/queriesControllers/queriesControllers");

router.get("/:table", queryGet);
router.get("/:table/:id", queryGet);

router.post("/:table", queryCreateRegister);

router.put("/:table/:id", queryUpdateRegister);

router.delete("/:table/:id", queryDeleteRegister);

router.all("*", (req, res) => {
  res.status(404).json({ Error: "Informacion inexistente o invalida" });
});

module.exports = router;
