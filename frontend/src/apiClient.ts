import type {API} from "../../shared/api";

type EndPoints={
    getUser:{
        req:API.GetUser.Request;
        res:API.GetUser.Response;
    }
}

export async function fetchApi<K extends keyof EndPoints>(
    endpoint:K,
    req:EndPoints[K]["req"]):Promise<EndPoints[K]["res"]>
    {
        const res=await fetch(`http://localhost:4000/api/${endpoint}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(req)
        });
        return res.json();
    }

