"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, FilePlus2, UserSearch, DollarSign, CalendarDays, Info } from 'lucide-react';
import Link from 'next/link';
import RoleSpecificContent from '@/components/dashboard/RoleSpecificContent';
import { useToast } from '@/hooks/use-toast';

export default function NewLoanApplicationPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    memberId: '',
    memberName: '',
    loanType: '',
    amount: '',
    repaymentPeriod: '',
    purpose: '',
    guarantor1Id: '',
    guarantor2Id: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.memberId || !formData.loanType || !formData.amount) {
        toast({ title: "Missing Fields", description: "Please fill in all required fields.", variant: "destructive" });
        return;
    }
    console.log("New Loan Application Data:", formData);
    toast({ title: "Application Submitted", description: `Loan application for ${formData.memberName || formData.memberId} created.` });
    // Reset form or redirect
    setFormData({
        memberId: '', memberName: '', loanType: '', amount: '', repaymentPeriod: '', purpose: '', guarantor1Id: '', guarantor2Id: '',
    });
  };
  
  return (
    <RoleSpecificContent allowedRoles={['LOAN_OFFICER']}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/loan-officer/applications" passHref>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">New Loan Application</h1>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <FilePlus2 className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-xl">Application Details</CardTitle>
                <CardDescription>Enter the details for the new loan application.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="memberId"><UserSearch className="inline mr-2 h-4 w-4 text-muted-foreground" />Member ID*</Label>
                  <Input id="memberId" name="memberId" value={formData.memberId} onChange={handleChange} placeholder="e.g., MEM001" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memberName">Member Name</Label>
                  <Input id="memberName" name="memberName" value={formData.memberName} onChange={handleChange} placeholder="Auto-filled or enter manually" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="loanType"><Info className="inline mr-2 h-4 w-4 text-muted-foreground" />Loan Type*</Label>
                  <Select name="loanType" onValueChange={(value) => handleSelectChange('loanType', value)} value={formData.loanType}>
                    <SelectTrigger id="loanType">
                      <SelectValue placeholder="Select loan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal Loan</SelectItem>
                      <SelectItem value="education">Education Loan</SelectItem>
                      <SelectItem value="emergency">Emergency Loan</SelectItem>
                      <SelectItem value="development">Development Loan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount"><DollarSign className="inline mr-2 h-4 w-4 text-muted-foreground" />Loan Amount (KES)*</Label>
                  <Input id="amount" name="amount" type="number" value={formData.amount} onChange={handleChange} placeholder="e.g., 50000" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="repaymentPeriod"><CalendarDays className="inline mr-2 h-4 w-4 text-muted-foreground" />Repayment Period (Months)</Label>
                <Input id="repaymentPeriod" name="repaymentPeriod" type="number" value={formData.repaymentPeriod} onChange={handleChange} placeholder="e.g., 12" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose of Loan</Label>
                <Textarea id="purpose" name="purpose" value={formData.purpose} onChange={handleChange} placeholder="Briefly describe the purpose of the loan" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="guarantor1Id">Guarantor 1 ID</Label>
                  <Input id="guarantor1Id" name="guarantor1Id" value={formData.guarantor1Id} onChange={handleChange} placeholder="e.g., MEM002" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guarantor2Id">Guarantor 2 ID</Label>
                  <Input id="guarantor2Id" name="guarantor2Id" value={formData.guarantor2Id} onChange={handleChange} placeholder="e.g., MEM003" />
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button type="submit" className="min-w-[150px]">
                  Submit Application
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </RoleSpecificContent>
  );
}
