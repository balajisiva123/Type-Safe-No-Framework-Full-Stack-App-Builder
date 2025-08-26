import React, { useState } from "react";
import styles from "./genericForm.module.css";

type FieldKind="text"|"number"|"checkbox"|"date"|"select";

type FieldConfig<T>={
    label?:string;
    placeholder?:string;
    kind?:FieldKind;
    options?:{lable:string,value:string|number}[];
    required?:boolean;

}

type FieldsConfig<T>=Partial<Record<keyof T&string,FieldConfig<T>>>;

type AutoFormProps<T extends Record<string,any>>={
    fields:(keyof T & string)[];
    config?:FieldsConfig<T>;
    initialValues:Partial<T>;
    onSubmit:(values:Partial<T>)=>void;
}

export function AutoForm<T extends Record<string,any>>({fields,config={},initialValues={},onSubmit}:AutoFormProps<T>){

    const [values,setValues]=useState<Partial<T>>(initialValues);

    const setValue=(k: keyof T & String,v:any)=>setValues(prev=>({...prev,[k]:v}));
return (<form onSubmit={e=>{e.preventDefault(); onSubmit(values);}} className={`${styles.form}`} >
    {fields.map((name)=>
        {
            const c=config[name]??{};
            const kind=c.kind??"text";

            switch(kind){
                case "number":
                    return (<div key={name} className={`${styles.formItem}`}>
        <label className={`${styles.label}`}>{c.label??name}</label>
        <input type="number" placeholder={c.placeholder} 
        value={(values as any)[name] ?? ""}
         onChange={(e)=>setValue(name,e.target.value)} />
    </div>)

           case "checkbox":
             return (<div key={name} className={`${styles.formItem}`}>
             <label className={`${styles.label}`}>
             <input type="checkbox" placeholder={c.placeholder} 
             checked={!!(values as any)[name]}
             onChange={(e)=>setValue(name,e.target.checked)} />{" "}{c.label??name}</label>
            </div>)

          case "date":
             return (<div key={name} className={`${styles.formItem}`}>
             <label className={`${styles.label}`}>{c.label??name}</label>
             <input type="date" placeholder={c.placeholder} 
             value={(values as any)[name]?new Date().toISOString().substring(0,10):""}
             onChange={(e)=>setValue(name,e.target.value? new Date(e.target.value):undefined)} />
            </div>)

          case "select":
             return (<div key={name} className={`${styles.formItem}`}>
             <label className={`${styles.label}`}>{c.label??name}</label>
             <select value={(values as any)[name]??""} onChange={e=>setValue(name,e.target.value)}>
                  <option value="" disabled>
                    {c.placeholder ?? "Select..."}
                  </option>
                  {(c.options??[]).map((o)=><option key={String(o.value)} value={String(o.value)}> {o.lable}</option>)}
             </select>
             </div>)
           case "text":
              default:
                 return (<div key={name} className={`${styles.formItem}`}>
        <label className={`${styles.label}`}>{c.label??name}</label>
        <input type="text" placeholder={c.placeholder} 
        value={(values as any)[name] ?? ""}
         onChange={(e)=>setValue(name,e.target.value)} />
    </div>)
             
             {/* <input type="date" placeholder={c.placeholder} 
             value={(values as any)[name]?new Date().toISOString().substring(0,10):""}
             onChange={(e)=>setValue(name,e.target.value? new Date(e.target.value):undefined)} /> */}
          
            }
            }
)}
    
    <button type="submit"> Save</button>
</form>);
}