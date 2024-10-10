const { Router } = require("express");
const router = new Router();
const reviewController = require("../controllers/reviewController");

// router.post("", typeTovaraController.create);
router.get("", reviewController.getAll);
router.get("/:id", reviewController.getAllById);

// router.delete("/:id", typeTovaraController.deleteOne);
// router.get("/:id", reviewController.getOne);
// router.put("", ClientController.update);
// router.put("/password", ClientController.updatePassword);
// router.put("/password/recover", ClientController.recoverPassword);
// router.delete("", ClientController.deleteAll);

module.exports = router;
