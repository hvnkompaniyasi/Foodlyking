
'use client';

import { useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { Navbar } from '@/components/navbar';
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
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Top Navbar */}
      <Navbar />
      
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 sticky top-20 h-[calc(100vh-5rem)] border-r-4 border-black bg-white overflow-y-auto">
          <DashboardSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen bg-[#F8F9FA]">
          <div className="p-4 md:p-10 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
