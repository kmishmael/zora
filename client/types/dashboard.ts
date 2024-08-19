export type DashboardData = {
    branchesPerformance: {
        actual_sales: number,
        branch: string,
        target_sales: number
    }[]
    growth: number;
    percentageChange: number,
    salesTrend: {
        date: string;
        total_sales: number
    }[];
    salesmenLeaderboard: {
        branch_name: string,
        rank: number;
        salesman: string;
        total_sales: string;
        average_rating: number;
    }[];
    salesmenPerformance: {
        branch_name: string,
        performance: number,
        sales_target: number,
        salesman: string,
        total_sales: number
    }[];
    topSalesman: {
        name: string,
        total_sales: number
    };
    topSellingProducts:
    {
        product: string,
        total_quantity: number
    }[];
    totalSales: number;
    totalSalesTarget: number;
}

export type SalesDashboardData = {
    commission_trend: {
        date: string;
        total_commission: number;
    }[],
    incentives: {
        amount: number,
        description: string,
        id: number,
        performance_goal_id: number
    }[]
    sales_target: number,
    sales_trend: {
        date: string,
        total_sales: number
    }[],
    total_commission: number,
    total_sales: number,
    total_potential_incentives: number,
    total_earned_incentives: number,
    average_rating: number
}