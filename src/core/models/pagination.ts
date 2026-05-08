import { Request } from "./request";
import { User } from "./user";

export interface RequestPagination{
    count: number,
    next: string | null,
    previous: string | null,
    results: Request[]
}

export interface UserPagination{
    count: number,
    next: string | null,
    previous: string | null,
    results: User[]
}