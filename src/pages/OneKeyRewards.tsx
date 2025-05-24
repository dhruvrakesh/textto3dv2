
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Gift, Plane, Car, Building, Award } from 'lucide-react';

const OneKeyRewards = () => {
  const tiers = [
    {
      name: "Bronze",
      color: "bg-amber-600",
      points: "0-4,999",
      benefits: ["Earn 2% on hotels", "Member prices", "Free wifi"]
    },
    {
      name: "Silver", 
      color: "bg-gray-400",
      points: "5,000-14,999",
      benefits: ["Earn 4% on hotels", "Priority support", "Late checkout"]
    },
    {
      name: "Gold",
      color: "bg-yellow-500", 
      points: "15,000-39,999",
      benefits: ["Earn 6% on hotels", "Room upgrades", "Welcome amenity"]
    },
    {
      name: "Platinum",
      color: "bg-purple-600",
      points: "40,000+",
      benefits: ["Earn 8% on hotels", "VIP treatment", "Exclusive offers"]
    }
  ];

  const examples = [
    {
      name: "Jessica M.",
      trip: "Week in Hawaii",
      saved: "$134",
      story: "Used my points for a free night at a beachfront resort"
    },
    {
      name: "David L.",
      trip: "Business trip to NYC",
      saved: "$89", 
      story: "Got upgraded to business class using my Gold status"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-inter">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-meetpedia-primary to-meetpedia-accent text-white py-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop"
            alt="Happy traveler earning rewards"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Earn More with Every Trip</h1>
          <p className="text-xl mb-8 opacity-90">Join One Key and turn your travels into rewards</p>
          <Button size="lg" className="bg-white text-meetpedia-primary hover:bg-gray-100">
            Join One Key for Free
          </Button>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* How One Key Works */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-meetpedia-secondary mb-4">How One Key Works</h2>
            <p className="text-lg text-gray-600">Earn points on every booking and unlock amazing rewards</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardHeader>
                <div className="w-16 h-16 bg-meetpedia-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-meetpedia-secondary">Book Hotels</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Earn up to 8% back in points on every hotel booking, plus exclusive member prices.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="w-16 h-16 bg-meetpedia-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plane className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-meetpedia-secondary">Book Flights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Earn points on flight bookings and get access to special flight deals for members.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="w-16 h-16 bg-meetpedia-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-meetpedia-secondary">Rent Cars</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Earn points on car rentals and enjoy priority service at rental counters.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Rewards Tiers */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-meetpedia-secondary text-center mb-12">One Key Membership Tiers</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {tiers.map((tier, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className={`h-2 ${tier.color}`}></div>
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${tier.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-meetpedia-secondary">{tier.name}</CardTitle>
                  <p className="text-sm text-gray-600">{tier.points} points</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-center">
                        <Star className="h-4 w-4 text-meetpedia-orange mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Ways to Redeem */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-meetpedia-secondary text-center mb-12">Ways to Redeem Your Points</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-meetpedia-success rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-meetpedia-secondary mb-3">Travel Discounts</h3>
              <p className="text-gray-600">Use points to get instant discounts on hotels, flights, and car rentals for future trips.</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-meetpedia-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-meetpedia-secondary mb-3">Free Nights</h3>
              <p className="text-gray-600">Redeem points for completely free hotel nights at thousands of properties worldwide.</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-meetpedia-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-meetpedia-secondary mb-3">Upgrades</h3>
              <p className="text-gray-600">Use your status to get room upgrades, priority boarding, and VIP treatment.</p>
            </Card>
          </div>
        </section>

        {/* Real Examples */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-meetpedia-secondary text-center mb-12">Real Member Success Stories</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {examples.map((example, index) => (
              <Card key={index} className="p-8 bg-meetpedia-light">
                <div className="text-center">
                  <div className="w-20 h-20 bg-meetpedia-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{example.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-meetpedia-secondary mb-2">{example.name}</h3>
                  <p className="text-meetpedia-primary font-semibold mb-2">{example.trip}</p>
                  <p className="text-3xl font-bold text-meetpedia-success mb-4">Saved {example.saved}</p>
                  <p className="text-gray-600 italic">"{example.story}"</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-gradient-to-r from-meetpedia-primary to-meetpedia-accent text-white rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Start Earning Rewards Today</h2>
          <p className="text-lg mb-8 opacity-90">Join millions of travelers who earn points on every trip</p>
          <Button size="lg" className="bg-white text-meetpedia-primary hover:bg-gray-100">
            Join One Key for Free
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OneKeyRewards;
