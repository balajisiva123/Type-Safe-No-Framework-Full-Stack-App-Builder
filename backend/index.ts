import express from "express";
import cors from "cors";
import {API} from "../shared/api"


const app=express();

app.use(cors());

app.use(express.json());


app.post("/api/getUser",(req,res)=>{
    const {id}=req.body as API.GetUser.Request;
    const user:API.GetUser.Response={id,name:"Alice"};
    res.json(user);

});

app.listen(4000,()=>{
    console.log("Backend Running on Port 4000");
})
