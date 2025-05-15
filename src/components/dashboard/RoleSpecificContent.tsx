"use client";

import { useAuth } from '@/context/AuthContext';
import React from 'react';

interface RoleSpecificContentProps {
  allowedRoles: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const RoleSpecificContent: React.FC<RoleSpecificContentProps> = ({
  allowedRoles,
  children,
  fallback = <p>You do not have permission to view this content.</p>,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user && allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
};

export default RoleSpecificContent;
