const express = require("express")
const app = express()
require( "dotenv").config();
const PORT = process.env.PORT || 5000;
require("./src/config/db")
app.use(express.json()) 
app.use(require("./src/midewallers/logger"))
app.use(require("./src/midewallers/findSearch"))
app.use(require("./src/midewallers/authentic"))
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'BLOG API',
        documents: {
            swagger: '/documents/swagger',
            redoc: '/documents/redoc',
            json: '/documents/json',
        },
        user: req.user
    })
})


app.use("/users",require("./src/routes/user"))
app.use("/blogs",require(`./src/routes/blog`))
app.use("/auth",require("./src/routes/auth"))
app.use("/categories",require("./src/routes/categories"))
app.use("/comments",require("./src/routes/comments"))
app.use("/documents",require("./src/routes/documents"))

app.use("/token",require('./src/routes/token'))
app.use("/admin",require("./src/routes/admin"));


app.listen(PORT,()=>console.log("consoldayiy"))