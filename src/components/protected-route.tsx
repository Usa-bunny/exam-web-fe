"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.loading) {
      if (!auth?.user) {
        router.replace("/login");
      } else if (
        allowedRoles &&
        auth.user.role &&
        !allowedRoles.includes(auth.user.role)
      ) {
        router.replace("/dashboard");
      }
    }
  }, [auth?.user, auth?.loading, allowedRoles, router]);

  if (auth?.loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <span className="text-sm font-medium text-gray-500">Loading...</span>
      </div>
    );
  }

  if (
    !auth?.user ||
    (allowedRoles && auth?.user.role && !allowedRoles.includes(auth?.user.role))
  ) {
    return null;
  }

  return children;
}
