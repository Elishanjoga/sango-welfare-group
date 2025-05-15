"use client";

import React, { useState } from 'react';
import type { LoanApplication } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { MoreHorizontal, CheckCircle2, XCircle, Edit3, Eye, DollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const initialApplications: LoanApplication[] = [
  { id: 'APP001', applicantName: 'Alice Wonderland', applicantId: 'MEM001', amount: 50000, status: 'Pending', applicationDate: '2024-07-01' },
  { id: 'APP002', applicantName: 'Bob The Builder', applicantId: 'MEM002', amount: 120000, status: 'Approved', applicationDate: '2024-06-15' },
  { id: 'APP003', applicantName: 'Charlie Brown', applicantId: 'MEM003', amount: 75000, status: 'Rejected', applicationDate: '2024-07-05' },
  { id: 'APP004', applicantName: 'Diana Prince', applicantId: 'MEM004', amount: 200000, status: 'Disbursed', applicationDate: '2024-05-20' },
];

export default function LoanApplicationTable() {
  const [applications, setApplications] = useState<LoanApplication[]>(initialApplications);
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewAction, setReviewAction] = useState<'Approve' | 'Reject' | null>(null);
  const [reviewComments, setReviewComments] = useState('');


  const handleAction = (appId: string, newStatus: LoanApplication['status']) => {
    setApplications(prev => prev.map(app => app.id === appId ? { ...app, status: newStatus } : app));
    if(selectedApplication && selectedApplication.id === appId) {
        setSelectedApplication({...selectedApplication, status: newStatus});
    }
    setIsReviewDialogOpen(false);
    setReviewComments('');
  };

  const openReviewDialog = (application: LoanApplication, action: 'Approve' | 'Reject') => {
    setSelectedApplication(application);
    setReviewAction(action);
    setIsReviewDialogOpen(true);
  };

  const getStatusVariant = (status: LoanApplication['status']) => {
    switch (status) {
      case 'Pending': return 'secondary';
      case 'Approved': return 'default'; // default is primary in theme
      case 'Rejected': return 'destructive';
      case 'Disbursed': return 'outline'; // choose a success-like variant if available or customize
      default: return 'default';
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>App ID</TableHead>
            <TableHead>Applicant Name</TableHead>
            <TableHead>Amount (KES)</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell className="font-medium">{app.id}</TableCell>
              <TableCell>{app.applicantName}</TableCell>
              <TableCell>{app.amount.toLocaleString()}</TableCell>
              <TableCell>{app.applicationDate}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(app.status)}>{app.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => alert(`Viewing details for ${app.id}`)}>
                      <Eye className="mr-2 h-4 w-4" /> View Details
                    </DropdownMenuItem>
                    {app.status === 'Pending' && (
                      <>
                        <DropdownMenuItem onClick={() => openReviewDialog(app, 'Approve')}>
                          <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" /> Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openReviewDialog(app, 'Reject')}>
                          <XCircle className="mr-2 h-4 w-4 text-red-500" /> Reject
                        </DropdownMenuItem>
                      </>
                    )}
                    {app.status === 'Approved' && (
                       <DropdownMenuItem onClick={() => handleAction(app.id, 'Disbursed')}>
                         <DollarSign className="mr-2 h-4 w-4 text-blue-500" /> Mark as Disbursed
                       </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => alert(`Editing ${app.id}`)} disabled={app.status === 'Disbursed' || app.status === 'Rejected'}>
                      <Edit3 className="mr-2 h-4 w-4" /> Edit Application
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {applications.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No loan applications found.</p>
      )}

      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{reviewAction} Loan Application</DialogTitle>
            <DialogDescription>
              Application ID: {selectedApplication?.id} <br/>
              Applicant: {selectedApplication?.applicantName} <br/>
              Amount: KES {selectedApplication?.amount.toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="comments" className="text-right col-span-1">
                Comments
              </Label>
              <Textarea 
                id="comments" 
                value={reviewComments}
                onChange={(e) => setReviewComments(e.target.value)}
                className="col-span-3" 
                placeholder="Add optional comments..." 
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={() => selectedApplication && handleAction(selectedApplication.id, reviewAction === 'Approve' ? 'Approved' : 'Rejected')}
              variant={reviewAction === 'Approve' ? 'default' : 'destructive'}
            >
              {reviewAction} Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
