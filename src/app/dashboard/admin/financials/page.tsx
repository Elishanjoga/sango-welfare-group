"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RoleSpecificContent from "@/components/dashboard/RoleSpecificContent";
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, Download, Filter, Percent } from "lucide-react";
import Link from "next/link";
import AdminSummaryCard from "@/components/dashboard/admin/AdminSummaryCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const financialOverviewData = [
  { month: "Jan", revenue: 1200000, expenses: 800000, profit: 400000 },
  { month: "Feb", revenue: 1350000, expenses: 850000, profit: 500000 },
  { month: "Mar", revenue: 1500000, expenses: 900000, profit: 600000 },
  { month: "Apr", revenue: 1400000, expenses: 920000, profit: 480000 },
  { month: "May", revenue: 1600000, expenses: 950000, profit: 650000 },
  { month: "Jun", revenue: 1750000, expenses: 1000000, profit: 750000 },
];

const assetDistributionData = [
  { name: "Loans Receivable", value: 15200000 },
  { name: "Cash & Equivalents", value: 5500000 },
  { name: "Investments", value: 8000000 },
  { name: "Fixed Assets", value: 2300000 },
];
const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export default function FinancialsPage() {
  return (
    <RoleSpecificContent allowedRoles={['SUPER_ADMIN']}>
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard/admin" passHref>
                <Button variant="outline" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
            </Link>
            <h1 className="text-2xl font-semibold">Financial Overview</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AdminSummaryCard title="Total Assets" value="KES 31M" icon={DollarSign} description="+ KES 1.5M this month" iconClassName="text-primary"/>
            <AdminSummaryCard title="Total Liabilities" value="KES 5.2M" icon={DollarSign} description="Mainly member deposits" iconClassName="text-orange-500"/>
            <AdminSummaryCard title="Net Worth" value="KES 25.8M" icon={TrendingUp} description="Growth of 8% YTD" iconClassName="text-green-500"/>
            <AdminSummaryCard title="Profit (YTD)" value="KES 3.2M" icon={Percent} description="Exceeding target by 15%" iconClassName="text-accent"/>
        </div>

        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Monthly Financial Performance</CardTitle>
                <CardDescription>Revenue, Expenses, and Profit trends.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={financialOverviewData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => `KES ${value.toLocaleString()}`} />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" name="Revenue" />
                        <Line type="monotone" dataKey="expenses" stroke="hsl(var(--chart-5))" name="Expenses" />
                        <Line type="monotone" dataKey="profit" stroke="hsl(var(--chart-2))" name="Profit" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Asset Distribution</CardTitle>
                    <CardDescription>Breakdown of Sacco's assets.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={assetDistributionData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {assetDistributionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => `KES ${value.toLocaleString()}`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Key Financial Ratios</CardTitle>
                    <CardDescription>Important indicators of financial health.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex justify-between"><span>Return on Assets (ROA):</span> <span className="font-semibold text-green-600">10.3%</span></div>
                    <div className="flex justify-between"><span>Return on Equity (ROE):</span> <span className="font-semibold text-green-600">12.4%</span></div>
                    <div className="flex justify-between"><span>Debt-to-Equity Ratio:</span> <span className="font-semibold">0.20</span></div>
                    <div className="flex justify-between"><span>Liquidity Ratio:</span> <span className="font-semibold text-primary">1.8</span></div>
                     <div className="pt-2 flex justify-end">
                        <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Full Financial Report</Button>
                    </div>
                </CardContent>
            </Card>
        </div>

      </div>
    </RoleSpecificContent>
  );
}
