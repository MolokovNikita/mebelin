const { Router } = require("express");
const router = new Router();
const ClientController = require("../controllers/clientController.js");

router.post("", ClientController.create);
router.get("", ClientController.getAll);
router.get("/:id", ClientController.getOne);
// router.put("", ClientController.update);
// router.put("/password", ClientController.updatePassword);
// router.put("/password/recover", ClientController.recoverPassword);
// router.delete("/:id", ClientController.deleteOne);
// router.delete("", ClientController.deleteAll);

module.exports = router;
