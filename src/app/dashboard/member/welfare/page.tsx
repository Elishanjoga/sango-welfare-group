"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, HeartHandshake, PlusCircle } from "lucide-react";
import RoleSpecificContent from "@/components/dashboard/RoleSpecificContent";
import { Button } from "@/components/ui/button";

// Mock data for member welfare cases
const memberWelfareData = [
  { id: "WF001", type: "Bereavement", submittedDate: "2024-05-10", status: "Approved", amount: 30000 },
  { id: "WF002", type: "Medical Assistance", submittedDate: "2024-06-20", status: "Pending Review", amount: 50000 },
  { id: "WF003", type: "Education Support", submittedDate: "2024-03-01", status: "Disbursed", amount: 75000 },
];

export default function MemberWelfarePage() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Approved": return "default";
      case "Pending Review": return "secondary";
      case "Disbursed": return "outline";
      default: return "default";
    }
  };

  return (
    <RoleSpecificContent allowedRoles={['SACCO_MEMBER']}>
      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <HeartHandshake className="h-10 w-10 text-primary" />
              <div>
                <CardTitle className="text-2xl">My Welfare</CardTitle>
                <CardDescription>View your welfare claims and contributions.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-4">
                <Button><PlusCircle className="mr-2 h-4 w-4" /> New Claim</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Submitted Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount (KES)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {memberWelfareData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.submittedDate}</TableCell>
                    <TableCell><Badge variant={getStatusVariant(item.status) as any}>{item.status}</Badge></TableCell>
                    <TableCell>{item.amount.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {memberWelfareData.length === 0 && (
              <p className="text-center text-muted-foreground py-8">You have no welfare claims at the moment.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </RoleSpecificContent>
  );
}
