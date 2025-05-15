"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const chartData = [
  { status: "Pending", count: 45, fill: "hsl(var(--chart-1))" },
  { status: "Approved", count: 120, fill: "hsl(var(--chart-2))" },
  { status: "Rejected", count: 15, fill: "hsl(var(--chart-3))" },
  { status: "Disbursed", count: 105, fill: "hsl(var(--chart-4))" },
  { status: "Overdue", count: 8, fill: "hsl(var(--chart-5))" },
]

const chartConfig = {
  count: {
    label: "Number of Loans",
  },
  Pending: { label: "Pending", color: "hsl(var(--chart-1))" },
  Approved: { label: "Approved", color: "hsl(var(--chart-2))" },
  Rejected: { label: "Rejected", color: "hsl(var(--chart-3))" },
  Disbursed: { label: "Disbursed", color: "hsl(var(--chart-4))" },
  Overdue: { label: "Overdue", color: "hsl(var(--chart-5))" },
}

export default function LoanStatusChart() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Loan Application Status Overview</CardTitle>
        <CardDescription>Current distribution of loan applications by status.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
           <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{left: 10, right: 30}}>
              <CartesianGrid horizontal={false} />
              <XAxis type="number" hide/>
              <YAxis 
                dataKey="status" 
                type="category" 
                tickLine={false} 
                axisLine={false} 
                tickMargin={10}
                width={80}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="count" radius={5} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
