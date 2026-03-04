'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirecting to the admin dashboard as requested
    router.push('/admin/foods');
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-muted-foreground font-medium">Boshqaruv paneliga yo'naltirilmoqda...</p>
    </div>
  );
}