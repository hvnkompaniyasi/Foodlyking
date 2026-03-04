import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Foodly King - Eng Mazali Taomlar Yetkazib Berish',
  description: 'Foodly King orqali shaharning eng yaxshi restoranlaridan 30 daqiqada taom buyurtma qiling. Sifatli va tezkor xizmat.',
  keywords: 'food delivery, taom yetkazish, restoranlar, burger, pizza, sushi, oziq-ovqat',
  openGraph: {
    title: 'Foodly King - Gourmet Food Delivery',
    description: 'Eng yaxshi restoranlar bitta platformada!',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}