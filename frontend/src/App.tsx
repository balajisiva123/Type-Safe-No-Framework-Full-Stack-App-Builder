import { useState } from "react";
import { fetchApi } from "./apiClient";
import { AutoForm } from "./components/genericForm/genericForm";
type User={name:string,email:string,id:number,isActive?:boolean};

export default function  App(){
  const [user,setUser]=useState<{id:string;name:string;}|null>(null);

     async function loadUser(){
      const data=await fetchApi("getUser",{id:"123"});
      setUser(data);
     }

  return  <div>
      <button onClick={loadUser}>Get User</button>
      {user && <p>{user.name}</p>}

      <AutoForm<User> fields={["id","name","email"]} 
      config={{
          id:{label:"ID" ,placeholder:"12",kind:"number"},
        name:{label:"Full Name" ,placeholder:"Ada",kind:"text"},
        email:{label:"Email" ,placeholder:"ada@example.com"}
      }} 
      initialValues={{name:"Ada",email:"ada@example.com",id:12}} 
        onSubmit={(v)=>console.log("submit",v)}/>
    </div>
}