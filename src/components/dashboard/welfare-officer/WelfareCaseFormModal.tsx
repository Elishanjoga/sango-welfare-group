"use client";

import React, { useState, useEffect } from 'react';
import type { WelfareCase } from '@/types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

interface WelfareCaseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (caseData: WelfareCase) => void;
  initialData?: WelfareCase | null;
}

const defaultFormState: Omit<WelfareCase, 'id' | 'dateLogged'> = {
  memberId: '',
  memberName: '',
  issueType: '',
  description: '',
  status: 'Open',
};

export default function WelfareCaseFormModal({ isOpen, onClose, onSave, initialData }: WelfareCaseFormModalProps) {
  const [formData, setFormData] = useState<Omit<WelfareCase, 'id' | 'dateLogged'>>(defaultFormState);
  const { toast } = useToast();

  useEffect(() => {
    if (initialData) {
      setFormData({
        memberId: initialData.memberId,
        memberName: initialData.memberName,
        issueType: initialData.issueType,
        description: initialData.description,
        status: initialData.status,
      });
    } else {
      setFormData(defaultFormState);
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value as WelfareCase['status'] | string }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.memberId || !formData.issueType || !formData.description) {
      toast({ title: "Missing Fields", description: "Please fill in Member ID, Issue Type, and Description.", variant: "destructive" });
      return;
    }
    const caseToSave: WelfareCase = {
      ...formData,
      id: initialData?.id || '', // ID will be set by parent if new
      dateLogged: initialData?.dateLogged || new Date().toISOString().split('T')[0], // Date will be set by parent if new
    };
    onSave(caseToSave);
    toast({ title: `Case ${initialData ? 'Updated' : 'Created'}`, description: `Welfare case for ${formData.memberName || formData.memberId} has been saved.`});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Welfare Case' : 'Log New Welfare Case'}</DialogTitle>
          <DialogDescription>
            {initialData ? 'Update the details of the existing welfare case.' : 'Fill in the details to log a new welfare case.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="memberId" className="text-right">Member ID*</Label>
              <Input id="memberId" name="memberId" value={formData.memberId} onChange={handleChange} className="col-span-3" placeholder="e.g., MEM001" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="memberName" className="text-right">Member Name</Label>
              <Input id="memberName" name="memberName" value={formData.memberName} onChange={handleChange} className="col-span-3" placeholder="Enter member's name" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="issueType" className="text-right">Issue Type*</Label>
              <Select name="issueType" onValueChange={(value) => handleSelectChange('issueType', value)} value={formData.issueType}>
                <SelectTrigger id="issueType" className="col-span-3">
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Medical Emergency">Medical Emergency</SelectItem>
                  <SelectItem value="Bereavement Support">Bereavement Support</SelectItem>
                  <SelectItem value="Education Assistance">Education Assistance</SelectItem>
                  <SelectItem value="General Hardship">General Hardship</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description*</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} className="col-span-3" placeholder="Detailed description of the issue" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Status*</Label>
              <Select name="status" onValueChange={(value) => handleSelectChange('status', value)} value={formData.status}>
                <SelectTrigger id="status" className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">{initialData ? 'Save Changes' : 'Log Case'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
