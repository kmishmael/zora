export type PerformanceGoals = {
    current_page: number;
    pages: number;
    performance_goals: PerformanceGoal[],
    total: number;
}

export type PerformanceGoal = {
    id: number;
    achieved_sales: number;
    end_date: string;
    start_date: string;
    incentive_amount: number;
    target_sales: number;
    user_id: number;
    user_name: string;
}