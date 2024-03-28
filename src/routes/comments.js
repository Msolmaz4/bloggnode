const router = require("express").Router()
const comment = require("../contollers/comment")

router.route("/")
.get(comment.list)
.post(comment.create)
router.route("/:id")
.get(comment.read)
.patch(comment.update)
.put(comment.update)
.delete(comment.delete)



module.exports = router