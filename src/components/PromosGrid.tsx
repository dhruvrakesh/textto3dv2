
import React from 'react';
import { Button } from '@/components/ui/button';

const PromosGrid = () => {
  const promos = [
    {
      id: 1,
      title: "Bundle & Save up to $625",
      subtitle: "with package deals",
      description: "Book flight + hotel together and save more than booking separately",
      background: "bg-yellow-100",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=200&fit=crop",
      cta: "Explore packages"
    },
    {
      id: 2,
      title: "Get our best deals on flights",
      subtitle: "with Price Drop Protection",
      description: "Book now and get refunded if prices drop before your trip",
      background: "bg-blue-50",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=200&fit=crop",
      cta: "Search flights"
    },
    {
      id: 3,
      title: "Earn rewards on top of airline miles",
      subtitle: "with One Key",
      description: "Earn rewards on every booking that you can use for future trips",
      background: "bg-green-50",
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=400&h=200&fit=crop",
      cta: "Learn more"
    },
    {
      id: 4,
      title: "Plan a cruise",
      subtitle: "with flexible cancellation",
      description: "Change or cancel plans up to 24 hours before departure",
      background: "bg-purple-50",
      image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=400&h=200&fit=crop",
      cta: "Browse cruises"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-travel-navy mb-4 font-inter">
            More ways to save and explore
          </h2>
          <p className="text-lg text-travel-gray">
            Discover deals, earn rewards, and make the most of your travel budget
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className={`${promo.background} rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group`}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <h3 className="font-semibold text-travel-navy mb-1 font-inter">
                  {promo.title}
                </h3>
                <h4 className="text-travel-blue font-medium mb-3">
                  {promo.subtitle}
                </h4>
                <p className="text-travel-gray text-sm mb-4 leading-relaxed">
                  {promo.description}
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white w-full"
                >
                  {promo.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromosGrid;
