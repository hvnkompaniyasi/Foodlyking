'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { Navbar } from '@/components/navbar';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.push('/');
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle();

        if (error || !profile || profile.role !== 'king') {
          console.error('Auth guard rejection:', error || 'Profile not found or not king');
          await supabase.auth.signOut();
          router.push('/');
          return;
        }

        setLoading(false);
      } catch (err) {
        console.error('Auth guard system error:', err);
        router.push('/');
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA]">
        <div className="p-10 flat-card bg-white flex flex-col items-center gap-6 animate-pulse">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          <p className="font-black uppercase tracking-widest text-xs">Xavfsizlik tekshirilmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <aside className="hidden lg:block w-72 sticky top-20 h-[calc(100vh-5rem)] border-r-4 border-black bg-white overflow-y-auto overflow-x-hidden">
          <DashboardSidebar />
        </aside>

        <main className="flex-1 min-h-screen bg-[#F8F9FA]">
          <div className="p-4 md:p-10 max-w-7xl mx-auto animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
