import { useState } from "react";
import { fetchApi } from "./apiClient";

export default function  App(){
  const [user,setUser]=useState<{id:string;name:string;}|null>(null);

     async function loadUser(){
      const data=await fetchApi("getUser",{id:"123"});
      setUser(data);
     }

  return  <div>
      <button onClick={loadUser}>Get User</button>
      {user && <p>{user.name}</p>}
    </div>
}