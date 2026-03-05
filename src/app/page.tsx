
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center font-black uppercase text-xs tracking-widest animate-pulse">
      Yuklanmoqda...
    </div>
  );
}
