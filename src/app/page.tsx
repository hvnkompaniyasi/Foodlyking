
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, MapPin, ChevronRight, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { RESTAURANTS } from '@/lib/mock-data';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[400px] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="https://picsum.photos/seed/food1/1200/600"
          alt="Gourmet Food"
          fill
          className="object-cover brightness-50"
          priority
          data-ai-hint="gourmet food"
        />
        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-headline drop-shadow-lg">Taste of Royalty</h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md">Get the finest meals from top-rated restaurants delivered to your doorstep.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8 rounded-full">
              Order Now
            </Button>
            <Link href="/discover">
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 text-lg px-8 rounded-full">
                <Sparkles className="mr-2 h-5 w-5" /> AI Recommendations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto py-12 px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-headline">Popular Near You</h2>
          <Button variant="link" className="text-primary font-semibold">View all <ChevronRight className="ml-1 h-4 w-4" /></Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESTAURANTS.map((restaurant) => (
            <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
              <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-none bg-card">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-white/90 text-primary font-bold">
                    {restaurant.cuisine}
                  </Badge>
                </div>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold font-headline group-hover:text-primary transition-colors">{restaurant.name}</h3>
                    <div className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded text-sm font-bold">
                      <Star className="h-3.5 w-3.5 fill-current mr-1" />
                      {restaurant.rating}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {restaurant.description}
                  </p>
                </CardContent>
                <CardFooter className="pt-0 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-primary" />
                    {restaurant.deliveryTime}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-primary" />
                    2.5 km
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Promotions Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-2xl">
            <div className="mb-8 md:mb-0 md:max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 font-headline">Become a Foodly King Member</h2>
              <p className="text-lg opacity-90 mb-6">Enjoy unlimited free delivery on all orders and exclusive discounts from top-rated restaurants.</p>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold rounded-full">
                Try Free for 30 Days
              </Button>
            </div>
            <div className="relative w-full md:w-1/3 aspect-video md:aspect-square">
              <Image
                src="https://picsum.photos/seed/gift/400/400"
                alt="Promotion"
                fill
                className="object-contain"
                data-ai-hint="delivery gift"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
