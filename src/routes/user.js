const router = require("express").Router()

const user = require("../contollers/user")


router.route("/")
.get(user.list)
.post(user.create);
router.route("/:id")
.get(user.read)
.patch(user.update)
.put(user.update)
.delete(user.delete)




module.exports = router