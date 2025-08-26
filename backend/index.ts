import express from "express";
import cors from "cors";
import {API} from "../shared/api"
import { Tables } from "./schema";
import { QueryBuilder } from "./queryBuilder";

const app=express();

app.use(cors());

app.use(express.json());

// const qb=new QueryBuilder("softwareStatus").select("sno","software","status").where("softwareType","=","service");
const qb=new QueryBuilder("softwareStatus").select("sno","software","status").where("softwareType","=","service").where("sno",">",10);

console.log(qb.toSQL());

app.post("/api/getUser",(req,res)=>{
    const {id}=req.body as API.GetUser.Request;
    const user:API.GetUser.Response={id,name:"Ajith Kumar"};
    res.json(user);

});

app.listen(4000,()=>{
    console.log("Backend Running on Port 4000");
})
