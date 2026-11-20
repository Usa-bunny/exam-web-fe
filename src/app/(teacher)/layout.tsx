import ProtectedRoute from "@/components/protected-route";
import Layout from "@/layouts/layout";
import { ReactNode } from "react";

export default function TeacherLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
}
