import { AdminHeader } from "@/components/admin/admin-header";
import { DashboardClient } from "@/components/admin/dashboard-client";

export default async function AdminPage() {
  return (
    <>
      <AdminHeader title="Dashboard" />
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
        <DashboardClient />
      </main>
    </>
  );
}
