const { Router } = require("express");
const router = new Router();
const typeTovaraController = require("../controllers/typeTovaraController.js");

// router.post("", typeTovaraController.create);
router.get("", typeTovaraController.getAll);
// router.delete("/:id", typeTovaraController.deleteOne);
router.get("/:id", typeTovaraController.getOne);
// router.put("", ClientController.update);
// router.put("/password", ClientController.updatePassword);
// router.put("/password/recover", ClientController.recoverPassword);
// router.delete("", ClientController.deleteAll);

module.exports = router;
