  const express = require("express")
const welcomeRouter = require("./welcome/welcome.router")
const postsRouter = require("./routers/posts-routers")
const commentssRouter = require("./routers/comments-routers")
 

const server = express()
const port = 5300

server.use(express.json())
server.use(welcomeRouter)
server.use(postsRouter)
server.use(commentssRouter) 


   


server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})  