import { Tables } from "./schema";



export class QueryBuilder<TTable extends keyof Tables>{
    private table:TTable;
    private fields:(keyof Tables[TTable])[]=[];
constructor(table:TTable){
    this.table=table;
}

select<K extends keyof Tables[TTable]>(...fields:K[]){
    this.fields=fields;
    return this;
}

toSQL():string{
    const columns=this.fields.length>0?this.fields.join(", "):"*";
    return `select ${columns} from ${String(this.table)}`;
}
}