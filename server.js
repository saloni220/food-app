const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const dbconnect = require('./config/db')
const routes=require('./routes/authrouts');
const user=require('./routes/userroutes');
const restaurant=require('./routes/RestaurantRoutes')
const JWT = require('jsonwebtoken')

dbconnect();
dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/api/v1/test',require('./routes/testroutes'))
app.use('/api/v1/auth',require('./routes/authrouts'))
app.use('/api/v1/user',require('./routes/userroutes'))  
app.use('/api/v1/restaurant',require('./routes/RestaurantRoutes'))
app.use('/api/v1/category',require('./routes/categoryRoute'))
app.use('/api/v1/food',require('./routes/foodRoute'))

app.get('/',async(req,res)=>{
    return res.status(200).send("<h1>welcome here <hr> how are you <br> API BASED PROJECT</h1>")
})
const port=process.env.PORT||5500
app.listen(port,()=>{
    console.log(`server running on ${port}`)
})
  
