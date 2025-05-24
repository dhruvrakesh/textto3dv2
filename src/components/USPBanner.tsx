
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const USPBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <section className="bg-meetpedia-light py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-8 max-w-4xl mx-auto">
          <div className="flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=320&h=240&fit=crop"
              alt="Luxury hotel room"
              className="w-80 h-60 object-cover rounded-lg shadow-md"
            />
          </div>
          
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-semibold text-meetpedia-secondary font-inter">
              Total price upfront
            </h2>
            <p className="text-lg text-meetpedia-secondary/70 leading-relaxed">
              The price you see for your stay is what you pay. No hidden fees, no surprises. 
              Book with confidence knowing exactly what you'll spend.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="border-meetpedia-primary text-meetpedia-primary hover:bg-meetpedia-primary hover:text-white focus:ring-2 focus:ring-meetpedia-accent focus:ring-dashed">
                Learn more
              </Button>
              <button
                onClick={() => setIsVisible(false)}
                className="text-meetpedia-secondary/70 hover:text-meetpedia-secondary text-sm underline focus:outline-none focus:ring-2 focus:ring-meetpedia-accent focus:ring-dashed"
              >
                Dismiss
              </button>
            </div>
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="self-start p-2 hover:bg-white/50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-meetpedia-accent focus:ring-dashed"
          >
            <X className="h-5 w-5 text-meetpedia-secondary/60" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default USPBanner;
