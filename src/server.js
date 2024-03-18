const express = require('express')
const path = require('path')
// require('dotenv').config()

// console.log("Test env",process.env)

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname,"public")))

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.get('/', (req, res) => {
  //res.send('Hello World edit lai!')
  res.render('test.ejs')
})

app.get('/test', (req, res) => {
    res.send('Đây là route test thử')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})