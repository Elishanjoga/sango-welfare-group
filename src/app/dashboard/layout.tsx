"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"; // Assuming this path is correct based on project structure
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // For mobile menu
import AppLogo from '@/components/layout/AppLogo';
import {
  Home,
  Users,
  Briefcase,
  ShieldAlert,
  UserCog,
  LogOut,
  Settings,
  Bell,
  Menu,
  DollarSign,
  BarChart2,
  HelpCircle,
  MessageSquare,
  Loader2,
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { href: '/dashboard/member', label: 'My Dashboard', icon: Home, roles: ['SACCO_MEMBER'] },
  { href: '/dashboard/member/loans', label: 'My Loans', icon: DollarSign, roles: ['SACCO_MEMBER'] },
  { href: '/dashboard/member/welfare', label: 'My Welfare', icon: HelpCircle, roles: ['SACCO_MEMBER'] },
  
  { href: '/dashboard/loan-officer', label: 'Loan Management', icon: Briefcase, roles: ['LOAN_OFFICER'] },
  { href: '/dashboard/loan-officer/applications', label: 'Applications', icon: Users, roles: ['LOAN_OFFICER'] },
  
  { href: '/dashboard/welfare-officer', label: 'Welfare Cases', icon: ShieldAlert, roles: ['WELFARE_OFFICER'] },
  { href: '/dashboard/welfare-officer/reports', label: 'Welfare Reports', icon: BarChart2, roles: ['WELFARE_OFFICER'] },

  { href: '/dashboard/admin', label: 'Admin Overview', icon: UserCog, roles: ['SUPER_ADMIN'] },
  { href: '/dashboard/admin/member-activity', label: 'Member Activity', icon: Users, roles: ['SUPER_ADMIN'] },
  { href: '/dashboard/admin/financials', label: 'Financials', icon: DollarSign, roles: ['SUPER_ADMIN'] },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : 'U';
  const availableNavItems = navItems.filter(item => item.roles.includes(user.role));

  const renderNavLinks = (isMobile = false) => (
    <SidebarMenu>
      {availableNavItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
              tooltip={item.label}
              className="w-full justify-start"
            >
              <a>
                <item.icon className="h-5 w-5" />
                <span className={isMobile ? "" : "group-data-[collapsible=icon]:hidden"}>{item.label}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="icon" className="border-r" variant="sidebar">
          <SidebarHeader className="flex items-center gap-2 p-4 border-b border-sidebar-border">
            <AppLogo className="text-primary h-8 w-8" />
            <span className="text-xl font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
              SaccoCentral
            </span>
          </SidebarHeader>
          <SidebarContent className="p-2">
            {renderNavLinks()}
          </SidebarContent>
          <SidebarFooter className="p-2 border-t border-sidebar-border">
            <SidebarMenu>
              <SidebarMenuItem>
                 <SidebarMenuButton
                  onClick={logout}
                  tooltip="Logout"
                  className="w-full justify-start"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
            <div className="flex items-center gap-4">
               <SidebarTrigger className="md:hidden" /> {/* Only show trigger on small screens */}
               <span className="text-lg font-semibold text-foreground hidden md:block">
                 {availableNavItems.find(item => pathname === item.href || pathname.startsWith(item.href))?.label || 'Dashboard'}
               </span>
            </div>
            
            {/* Mobile Menu Trigger using Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col p-0 bg-sidebar text-sidebar-foreground">
                <SidebarHeader className="flex items-center gap-2 p-4 border-b border-sidebar-border">
                  <AppLogo className="text-primary h-8 w-8" />
                  <span className="text-xl font-semibold">SaccoCentral</span>
                </SidebarHeader>
                <SidebarContent className="p-2 flex-grow">
                  {renderNavLinks(true)}
                </SidebarContent>
                <SidebarFooter className="p-2 border-t border-sidebar-border">
                   <SidebarMenuButton
                      onClick={logout}
                      className="w-full justify-start"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </SidebarMenuButton>
                </SidebarFooter>
              </SheetContent>
            </Sheet>


            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="sr-only">Notifications</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`https://placehold.co/100x100.png?text=${userInitial}`} alt={user.name || "User"} data-ai-hint="person initial" />
                      <AvatarFallback>{userInitial}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto bg-secondary/50 p-4 md:p-6 lg:p-8">
            <SidebarInset> {/* This helps to manage content area with sidebar variants */}
              {children}
            </SidebarInset>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
