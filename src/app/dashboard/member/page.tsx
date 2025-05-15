"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, HeartHandshake, UserCircle, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import RoleSpecificContent from "@/components/dashboard/RoleSpecificContent";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SaccoMemberPage() {
  const { user } = useAuth();

  return (
    <RoleSpecificContent allowedRoles={['SACCO_MEMBER']}>
      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <UserCircle className="h-10 w-10 text-primary" />
              <div>
                <CardTitle className="text-2xl">Welcome, {user?.name || 'Member'}!</CardTitle>
                <CardDescription>This is your Sacco Member Portal.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>Here you can manage your account, view loan statements, and access welfare services.</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-md hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">My Loans</CardTitle>
              <DollarSign className="h-6 w-6 text-accent" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View your active loans, application status, and payment schedules.
              </p>
               <Link href="/dashboard/member/loans" passHref>
                <Button variant="outline" className="mt-4 w-full">View Loans</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Welfare Services</CardTitle>
              <HeartHandshake className="h-6 w-6 text-accent" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access welfare benefits, track your contributions, and submit claims.
              </p>
              <Link href="/dashboard/member/welfare" passHref>
                <Button variant="outline" className="mt-4 w-full">Welfare Details</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Account Security</CardTitle>
              <ShieldCheck className="h-6 w-6 text-accent" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage your profile, update contact information, and change your password.
              </p>
               <Button variant="outline" className="mt-4 w-full" disabled>Manage Account</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </RoleSpecificContent>
  );
}
