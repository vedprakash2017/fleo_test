const express = require('express')
const app = express()
const port = process.env.PORT || 3000
require('./db/mongoose')

const model = require('./models/model.js')
const basicRoute = require('./router/basicRoute.js')
app.use(express.json())
app.use(basicRoute)

app.listen(port , ()=>{
    console.log('connected to ',port)
})