const express = require('express')
const app = express()
const port = 3000

app.set('views','./src/views')
app.set('view engine','ejs')

app.get('/', (req, res) => {
  res.send('Hello Worldzz!')
  //res.render('test.ejs')
})

app.get('/test', (req, res) => {
    res.send('Đây là route test thử')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})