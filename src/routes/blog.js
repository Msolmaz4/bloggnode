const router = require("express").Router()
const blog = require("../contollers/blog")

router.route("/")
.get(blog.list)
.post(blog.create)
router.route("/:id")
.get(blog.read)



module.exports=router;