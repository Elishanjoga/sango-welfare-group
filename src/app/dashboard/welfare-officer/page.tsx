"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import WelfareCaseTable from "@/components/dashboard/welfare-officer/WelfareCaseTable";
import { ShieldAlert, Search, ListFilter, FileText, BarChartHorizontalBig } from "lucide-react";
import RoleSpecificContent from "@/components/dashboard/RoleSpecificContent";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WelfareOfficerPage() {
  return (
    <RoleSpecificContent allowedRoles={['WELFARE_OFFICER']}>
      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShieldAlert className="h-10 w-10 text-primary" />
                <div>
                  <CardTitle className="text-2xl">Welfare Management</CardTitle>
                  <CardDescription>Track and manage member welfare issues.</CardDescription>
                </div>
              </div>
               {/* Button for logging new case is inside WelfareCaseTable component */}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-2 mb-4">
                 <div className="relative flex-1 md:grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search cases..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                  />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><ListFilter className="mr-2 h-4 w-4" /> Filter</Button>
                    <Link href="/dashboard/welfare-officer/reports" passHref>
                      <Button variant="outline"><BarChartHorizontalBig className="mr-2 h-4 w-4" /> Reports</Button>
                    </Link>
                </div>
            </div>
            <WelfareCaseTable />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Open Cases</CardTitle>
              <CardDescription>Welfare issues currently needing attention.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent">8</p> {/* Placeholder */}
              <p className="text-xs text-muted-foreground">Total claims value: KES 450,000</p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Resolved This Month</CardTitle>
              <CardDescription>Cases successfully addressed recently.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">15</p> {/* Placeholder */}
              <p className="text-xs text-muted-foreground">Total disbursed: KES 780,000</p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Urgent Alerts</CardTitle>
              <CardDescription>Cases marked as high priority.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-destructive">2</p> {/* Placeholder */}
              <p className="text-xs text-muted-foreground">Require immediate action</p>
            </CardContent>
          </Card>
        </div>

      </div>
    </RoleSpecificContent>
  );
}
