import dotenv from "dotenv/config"
import connectDB from "./db/connectDB.js";
import { app } from "./app.js";

connectDB()
.then(()=>{
    app.on("Error",(err)=>{
        console.log("Error:",err);
        throw err;
    })

    app.listen(process.env.PORT || 3000, ()=>{
        console.log("App is Listening on Port:",process.env.PORT);
    })
})
.catch((err)=> {
    console.log("MySql Connection Failed !!! :",err);
})

