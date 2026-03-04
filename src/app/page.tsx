'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Search, MapPin, ArrowRight, Star, Clock, Heart } from 'lucide-react';
import { RESTAURANTS } from '@/lib/mock-data';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* SEO Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden border-b-4 border-black">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 z-10 text-center lg:text-left">
            <div className="inline-block bg-secondary text-white border-2 border-black px-6 py-2 rounded-full font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              #1 TAOM YETKAZIB BERISH
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter text-foreground">
              MAZALI <span className="text-primary">TAOM</span><br />
              TEZ <span className="text-secondary">YETKAZISH</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Foodly King bilan eng yaxshi restoranlardan mazali taomlarni 30 daqiqada buyurtma qiling.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto lg:mx-0 pt-4">
              <div className="relative w-full flex-1">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-primary" />
                <input 
                  type="text" 
                  placeholder="Yashash manzilingizni kiriting..." 
                  className="flat-input w-full h-16 pl-14 pr-4 text-lg font-bold"
                />
              </div>
              <button className="flat-button-primary h-16 px-10 text-xl flex items-center gap-3">
                TOPISH <ArrowRight className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 relative w-full aspect-square max-w-2xl lg:mt-0 mt-12">
            <div className="absolute inset-0 bg-primary rounded-full border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"></div>
            <Image 
              src="https://picsum.photos/seed/hero-flat/1000/1000" 
              alt="Foodly King Hero" 
              width={1000} 
              height={1000} 
              className="relative z-10 object-contain p-8 drop-shadow-[10px_10px_0px_rgba(0,0,0,0.1)]"
              priority
              data-ai-hint="gourmet burger"
            />
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-5xl font-black uppercase tracking-tighter">Mashhur <span className="text-secondary">Maskanlar</span></h2>
            <p className="text-xl font-bold text-muted-foreground mt-4">Sizga eng yaqin bo'lgan sifatli restoranlar</p>
          </div>
          <Link href="/restaurants">
            <button className="flat-button-secondary py-3 px-8 text-lg flex items-center gap-2">
              BARCHASINI KO'RISH
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {RESTAURANTS.map((restaurant) => (
            <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`} className="group">
              <div className="flat-card overflow-hidden">
                <div className="relative h-64 w-full border-b-2 border-black">
                  <Image 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    fill 
                    className="object-cover transition-transform group-hover:scale-105 duration-700"
                    data-ai-hint="restaurant food"
                  />
                  <div className="absolute top-4 right-4 bg-white border-2 border-black px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-black">{restaurant.rating}</span>
                  </div>
                  <button className="absolute bottom-4 right-4 h-12 w-12 bg-white border-2 border-black rounded-xl flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none hover:bg-primary hover:text-white transition-all">
                    <Heart className="h-6 w-6" />
                  </button>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-xs font-black text-secondary uppercase tracking-widest mb-2">
                    {restaurant.cuisine}
                  </div>
                  <h3 className="text-3xl font-black mb-4 uppercase">{restaurant.name}</h3>
                  <div className="flex items-center gap-6 text-muted-foreground text-sm font-black uppercase">
                    <span className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      {restaurant.deliveryTime}
                    </span>
                    <span className="flex items-center gap-2">
                      <ArrowRight className="h-5 w-5 text-secondary" />
                      TEZOR
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Badges - Flat Style */}
      <section className="bg-primary py-24 border-y-4 border-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Tezkor Yetkazish", desc: "Shaharning istalgan nuqtasiga 30-45 daqiqada.", icon: "🚀" },
              { title: "Sifatli Taomlar", desc: "Faqat eng sara restoranlar bilan hamkorlik.", icon: "👑" },
              { title: "Hamyonbop", desc: "Hali hech qachon yetkazib berish bunchalik arzon bo'lmagan.", icon: "💰" }
            ].map((item, i) => (
              <div key={i} className="flat-card p-10 bg-white text-center">
                <div className="text-6xl mb-6 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">{item.icon}</div>
                <h3 className="text-2xl font-black mb-4 uppercase">{item.title}</h3>
                <p className="text-muted-foreground font-bold leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t-4 border-black bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-3 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white">
                <Star className="h-8 w-8 fill-white" />
              </div>
              <span className="text-4xl font-black tracking-tighter text-foreground uppercase">FOODLY<span className="text-primary">KING</span></span>
            </div>
            
            <div className="flex gap-10 font-black text-sm uppercase">
              <Link href="#" className="hover:text-primary transition-colors">Yordam</Link>
              <Link href="#" className="hover:text-primary transition-colors">Hamkorlik</Link>
              <Link href="#" className="hover:text-primary transition-colors">Vakansiyalar</Link>
              <Link href="#" className="hover:text-primary transition-colors">Maxfiylik</Link>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t-2 border-black border-dashed text-center font-black text-muted-foreground uppercase text-sm">
            © 2024 Foodly King. Barcha huquqlar himoyalangan.
          </div>
        </div>
      </footer>
    </div>
  );
}