export type Branch = {
    id: number;
    name: string;
    address: string;
}

export type Branches = {
    branches: Branch[];
    current_page: number,
    pages: number,
    total: number
}
