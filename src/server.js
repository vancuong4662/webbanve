const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const configViewEngine = require('./config/viewEngine.js')
const mysql = require('mysql2')
const connection = require('./config/connectDB.js')
// require('dotenv').config()

// console.log("Test env",process.env)

const app = express()
const port = 3000
const webRouter = require("./routes/web.js")

// Sử dụng bodyParser để parse JSON và urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', webRouter)

configViewEngine(app)



// A simple SELECT query
// connection.query(
//   'SELECT * FROM dulieubanve',
//   function (err, results, fields) {
//     console.log('>>Results: ',results); // results contains rows returned by server
//     console.log('>>Fields: ',fields); // fields contains extra meta data about results, if available
//   }
// );


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})