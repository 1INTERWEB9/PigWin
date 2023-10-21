const router = require("express").Router();
const {
  readRegister,
  createRegister,
  updateRegister,
  deleteRegister,
} = require("../handler/index");

router.get("/:table", readRegister);
router.get("/:table/:id", readRegister);

router.post("/:table", createRegister);

router.put("/:table/:id", updateRegister);

router.delete("/:table/:id", deleteRegister);

router.all("*", (req, res) => {
  res.status(404).json({ Error: "Informacion inexistente o invalida" });
});

module.exports = router;
