const router = require("express").Router()
const categories = require("../contollers/categories")
router.route("/").get(categories.list)




module.exports = router