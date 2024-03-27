const router = require("express").Router()

const user = require("../contollers/user")
const upload = require("../midewallers/upload")
const permission = require("../midewallers/permission")

router.route("/")
.get(permission.isAdmin,user.list)
.post(upload.array("image"),user.create);
router.route("/:id")
.get(permission.isLogin,user.read)
.patch(permission.isLogin,user.update)
.put(permission.isLogin,user.update)
.delete(permission.isLogin,user.delete)





module.exports = router