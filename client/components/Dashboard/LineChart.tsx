'use client';
import { CartesianGrid, XAxis, Line, LineChart } from "recharts";
import {
    ChartTooltipContent,
    ChartTooltip,
    ChartContainer,
  } from "@/components/ui/chart";

export function LinechartChart(props: any) {
    return (
      <div {...props}>
        <ChartContainer
          config={{
            desktop: {
              label: props.label as string,
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <LineChart
            accessibilityLayer
            data={props.data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={props.xdataKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            //  tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey={props.ydataKey}
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </div>
    );
  }
  