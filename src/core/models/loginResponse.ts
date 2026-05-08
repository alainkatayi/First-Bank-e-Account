export interface LoginResponse {
    access: string;
    refresh: string;
    user:{
        id:number,
        username: string,
        email: string,
        role: string
    }
}