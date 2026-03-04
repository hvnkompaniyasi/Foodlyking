
export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
  description: string;
  menu: Dish[];
};

export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Burger Royale',
    cuisine: 'American',
    rating: 4.8,
    deliveryTime: '20-30 min',
    image: 'https://picsum.photos/seed/food1/600/400',
    description: 'The finest gourmet burgers in the city.',
    menu: [
      { id: 'd1', name: 'King Burger', description: 'Double beef patty, cheddar, caramelized onions, special sauce.', price: 12.99, image: 'https://picsum.photos/seed/d1/400/300', category: 'Burgers' },
      { id: 'd2', name: 'Truffle Fries', description: 'Golden fries tossed in truffle oil and parmesan.', price: 5.99, image: 'https://picsum.photos/seed/d2/400/300', category: 'Sides' },
      { id: 'd3', name: 'Bacon Cheese Melt', description: 'Crispy bacon and triple cheese on a brioche bun.', price: 10.99, image: 'https://picsum.photos/seed/d3/400/300', category: 'Burgers' },
    ]
  },
  {
    id: '2',
    name: 'Bella Pizza',
    cuisine: 'Italian',
    rating: 4.6,
    deliveryTime: '25-40 min',
    image: 'https://picsum.photos/seed/pizza/600/400',
    description: 'Traditional wood-fired pizzas made with love.',
    menu: [
      { id: 'd4', name: 'Margherita Royale', description: 'San Marzano tomatoes, buffalo mozzarella, fresh basil.', price: 14.50, image: 'https://picsum.photos/seed/d4/400/300', category: 'Pizza' },
      { id: 'd5', name: 'Diavola', description: 'Spicy salami, chili oil, and mozzarella.', price: 15.99, image: 'https://picsum.photos/seed/d5/400/300', category: 'Pizza' },
      { id: 'd6', name: 'Tiramisu', description: 'Homemade classic Italian dessert.', price: 6.50, image: 'https://picsum.photos/seed/d6/400/300', category: 'Dessert' },
    ]
  },
  {
    id: '3',
    name: 'Sakura Zen',
    cuisine: 'Japanese',
    rating: 4.9,
    deliveryTime: '30-45 min',
    image: 'https://picsum.photos/seed/sushi/600/400',
    description: 'Authentic sushi and ramen prepared by masters.',
    menu: [
      { id: 'd7', name: 'Dragon Roll', description: 'Tempura shrimp, cucumber, avocado, eel sauce.', price: 18.00, image: 'https://picsum.photos/seed/d7/400/300', category: 'Sushi' },
      { id: 'd8', name: 'Tonkotsu Ramen', description: 'Rich pork broth, chashu, soft-boiled egg, nori.', price: 16.50, image: 'https://picsum.photos/seed/d8/400/300', category: 'Ramen' },
    ]
  }
];
