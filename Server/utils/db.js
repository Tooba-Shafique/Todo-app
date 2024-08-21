const mongoose = require ('mongoose')
// this is Db connection file
const ConnectDB =async()=>{
try {
    const connect =await mongoose.connect(process.env.MONGO_URL)
    console.log("Connected to DB")
} catch (error) {
    console.log("There is some issue during DB connection");
}
}
module.exports=ConnectDB;
