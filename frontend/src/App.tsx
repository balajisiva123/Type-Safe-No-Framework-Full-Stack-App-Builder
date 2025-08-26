import { useState } from "react";
import { fetchApi } from "./apiClient";
import { AutoForm } from "./components/genericForm/genericForm";
type User={name:string,email:string};

export default function  App(){
  const [user,setUser]=useState<{id:string;name:string;}|null>(null);

     async function loadUser(){
      const data=await fetchApi("getUser",{id:"123"});
      setUser(data);
     }

  return  <div>
      <button onClick={loadUser}>Get User</button>
      {user && <p>{user.name}</p>}

      <AutoForm<User> fields={["name","email"]} initialValues={{name:"Ada"}} 
        onSubmit={(v)=>console.log("submit",v)}/>
    </div>
}