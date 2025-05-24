
import React from 'react';
import { Button } from '@/components/ui/button';

const MemberPrices = () => {
  return (
    <section className="bg-travel-navy py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-travel-navy font-bold text-lg">⚝</span>
            </div>
            <span className="text-white font-medium">
              Sign in to access One Key Member Prices
            </span>
          </div>
          
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-travel-navy">
            Sign in
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MemberPrices;
