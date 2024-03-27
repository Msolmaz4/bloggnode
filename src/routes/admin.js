const router = require("express").Router()
const admin = require("../contollers/admin")

router.route("/").get(admin)
module.exports =  router;