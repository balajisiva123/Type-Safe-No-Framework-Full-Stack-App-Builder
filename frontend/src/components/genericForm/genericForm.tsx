import React, { useState } from "react";
import styles from "./genericForm.module.css";

type AutoFormProps<T extends Record<string,any>>={
    fields:(keyof T & string)[];
    initialValues:Partial<T>;
    onSubmit:(values:Partial<T>)=>void;
}

export function AutoForm<T extends Record<string,any>>({fields,initialValues={},onSubmit}:AutoFormProps<T>){

    const [values,setValues]=useState<Partial<T>>(initialValues);

    const setValue=(k: keyof T & String,v:any)=>setValues(prev=>({...prev,[k]:v}));
return (<form onSubmit={e=>{e.preventDefault(); onSubmit(values);}} className={`${styles.form}`} >
    {fields.map((name)=>(<div key={name} className={`${styles.formItem}`}>
        <label className={`${styles.label}`}>{name}</label>
        <input type="text" value={(values as any)[name] ?? ""} onChange={(e)=>setValue(name,e.target.value)} />
    </div>))}
    <button type="submit"> Save</button>
</form>);
}