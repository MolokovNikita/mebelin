const { Router } = require("express");
const router = new Router();
const tovarController = require("../controllers/tovarController.js");

// router.post("", tovarController.create);
router.get("", tovarController.getAll);
router.get("/:id", tovarController.getOne);
// router.put("", ClientController.update);
// router.put("/password", ClientController.updatePassword);
// router.put("/password/recover", ClientController.recoverPassword);
// router.delete("/:id", ClientController.deleteOne);
// router.delete("", ClientController.deleteAll);

module.exports = router;
