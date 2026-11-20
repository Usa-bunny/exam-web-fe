import ProtectedRoute from "@/components/protected-route";
import Layout from "@/layouts/layout";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
}
