import type { Metadata } from "next";
import Sidebar from "@/components/dashboard/sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | QCSD",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {

  const session = await auth();

  if(!session) redirect('/login');

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