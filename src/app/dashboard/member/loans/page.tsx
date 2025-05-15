"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ListFilter, FileDown } from "lucide-react";
import RoleSpecificContent from "@/components/dashboard/RoleSpecificContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock data for member loans
const memberLoansData = [
  { id: "LN001", type: "Personal Loan", amount: 50000, status: "Active", nextPayment: "2024-08-15", balance: 25000 },
  { id: "LN002", type: "Education Loan", amount: 120000, status: "Pending Approval", nextPayment: "-", balance: 120000 },
  { id: "LN003", type: "Emergency Loan", amount: 20000, status: "Paid Off", nextPayment: "-", balance: 0 },
];

export default function MemberLoansPage() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "Pending Approval": return "secondary";
      case "Paid Off": return "outline";
      default: return "default";
    }
  };

  return (
    <RoleSpecificContent allowedRoles={['SACCO_MEMBER']}>
      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <DollarSign className="h-10 w-10 text-primary" />
              <div>
                <CardTitle className="text-2xl">My Loans</CardTitle>
                <CardDescription>Track your loan applications and active loans.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-2 mb-4">
              <Input placeholder="Search loans..." className="max-w-xs" />
              <div className="flex gap-2">
                <Button variant="outline"><ListFilter className="mr-2 h-4 w-4" /> Filter</Button>
                <Button variant="outline"><FileDown className="mr-2 h-4 w-4" /> Export</Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount (KES)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next Payment</TableHead>
                  <TableHead>Outstanding Balance (KES)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {memberLoansData.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell className="font-medium">{loan.id}</TableCell>
                    <TableCell>{loan.type}</TableCell>
                    <TableCell>{loan.amount.toLocaleString()}</TableCell>
                    <TableCell><Badge variant={getStatusVariant(loan.status) as any}>{loan.status}</Badge></TableCell>
                    <TableCell>{loan.nextPayment}</TableCell>
                    <TableCell>{loan.balance.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
             {memberLoansData.length === 0 && (
              <p className="text-center text-muted-foreground py-8">You have no loans at the moment.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </RoleSpecificContent>
  );
}
