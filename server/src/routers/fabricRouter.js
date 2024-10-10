const { Router } = require("express");
const router = new Router();
const fabricController = require("../controllers/fabricController.js");

// router.post("", fabricController.create);
// router.get("", fabricController.getAll);
// router.delete("/:id", fabricController.deleteOne);
router.get("/:id", fabricController.getOne);
// router.put("", ClientController.update);
// router.put("/password", ClientController.updatePassword);
// router.put("/password/recover", ClientController.recoverPassword);
// router.delete("", ClientController.deleteAll);

module.exports = router;
