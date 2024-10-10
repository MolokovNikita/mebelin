const { Router } = require("express");
const router = new Router();
const kachestvoTovaraController = require("../controllers/kachestvoTovaraController.js");

// router.post("", kachestvoTovaraController.create);
// router.get("", kachestvoTovaraController.getAll);
// router.delete("/:id", kachestvoTovaraController.deleteOne);
router.get("/:id", kachestvoTovaraController.getOne);
// router.put("", ClientController.update);
// router.put("/password", ClientController.updatePassword);
// router.put("/password/recover", ClientController.recoverPassword);
// router.delete("", ClientController.deleteAll);

module.exports = router;
