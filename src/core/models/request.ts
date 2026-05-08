import { Document } from "./document"

export interface Request{
    id: number,
    name: string,
    last_name: string,
    first_name: string,
    date_of_birth: string,
    genre: string,
    genre_display : string,
    street_name : string,
    house_number  : string,
    quarter : string,
    commune: string,
    telephone_number: string,
    email: string,
    profession: string,
    status: string
    status_display : string,
    created_at : string,
    updated_at : string
    document: Document
}