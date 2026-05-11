import { Request } from "./request"
import { User } from "./user"

export interface Decision{
    id:number
    request:Request
    agent:User
    motivation:string,
    decision_type:string
}