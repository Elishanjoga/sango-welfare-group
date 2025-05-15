"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RoleSpecificContent from "@/components/dashboard/RoleSpecificContent";
import { ArrowLeft, Users, UserPlus, UserMinus, ListFilter, Download } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import AdminSummaryCard from "@/components/dashboard/admin/AdminSummaryCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const memberGrowthData = [
  { month: "Jan", total: 1100, new: 30, churned: 5 },
  { month: "Feb", total: 1125, new: 25, churned: 0 },
  { month: "Mar", total: 1160, new: 40, churned: 5 },
  { month: "Apr", total: 1175, new: 20, churned: 5 },
  { month: "May", total: 1205, new: 35, churned: 5 },
  { month: "Jun", total: 1250, new: 50, churned: 5 },
];

const recentMembers = [
    { id: "MEM1250", name: "Eva Green", joinDate: "2024-06-28", status: "Active" },
    { id: "MEM1249", name: "Frank Ocean", joinDate: "2024-06-25", status: "Active" },
    { id: "MEM1248", name: "Grace Hopper", joinDate: "2024-06-22", status: "Active" },
    { id: "MEM1247", name: "Henry Ford", joinDate: "2024-06-20", status: "Pending Verification" },
    { id: "MEM1246", name: "Ivy Smith", joinDate: "2024-06-18", status: "Active" },
];

export default function MemberActivityPage() {
  return (
    <RoleSpecificContent allowedRoles={['SUPER_ADMIN']}>
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard/admin" passHref>
                <Button variant="outline" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
            </Link>
            <h1 className="text-2xl font-semibold">Member Activity & Engagement</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AdminSummaryCard title="Total Members" value="1,250" icon={Users} iconClassName="text-primary"/>
            <AdminSummaryCard title="New This Month" value="50" icon={UserPlus} iconClassName="text-green-500"/>
            <AdminSummaryCard title="Churn This Month" value="5" icon={UserMinus} iconClassName="text-red-500"/>
        </div>

        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Member Growth Over Time</CardTitle>
                <CardDescription>Monthly trend of total members, new sign-ups, and churn.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={memberGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="total" stroke="hsl(var(--primary))" name="Total Members" />
                        <Line yAxisId="right" type="monotone" dataKey="new" stroke="hsl(var(--chart-2))" name="New Sign-ups" />
                        <Line yAxisId="right" type="monotone" dataKey="churned" stroke="hsl(var(--chart-5))" name="Churned" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Recently Joined Members</CardTitle>
                    <CardDescription>New members in the last 30 days.</CardDescription>
                </div>
                <div className="flex gap-2">
                    <Input placeholder="Search members..." className="max-w-xs" />
                    <Button variant="outline"><ListFilter className="mr-2 h-4 w-4" /> Filter</Button>
                    <Button><Download className="mr-2 h-4 w-4" /> Export List</Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Member ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Join Date</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentMembers.map(member => (
                            <TableRow key={member.id}>
                                <TableCell className="font-medium">{member.id}</TableCell>
                                <TableCell>{member.name}</TableCell>
                                <TableCell>{member.joinDate}</TableCell>
                                <TableCell><Badge variant={member.status === "Active" ? "default" : "secondary"}>{member.status}</Badge></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

      </div>
    </RoleSpecificContent>
  );
}
