'use client';

import { useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 fixed inset-y-0 left-0">
        <DashboardSidebar />
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-xl text-white">
            <Menu className="h-5 w-5" />
          </div>
          <span className="font-bold text-primary">FOODLY ADMIN</span>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 border-none">
            <DashboardSidebar onClose={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </header>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
