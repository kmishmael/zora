export type User = {
    id: number;
    branch_id: null | number;
    created_on: string;
    email: string;
    name: string;
    role: string;
}
export type Users = {
    current_page: number;
    pages: number;
    total: number;
    users: User[]
}