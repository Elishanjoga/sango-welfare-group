"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoanApplicationTable from "@/components/dashboard/loan-officer/LoanApplicationTable";
import { Briefcase, FilePlus2, ListFilter, Search, BarChartHorizontalBig } from "lucide-react";
import RoleSpecificContent from "@/components/dashboard/RoleSpecificContent";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoanOfficerPage() {
  return (
    <RoleSpecificContent allowedRoles={['LOAN_OFFICER']}>
      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
             <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Briefcase className="h-10 w-10 text-primary" />
                <div>
                  <CardTitle className="text-2xl">Loan Disbursement Module</CardTitle>
                  <CardDescription>Manage and disburse loans efficiently.</CardDescription>
                </div>
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Pending Review</CardTitle>
              <CardDescription>Applications awaiting your approval.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent">5</p> {/* Placeholder */}
              <p className="text-xs text-muted-foreground">Total Value: KES 350,000</p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Approved Loans</CardTitle>
              <CardDescription>Loans approved and pending disbursement.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">12</p> {/* Placeholder */}
              <p className="text-xs text-muted-foreground">Total Value: KES 1,250,000</p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Recently Disbursed</CardTitle>
              <CardDescription>Loans disbursed in the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">8</p> {/* Placeholder */}
              <p className="text-xs text-muted-foreground">Total Value: KES 980,000</p>
            </CardContent>
          </Card>
        </div>

      </div>
    </RoleSpecificContent>
  );
}
