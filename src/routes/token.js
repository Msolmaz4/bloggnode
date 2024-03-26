const router = require("express").Router()
const token = require("../contollers/token")
router.route("/").get(token.list)




module.exports = router