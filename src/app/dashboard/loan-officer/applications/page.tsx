"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoanApplicationTable from "@/components/dashboard/loan-officer/LoanApplicationTable";
import { Users, FilePlus2, ListFilter, Search, BarChartHorizontalBig, ArrowLeft } from "lucide-react";
import RoleSpecificContent from "@/components/dashboard/RoleSpecificContent";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoanApplicationsPage() {
  return (
    <RoleSpecificContent allowedRoles={['LOAN_OFFICER']}>
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard/loan-officer" passHref>
                <Button variant="outline" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
            </Link>
            <h1 className="text-2xl font-semibold">All Loan Applications</h1>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
             <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Application Management</CardTitle>
                <CardDescription>Review, approve, or reject loan applications.</CardDescription>
              </div>
              <Link href="/dashboard/loan-officer/applications/new" passHref>
                <Button>
                  <FilePlus2 className="mr-2 h-4 w-4" /> New Application
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-2 mb-4">
                <div className="relative flex-1 md:grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search applications..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                  />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><ListFilter className="mr-2 h-4 w-4" /> Filter</Button>
                    <Button variant="outline"><BarChartHorizontalBig className="mr-2 h-4 w-4" /> Reports</Button>
                </div>
            </div>
            <LoanApplicationTable />
          </CardContent>
        </Card>
      </div>
    </RoleSpecificContent>
  );
}
