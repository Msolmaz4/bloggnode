const router = require("express").Router();

const auth = require("../contollers/auth")


router.post("/login",auth.login)
router.post("/refresh",auth.refresh)
router.get("/register",auth.logout)

module.exports = router