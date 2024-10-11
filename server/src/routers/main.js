const express = require("express");
const clientRouter = require('../routers/clientRouter.js')
const mainCategoryRouter = require("../routers/mainCategoryRouter.js");
const tovarRouter = require("../routers/tovarRouter.js");
const fabricRouter = require("../routers/fabricRouter.js");
const kachestvoTovaraRouter = require("../routers/kachestvoTovaraRoute.js");
const productStoreAvailabillityRouter = require("../routers/productStoreAvaliability.js");
const typeTovaraRouter = require("../routers/typeTovaraRouter.js");
const reviewRouter = require("../routers/reviewRouter.js");
const authRouter = require("../routers/authRouter.js")
//routers
const router = express.Router();

    router.use("/auth", authRouter);
    router.use("/client", clientRouter);
    router.use("/main_category", mainCategoryRouter);
    router.use("/tovar", tovarRouter);
    router.use("/fabric", fabricRouter);
    router.use("/kachestvo",kachestvoTovaraRouter);
    router.use("/type-tovara", typeTovaraRouter);
    router.use("/reviews", reviewRouter)
    router.use("/product-store-availabillity",productStoreAvailabillityRouter)
module.exports = router;
