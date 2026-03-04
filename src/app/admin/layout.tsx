import { DashboardSidebar } from '@/components/dashboard-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}