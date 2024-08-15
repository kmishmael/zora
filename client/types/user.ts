import { Role } from "./role";
export type User = {
    id: number;
    branch_id: null | number;
    created_on: string;
    email: string;
    name: string;
    role: Role;
}
export type Users = {
    current_page: number;
    pages: number;
    total: number;
    users: User[]
}
