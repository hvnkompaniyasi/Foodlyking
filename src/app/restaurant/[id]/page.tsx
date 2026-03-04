
'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Star, Clock, Info, ShoppingCart, Plus } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { RESTAURANTS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/hooks/use-cart';
import { toast } from '@/hooks/use-toast';

export default function RestaurantPage() {
  const { id } = useParams();
  const restaurant = RESTAURANTS.find(r => r.id === id);
  const { addToCart } = useCart();

  if (!restaurant) return <div>Restaurant not found</div>;

  const categories = Array.from(new Set(restaurant.menu.map(item => item.category)));

  const handleAddToCart = (dish: any) => {
    addToCart(dish);
    toast({
      title: "Added to Cart!",
      description: `${dish.name} has been added to your shopping cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="relative h-64 w-full">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-8 flex flex-col md:flex-row justify-between items-end gap-4">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2">{restaurant.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                <Badge className="bg-primary text-white border-none">{restaurant.cuisine}</Badge>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  {restaurant.rating} (500+ ratings)
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {restaurant.deliveryTime}
                </div>
                <div className="flex items-center">
                  <Info className="h-4 w-4 mr-1" />
                  Info
                </div>
              </div>
            </div>
            <Button size="lg" className="bg-primary text-white rounded-full">
              Group Order
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue={categories[0]} className="w-full">
          <div className="flex items-center justify-between mb-8 overflow-x-auto">
            <TabsList className="bg-secondary/50 p-1 rounded-full">
              {categories.map(cat => (
                <TabsTrigger key={cat} value={cat} className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map(cat => (
            <TabsContent key={cat} value={cat}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurant.menu.filter(item => item.category === cat).map(dish => (
                  <div key={dish.id} className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all border border-secondary flex flex-col justify-between">
                    <div className="flex gap-4 mb-4">
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-inner">
                        <Image src={dish.image} alt={dish.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold font-headline mb-1">{dish.name}</h3>
                        <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed">
                          {dish.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xl font-bold text-primary">${dish.price.toFixed(2)}</span>
                      <Button size="sm" className="rounded-full bg-accent hover:bg-accent/90" onClick={() => handleAddToCart(dish)}>
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
