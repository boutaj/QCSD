import type { Metadata } from "next";
import Sidebar from "@/components/dashboard/sidebar";

export const metadata: Metadata = {
  title: "Dashboard | QCSD",
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:flex">
      <Sidebar />
      <div className="flex-1">
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;