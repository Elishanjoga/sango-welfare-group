export type UserRole = 
  | 'SACCO_MEMBER' 
  | 'LOAN_OFFICER' 
  | 'WELFARE_OFFICER' 
  | 'SUPER_ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoanApplication {
  id: string;
  applicantName: string;
  applicantId: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Disbursed';
  applicationDate: string;
}

export interface WelfareCase {
  id: string;
  memberId: string;
  memberName: string;
  issueType: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  dateLogged: string;
}
