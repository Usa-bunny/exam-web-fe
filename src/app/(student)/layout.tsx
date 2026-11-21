import ProtectedRoute from "@/components/protected-route";
import Layout from "@/layouts/layout";
import { ReactNode } from "react";

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
}
