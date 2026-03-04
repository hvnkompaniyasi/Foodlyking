'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Search, MapPin, ArrowRight, Star, Clock } from 'lucide-react';
import { RESTAURANTS } from '@/lib/mock-data';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-[#FDF7F2] py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8 z-10 text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight text-foreground">
              Sevimli taomingizni <span className="text-primary">tezroq</span> yetkazamiz!
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Foodly King bilan eng yaxshi restoranlardan mazali taomlarni 30 daqiqada buyurtma qiling.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="relative w-full">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                <input 
                  type="text" 
                  placeholder="Manzilni kiriting..." 
                  className="w-full h-16 pl-12 pr-4 rounded-2xl border-none shadow-xl focus:ring-2 focus:ring-primary text-lg"
                />
              </div>
              <Button size="lg" className="h-16 px-8 rounded-2xl bg-secondary hover:bg-secondary/90 text-xl font-bold flat-button shadow-lg">
                Topish
              </Button>
            </div>
          </div>
          
          <div className="flex-1 relative w-full aspect-square max-w-xl">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
            <Image 
              src="https://picsum.photos/seed/hero/800/800" 
              alt="Foodly Hero" 
              width={800} 
              height={800} 
              className="relative z-10 object-contain"
              priority
              data-ai-hint="gourmet burger"
            />
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black">Mashhur restoranlar</h2>
            <p className="text-muted-foreground mt-2">Sizga eng yaqin bo'lgan sifatli maskanlar</p>
          </div>
          <Link href="/restaurants">
            <Button variant="ghost" className="text-primary font-bold group">
              Barchasini ko'rish <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESTAURANTS.map((restaurant) => (
            <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`} className="group">
              <div className="bg-white rounded-[2rem] overflow-hidden border border-border/50 hover:border-primary/50 transition-all hover:shadow-2xl hover:-translate-y-1">
                <div className="relative h-56 w-full">
                  <Image 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    fill 
                    className="object-cover transition-transform group-hover:scale-105 duration-500"
                    data-ai-hint="restaurant food"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-bold">{restaurant.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black mb-2">{restaurant.name}</h3>
                  <div className="flex items-center gap-4 text-muted-foreground text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-secondary" />
                      {restaurant.deliveryTime}
                    </span>
                    <span className="h-1 w-1 bg-muted-foreground rounded-full"></span>
                    <span>{restaurant.cuisine}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-foreground py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-16">Nega Foodly King?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Tezkor yetkazish", desc: "Shaharning istalgan nuqtasiga 30-45 daqiqada.", icon: "🚀" },
              { title: "Sifatli taomlar", desc: "Faqat eng sara restoranlar bilan hamkorlik.", icon: "👑" },
              { title: "Hamyonbop", desc: "Hali hech qachon yetkazib berish bunchalik arzon bo'lmagan.", icon: "💰" }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-white/60 text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-2xl font-black tracking-tight text-primary">FOODLY KING</span>
          </div>
          <p className="text-muted-foreground">© 2024 Foodly King. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
}