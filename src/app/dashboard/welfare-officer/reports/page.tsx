"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RoleSpecificContent from "@/components/dashboard/RoleSpecificContent";
import { ArrowLeft, BarChartHorizontalBig, CalendarDays, Download, Users } from "lucide-react";
import Link from "next/link";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const welfareReportData = [
  { month: "Jan", open: 12, resolved: 20, closed: 5 },
  { month: "Feb", open: 15, resolved: 18, closed: 3 },
  { month: "Mar", open: 10, resolved: 25, closed: 8 },
  { month: "Apr", open: 18, resolved: 22, closed: 6 },
  { month: "May", open: 13, resolved: 20, closed: 4 },
  { month: "Jun", open: 16, resolved: 28, closed: 7 },
];

const chartConfig = {
  open: { label: "Open Cases", color: "hsl(var(--chart-1))" },
  resolved: { label: "Resolved Cases", color: "hsl(var(--chart-2))" },
  closed: { label: "Closed Cases", color: "hsl(var(--chart-3))" },
};


export default function WelfareReportsPage() {
  return (
    <RoleSpecificContent allowedRoles={['WELFARE_OFFICER', 'SUPER_ADMIN']}>
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard/welfare-officer" passHref>
                <Button variant="outline" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
            </Link>
            <h1 className="text-2xl font-semibold">Welfare Reports</h1>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-3">
              <BarChartHorizontalBig className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-xl">Monthly Case Summary</CardTitle>
                <CardDescription>Overview of welfare case statuses per month.</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Report Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="monthly_summary">Monthly Summary</SelectItem>
                        <SelectItem value="type_breakdown">Case Type Breakdown</SelectItem>
                        <SelectItem value="financial_impact">Financial Impact</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline">
                    <CalendarDays className="mr-2 h-4 w-4" /> Date Range
                </Button>
                 <Button>
                    <Download className="mr-2 h-4 w-4" /> Export Report
                </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={welfareReportData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="open" fill="var(--color-open)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="resolved" fill="var(--color-resolved)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="closed" fill="var(--color-closed)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Total Active Cases</CardTitle>
                    <CardDescription>Currently open or in progress.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold text-primary">25</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Average Resolution Time</CardTitle>
                    <CardDescription>Average time to resolve a case.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold text-accent">12 Days</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Total Members Assisted</CardTitle>
                    <CardDescription>Unique members receiving welfare.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">150</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </RoleSpecificContent>
  );
}
