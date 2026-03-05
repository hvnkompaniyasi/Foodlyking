
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Ildiz sahifaga kirganda darhol login sahifasiga yo'naltiramiz
    router.replace('/login');
  }, [router]);

  return null;
}
