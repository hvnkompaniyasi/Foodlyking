
'use client';

import { useState } from 'react';
import { Sparkles, Loader2, Utensils, Star, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { recommendPersonalizedDishes, RecommendPersonalizedDishesOutput } from '@/ai/flows/recommend-personalized-dishes-flow';
import { toast } from '@/hooks/use-toast';

export default function DiscoverPage() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendPersonalizedDishesOutput | null>(null);

  const mockPastOrders = ['King Burger', 'Dragon Roll', 'Diavola Pizza'];
  const mockPreferences = ['Spicy', 'Gourmet', 'Italian'];

  const getRecommendations = async () => {
    setLoading(true);
    try {
      const results = await recommendPersonalizedDishes({
        pastOrders: mockPastOrders,
        dietaryPreferences: mockPreferences
      });
      setRecommendations(results);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Could not generate recommendations at this time.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 font-bold">
            <Sparkles className="h-5 w-5" />
            AI Powered Discovery
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">What should we eat today?</h1>
          <p className="text-xl text-muted-foreground">
            Our AI analyzed your {mockPastOrders.length} past orders and {mockPreferences.length} preferences to find your perfect next meal.
          </p>
        </div>

        {!recommendations && !loading && (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-secondary shadow-lg">
            <Utensils className="h-24 w-24 text-primary/20 mb-8" />
            <Button size="lg" className="rounded-full px-12 h-14 text-xl font-bold bg-primary shadow-xl hover:scale-105 transition-transform" onClick={getRecommendations}>
              Generate AI Recommendations
            </Button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center p-12">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-lg font-medium text-muted-foreground">Analyzing your taste profile...</p>
          </div>
        )}

        {recommendations && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {recommendations.recommendations.map((rec, idx) => (
              <Card key={idx} className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 bg-white flex flex-col">
                <CardHeader className="bg-primary/5 pb-4">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="border-primary text-primary font-bold">Recommended</Badge>
                    <div className="flex items-center text-primary font-bold">
                      <Star className="h-4 w-4 fill-primary mr-1" />
                      AI Pick
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold font-headline mt-4">{rec.dishName}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-6 flex-1">{rec.description}</p>
                  <div className="bg-secondary/30 p-4 rounded-xl border border-secondary text-sm italic text-foreground/80">
                    <div className="flex items-center gap-2 mb-2 font-bold not-italic text-primary uppercase text-[10px] tracking-wider">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Why you'll love it
                    </div>
                    "{rec.reason}"
                  </div>
                  <Button className="w-full mt-6 rounded-full bg-accent font-bold">
                    Order Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {recommendations && (
          <div className="text-center mt-12">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary" onClick={() => setRecommendations(null)}>
              Reset & Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
