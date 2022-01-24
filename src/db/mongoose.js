const mongoose = require('mongoose')
require('dotenv').config()

const Uri= 'mongodb+srv://'+process.env.user+':'+process.env.pass+'@cluster0.yvfhk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' // here as you can see uri changed we have to put dbname also
const validator = require('validator')

mongoose.connect(Uri , { 
    // useNewUriParser:true,  
    // useCreateIndex: true
}).then((res)=>{
    console.log("Connected!")
}).catch((err)=>{
    console.log(err)
})
