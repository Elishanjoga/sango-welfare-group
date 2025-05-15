"use client";

import React, { useState } from 'react';
import type { WelfareCase } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit3, Trash2, Eye, CheckSquare, ExternalLink, XCircle } from 'lucide-react';
import WelfareCaseFormModal from './WelfareCaseFormModal';


const initialCases: WelfareCase[] = [
  { id: 'WFC001', memberId: 'MEM001', memberName: 'Alice Wonderland', issueType: 'Medical Emergency', description: 'Urgent surgery required.', status: 'Open', dateLogged: '2024-07-10' },
  { id: 'WFC002', memberId: 'MEM002', memberName: 'Bob The Builder', issueType: 'Bereavement Support', description: 'Loss of a close family member.', status: 'In Progress', dateLogged: '2024-06-20' },
  { id: 'WFC003', memberId: 'MEM003', memberName: 'Charlie Brown', issueType: 'Education Assistance', description: 'School fees support for child.', status: 'Resolved', dateLogged: '2024-05-15' },
  { id: 'WFC004', memberId: 'MEM004', memberName: 'Diana Prince', issueType: 'General Hardship', description: 'Temporary financial difficulty.', status: 'Closed', dateLogged: '2024-04-01' },
];

export default function WelfareCaseTable() {
  const [cases, setCases] = useState<WelfareCase[]>(initialCases);
  const [selectedCase, setSelectedCase] = useState<WelfareCase | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const handleSaveCase = (caseData: WelfareCase) => {
    if (selectedCase) { // Editing existing case
      setCases(prev => prev.map(c => c.id === caseData.id ? caseData : c));
    } else { // Adding new case
      setCases(prev => [...prev, { ...caseData, id: `WFC${String(prev.length + 1).padStart(3, '0')}`, dateLogged: new Date().toISOString().split('T')[0] }]);
    }
    setSelectedCase(null);
  };

  const openEditModal = (welfareCase: WelfareCase) => {
    setSelectedCase(welfareCase);
    setIsFormModalOpen(true);
  };
  
  const openNewModal = () => {
    setSelectedCase(null); // Ensure it's a new case
    setIsFormModalOpen(true);
  };

  const handleDeleteCase = (caseId: string) => {
    if (window.confirm("Are you sure you want to delete this case?")) {
      setCases(prev => prev.filter(c => c.id !== caseId));
    }
  };
  
  const handleStatusUpdate = (caseId: string, newStatus: WelfareCase['status']) => {
     setCases(prev => prev.map(c => c.id === caseId ? {...c, status: newStatus} : c));
  };

  const getStatusVariant = (status: WelfareCase['status']) => {
    switch (status) {
      case 'Open': return 'secondary';
      case 'In Progress': return 'default';
      case 'Resolved': return 'outline'; 
      case 'Closed': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={openNewModal}>
          <ExternalLink className="mr-2 h-4 w-4" /> Log New Case
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Case ID</TableHead>
            <TableHead>Member Name</TableHead>
            <TableHead>Issue Type</TableHead>
            <TableHead>Date Logged</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.memberName} ({item.memberId})</TableCell>
              <TableCell>{item.issueType}</TableCell>
              <TableCell>{item.dateLogged}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge>
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
                    <DropdownMenuItem onClick={() => alert(`Viewing details for ${item.id}`)}>
                      <Eye className="mr-2 h-4 w-4" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openEditModal(item)}>
                      <Edit3 className="mr-2 h-4 w-4" /> Edit Case
                    </DropdownMenuItem>
                     {item.status !== 'Resolved' && item.status !== 'Closed' && (
                       <DropdownMenuItem onClick={() => handleStatusUpdate(item.id, 'Resolved')}>
                         <CheckSquare className="mr-2 h-4 w-4 text-green-500" /> Mark as Resolved
                       </DropdownMenuItem>
                     )}
                     {item.status !== 'Closed' && (
                       <DropdownMenuItem onClick={() => handleStatusUpdate(item.id, 'Closed')}>
                         <XCircle className="mr-2 h-4 w-4 text-gray-500" /> Mark as Closed
                       </DropdownMenuItem>
                     )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDeleteCase(item.id)} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete Case
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {cases.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No welfare cases found.</p>
      )}

      <WelfareCaseFormModal
        isOpen={isFormModalOpen}
        onClose={() => { setIsFormModalOpen(false); setSelectedCase(null); }}
        onSave={handleSaveCase}
        initialData={selectedCase}
      />
    </>
  );
}
