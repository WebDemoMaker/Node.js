const mongoose = require("mongoose")
const dburl = require("./DB_URL");

console.log("URL is",dburl.URL)
module.exports= mongoose.connect(dburl.URL,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
	console.log("connected to db")
}).catch(err=>{
	console.log("Err in db connection ",err)
})