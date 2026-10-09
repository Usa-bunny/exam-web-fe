"use client";

import Header from "@/components/header";
import Sidebar, { SidebarInset } from "@/components/sidebar";
import { ReactNode, useState } from "react";

export interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] relative transition-all duration-300">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={closeSidebar}
        />
      )}

      <Sidebar isOpen={isSidebarOpen} />

      <div className="hidden lg:block lg:w-70 lg:ml-6 lg:flex-none" />

      <SidebarInset className="flex flex-col flex-1 min-w-0">
        <main className="flex-1 px-4 lg:px-6 lg:pr-8 py-4 lg:py-6 flex flex-col gap-6">
          <div className="z-30 w-full">
            <Header onMenuClick={toggleSidebar} />
          </div>
          <div className="w-full flex-1">{children}</div>
        </main>
      </SidebarInset>
    </div>
  );
};

export default Layout;