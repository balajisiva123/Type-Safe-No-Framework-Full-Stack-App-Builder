import { Tables } from "./schema";



export class QueryBuilder<TTable extends keyof Tables>{
    private table:TTable;
    private fields:(keyof Tables[TTable])[]=[];
    private whereClauses:string[]=[]

constructor(table:TTable){
    this.table=table;
}

select<K extends keyof Tables[TTable]>(...fields:K[]){
    this.fields=fields;
    return this;
}


where<K extends keyof Tables[TTable]>(field:K,operator:"="|"!="|"<"|">"|"<=",value:Tables[TTable][K]){

const formattedValue=typeof value==="string"?`'${value}'`:value;

this.whereClauses.push(`${String(field)} ${operator} ${formattedValue}`);
return this;
}

toSQL():string{
    const columns=this.fields.length>0?this.fields.join(", "):"*";
    const base=`select ${columns} from ${String(this.table)}`;
    return this.whereClauses? `${base} where ${this.whereClauses.join(" AND ")}`:base;
}
}