const { Router } = require("express");
const router = new Router();
const MainCategoryController = require("../controllers/mainCategoryController.js");

router.post("", MainCategoryController.create);
router.get("", MainCategoryController.getAll);
router.delete("/:id", MainCategoryController.deleteOne);
router.get("/:id", MainCategoryController.getOne);
// router.put("", ClientController.update);
// router.put("/password", ClientController.updatePassword);
// router.put("/password/recover", ClientController.recoverPassword);
// router.delete("", ClientController.deleteAll);

module.exports = router;
