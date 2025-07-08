const  mongoose=require('mongoose')
const dbconnect=async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/food")
        console.log(`connect with DATBASE${mongoose.connection.host}`)

    }
    catch(error){
        console.log("DB error ",error)
    }
}
module.exports=dbconnect;