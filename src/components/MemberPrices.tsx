
import React from 'react';
import { Button } from '@/components/ui/button';

const MemberPrices = () => {
  return (
    <section className="bg-meetpedia-secondary py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-meetpedia-orange rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚝</span>
            </div>
            <span className="text-white font-medium">
              Sign in to access One Key Member Prices
            </span>
          </div>
          
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-meetpedia-secondary focus:ring-2 focus:ring-meetpedia-accent focus:ring-dashed">
            Sign in
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MemberPrices;
