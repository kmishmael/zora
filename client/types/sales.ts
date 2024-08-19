export type Sale = {
    branch_id: number,
    customer_email: string,
    customer_name: string,
    feedback: Feedback | null,
    id: number,
    product_id: number,
    quantity: number,
    timestamp: string,
    total_price: number,
    unit_price: number,
    user_id: number
}

export type Feedback = {
    comment: string;
    id: number,
    rating: number,
    sale_id: number,
    timestamp: string
}