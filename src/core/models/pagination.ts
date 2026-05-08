import { Request } from "./request";

export interface RequestPagination{
    count: number,
    next: string | null,
    previous: string | null,
    results: Request[]
}