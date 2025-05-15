"use client";

import AdminSummaryCard from "@/components/dashboard/admin/AdminSummaryCard";
import LoanStatusChart from "@/components/dashboard/admin/LoanStatusChart";
import RoleSpecificContent from "@/components/dashboard/RoleSpecificContent";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCog, Users, Briefcase, ShieldAlert, Activity, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const memberActivityData = [
  { name: 'Jan', activeMembers: 400, newSignups: 30 },
  { name: 'Feb', activeMembers: 420, newSignups: 25 },
  { name: 'Mar', activeMembers: 450, newSignups: 40 },
  { name: 'Apr', activeMembers: 430, newSignups: 20 },
  { name: 'May', activeMembers: 460, newSignups: 35 },
  { name: 'Jun', activeMembers: 480, newSignups: 50 },
];

export default function SuperAdminPage() {
  return (
    <RoleSpecificContent allowedRoles={['SUPER_ADMIN']}>
      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <UserCog className="h-10 w-10 text-primary" />
              <div>
                <CardTitle className="text-2xl">Executive Dashboard</CardTitle>
                <CardDescription>Comprehensive overview of Sacco operations.</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <AdminSummaryCard title="Total Members" value="1,250" description="+20 this month" icon={Users} iconClassName="text-primary" />
          <AdminSummaryCard title="Active Loans" value="285" description="KES 15.2M value" icon={Briefcase} iconClassName="text-accent" />
          <AdminSummaryCard title="Open Welfare Cases" value="32" description="5 urgent" icon={ShieldAlert} iconClassName="text-destructive" />
          <AdminSummaryCard title="Total Deposits" value="KES 25.8M" description="+5% from last month" icon={TrendingUp} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <LoanStatusChart />
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Member Activity</CardTitle>
              <CardDescription>Monthly active members and new sign-ups.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={memberActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="activeMembers" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} name="Active Members" />
                  <Line yAxisId="right" type="monotone" dataKey="newSignups" stroke="hsl(var(--accent))" name="New Sign-ups"/>
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        {/* Placeholder for more detailed sections or reports */}
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle>Key Performance Indicators (KPIs)</CardTitle>
                <CardDescription>Track critical metrics for Sacco health and growth.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Loan Default Rate</h3>
                    <p className="text-2xl font-bold">2.5%</p>
                    <p className="text-xs text-green-600 flex items-center"><TrendingDown className="h-4 w-4 mr-1" /> -0.2% from last qtr</p>
                </div>
                 <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Member Satisfaction</h3>
                    <p className="text-2xl font-bold">85%</p>
                    <p className="text-xs text-green-600 flex items-center"><TrendingUp className="h-4 w-4 mr-1" /> +3% from last survey</p>
                </div>
                 <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Operational Efficiency</h3>
                    <p className="text-2xl font-bold">92%</p>
                     <p className="text-xs text-muted-foreground">Cost-to-income ratio</p>
                </div>
            </CardContent>
        </Card>

      </div>
    </RoleSpecificContent>
  );
}
