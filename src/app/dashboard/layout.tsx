import ProtectedRoute from "@/components/protected-route";
import Layout from "@/layouts/layout";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["admin", "teacher", "student"]}>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
}
