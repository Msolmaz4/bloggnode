const router = require("express").Router()
const blog = require("../contollers/blog")

router.route("/")
.get(blog.list)
.post(blog.create)
router.route("/:id")
.get(blog.read)
.patch(blog.update)
.put(blog.update)
.delete(blog.delete)



module.exports=router;