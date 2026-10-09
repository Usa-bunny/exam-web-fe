"use client"

import DashboardAdmin from "@/components/dashboard/dashboard-admin";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const auth = useAuth();

  return (
    <div className="flex flex-col gap-8 w-full">
      {auth?.isAdmin && <DashboardAdmin />}
      {/* {auth?.isTeacher && <DashboardTeacher />} */}
      {/* {auth?.isStudent && <DashboardStudent />} */}
    </div>
  );
}
