
import React from 'react';
import Header from '@/components/Header';
import HeroSearch from '@/components/HeroSearch';
import USPBanner from '@/components/USPBanner';
import MemberPrices from '@/components/MemberPrices';
import PromosGrid from '@/components/PromosGrid';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-inter">
      <Header />
      <main>
        <HeroSearch />
        <USPBanner />
        <MemberPrices />
        <PromosGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
