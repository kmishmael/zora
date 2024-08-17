'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { CartesianGrid, XAxis, Line, LineChart } from "recharts"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"

export default function SalesmenDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Salesman Dashboard</CardTitle>
          <CardDescription>Track your sales, commissions, and incentives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card rounded-lg p-4 flex flex-col gap-2">
              <div className="text-muted-foreground">Total Sales</div>
              <div className="text-2xl font-bold">$250,000</div>
              <div className="text-xs text-muted-foreground">+15% YoY</div>
            </div>
            <div className="bg-card rounded-lg p-4 flex flex-col gap-2">
              <div className="text-muted-foreground">Sales Target</div>
              <div className="text-2xl font-bold">$300,000</div>
              <div className="text-xs text-muted-foreground">80% achieved</div>
            </div>
            <div className="bg-card rounded-lg p-4 flex flex-col gap-2">
              <div className="text-muted-foreground">Commission</div>
              <div className="text-2xl font-bold">$25,000</div>
              <div className="text-xs text-muted-foreground">+20% YoY</div>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card rounded-lg p-4 flex flex-col gap-2">
              <div className="text-muted-foreground">Incentives</div>
              <div className="text-2xl font-bold">$5,000</div>
              <div className="text-xs text-muted-foreground">+10% YoY</div>
            </div>
            <div className="bg-card rounded-lg p-4 flex flex-col gap-2">
              <div className="text-muted-foreground">Leads Generated</div>
              <div className="text-2xl font-bold">250</div>
              <div className="text-xs text-muted-foreground">+20% YoY</div>
            </div>
            <div className="bg-card rounded-lg p-4 flex flex-col gap-2">
              <div className="text-muted-foreground">Conversion Rate</div>
              <div className="text-2xl font-bold">40%</div>
              <div className="text-xs text-muted-foreground">+5% YoY</div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link
            href="#"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
            href="#"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
          <LinechartChart className="aspect-[9/4]" />
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Commission and Incentives</CardTitle>
          <CardDescription>Track your earnings and bonuses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="bg-card rounded-lg p-4 flex flex-col gap-2">
              <div className="text-muted-foreground">Commission</div>
              <div className="text-2xl font-bold">$25,000</div>
              <div className="text-xs text-muted-foreground">+20% YoY</div>
            </div>
            <div className="bg-card rounded-lg p-4 flex flex-col gap-2">
              <div className="text-muted-foreground">Incentives</div>
              <div className="text-2xl font-bold">$5,000</div>
              <div className="text-xs text-muted-foreground">+10% YoY</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Leads and Conversion</CardTitle>
          <CardDescription>Track your lead generation and conversion rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card rounded-lg p-4 flex flex-col gap-2">
              <div className="text-muted-foreground">Leads Generated</div>
              <div className="text-2xl font-bold">250</div>
              <div className="text-xs text-muted-foreground">+20% YoY</div>
            </div>
            <div className="bg-card rounded-lg p-4 flex flex-col gap-2">
              <div className="text-muted-foreground">Conversion Rate</div>
              <div className="text-2xl font-bold">40%</div>
              <div className="text-xs text-muted-foreground">+5% YoY</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function LinechartChart(props: any) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  )
}