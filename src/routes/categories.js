const router = require("express").Router()
const categories = require("../contollers/categories")
router.route("/").get(categories.list)
router.route("/").post(categories.create)




module.exports = router