const express = require('express')
const path = require('path')
const configViewEngine = require('./config/viewEngine.js')
// require('dotenv').config()

// console.log("Test env",process.env)

const app = express()
const port = 3000
const webRouter = require("./routes/web.js")

app.use('/', webRouter)

configViewEngine(app)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})