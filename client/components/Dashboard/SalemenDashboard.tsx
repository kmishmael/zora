import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { LinechartChart } from "./LineChart";
import { SalesDashboardData } from "@/types/dashboard";
import api from "@/lib/axios/private";
import { useSession } from "next-auth/react";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function SalesmenDashboard() {
  //const { data: session, status } = useSession();
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }
  const response = await api.get<SalesDashboardData>(
    `/sales/dashboard/salesman/${session?.user.id}`,
  );
  if (response.status != 201) {
    return <>Something went terribly wrong! {response.status}</>;
  }
  let dashboardData = response.data;

  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Welcome <span className="text-primary">{session.user.name.split(" ")[0]}</span></CardTitle>
          <CardDescription>
            Track your sales, commissions, and incentives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2 rounded-lg bg-card p-4">
              <div className="text-muted-foreground">Total Sales</div>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "KES",
                }).format(dashboardData.total_sales)}
              </div>
              {/* <div className="text-xs text-muted-foreground">+15% YoY</div> */}
            </div>
            <div className="flex flex-col gap-2 rounded-lg bg-card p-4">
              <div className="text-muted-foreground">Sales Target</div>
              <div className="text-2xl font-bold">
                {" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "KES",
                }).format(dashboardData.sales_target)}
              </div>
              <div className="text-xs text-muted-foreground">
                {Math.floor(
                  (dashboardData.sales_target / dashboardData.total_sales) *
                    100,
                )}
                % achieved
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-lg bg-card p-4">
              <div className="text-muted-foreground">Average Rating</div>
              <div className="text-2xl font-bold">
                {Number(dashboardData.average_rating).toFixed(1)}
              </div>
              {/* <div className="text-xs text-muted-foreground">+20% YoY</div> */}
            </div>
          </div>
          <Separator className="my-6" />
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2 rounded-lg bg-card p-4">
              <div className="text-muted-foreground">Commission</div>
              <div className="text-2xl font-bold">
                {" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "KES",
                }).format(dashboardData.total_commission)}
              </div>
              {/* <div className="text-xs text-muted-foreground">+20% YoY</div> */}
            </div>

            <div className="flex flex-col gap-2 rounded-lg bg-card p-4">
              <div className="text-muted-foreground">Incentives</div>
              <div className="text-2xl font-bold">
                {" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "KES",
                }).format(dashboardData.total_earned_incentives)}
              </div>
              {/* <div className="text-xs text-muted-foreground">+10% YoY</div> */}
            </div>
            {/* <div className="flex flex-col gap-2 rounded-lg bg-card p-4">
              <div className="text-muted-foreground">Leads Generated</div>
              <div className="text-2xl font-bold">250</div>
              <div className="text-xs text-muted-foreground">+20% YoY</div>
            </div>
            <div className="flex flex-col gap-2 rounded-lg bg-card p-4">
              <div className="text-muted-foreground">Conversion Rate</div>
              <div className="text-2xl font-bold">40%</div>
              <div className="text-xs text-muted-foreground">+5% YoY</div>
            </div> */}
          </div>
        </CardContent>
        <CardFooter>
          <Link
            href="/sales/register"
            className="text-primary-foreground inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            prefetch={false}
          >
            Register New Sale
          </Link>
        </CardFooter>
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Register Sale</CardTitle>
          <CardDescription>Log a new sale for your customers</CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href="/sales/register"
            className="text-primary-foreground inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            prefetch={false}
          >
            Register New Sale
          </Link>
        </CardContent>
      </Card>
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Sales Trends</CardTitle>
          <CardDescription>Sales performance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <LinechartChart
            data={dashboardData.sales_trend}
            xdataKey="total_sales"
            ydataKey="total_sales"
            label="Date"
            className="aspect-[9/4]"
          />
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Commission and Incentives</CardTitle>
          <CardDescription>Track your earnings and bonuses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex flex-col gap-2 rounded-lg bg-card p-4">
              <div className="text-muted-foreground">Commission</div>
              <div className="text-2xl font-bold">
                {" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "KES",
                }).format(dashboardData.total_commission)}
              </div>
              {/* <div className="text-xs text-muted-foreground">+20% YoY</div> */}
            </div>
            <div className="flex flex-col gap-2 rounded-lg bg-card p-4">
              <div className="text-muted-foreground">Incentives Earned</div>
              <div className="text-2xl font-bold">
                {" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "KES",
                }).format(dashboardData.total_earned_incentives)}
              </div>
              {/* <div className="text-xs text-muted-foreground">+10% YoY</div> */}
            </div>
            <div className="flex flex-col gap-2 rounded-lg bg-card p-4">
              <div className="text-muted-foreground">Potential Incentives</div>
              <div className="text-2xl font-bold">
                {" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "KES",
                }).format(dashboardData.total_potential_incentives)}
              </div>
              {/* <div className="text-xs text-muted-foreground">+10% YoY</div> */}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Leads and Conversion</CardTitle>
          <CardDescription>
            Track your lead generation and conversion rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 rounded-lg bg-card p-4">
              <div className="text-muted-foreground">Leads Generated</div>
              <div className="text-2xl font-bold">250</div>
              <div className="text-xs text-muted-foreground">+20% YoY</div>
            </div>
            <div className="flex flex-col gap-2 rounded-lg bg-card p-4">
              <div className="text-muted-foreground">Conversion Rate</div>
              <div className="text-2xl font-bold">40%</div>
              <div className="text-xs text-muted-foreground">+5% YoY</div>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
