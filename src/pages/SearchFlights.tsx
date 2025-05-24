
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Shield, TrendingDown, Clock, MapPin } from 'lucide-react';

const SearchFlights = () => {
  const deals = [
    {
      route: "New York → Los Angeles",
      price: "$289",
      normal: "$349",
      date: "May 25 - Jun 1"
    },
    {
      route: "Miami → London",
      price: "$599",
      normal: "$799",
      date: "Jun 15 - Jun 29"
    },
    {
      route: "Chicago → Tokyo",
      price: "$899",
      normal: "$1,199",
      date: "Jul 10 - Jul 24"
    }
  ];

  const airlines = [
    { name: "American Airlines", logo: "AA" },
    { name: "Delta Air Lines", logo: "DL" },
    { name: "United Airlines", logo: "UA" },
    { name: "Southwest", logo: "SW" },
    { name: "JetBlue", logo: "JB" },
    { name: "Alaska Airlines", logo: "AS" }
  ];

  return (
    <div className="min-h-screen bg-white font-inter">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-meetpedia-primary to-meetpedia-accent text-white py-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=600&fit=crop"
            alt="Airplane window view"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Best Deals on Flights</h1>
          <p className="text-xl mb-8 opacity-90">Book with confidence using our Price Drop Protection</p>
          <Button size="lg" className="bg-white text-meetpedia-primary hover:bg-gray-100">
            Start Searching Flights
          </Button>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Price Drop Protection */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-meetpedia-secondary mb-4">Price Drop Protection</h2>
            <p className="text-lg text-gray-600">We monitor prices after you book and refund the difference</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <CardHeader>
                <div className="w-16 h-16 bg-meetpedia-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plane className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-meetpedia-secondary text-lg">Book Your Flight</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Choose your perfect flight and complete your booking with us</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="w-16 h-16 bg-meetpedia-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-meetpedia-secondary text-lg">We Monitor Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Our system tracks your flight price 24/7 for potential drops</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="w-16 h-16 bg-meetpedia-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingDown className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-meetpedia-secondary text-lg">Price Drops</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">When we find a lower price, we automatically process your refund</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="w-16 h-16 bg-meetpedia-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-meetpedia-secondary text-lg">Get Refunded</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Receive the difference back to your original payment method</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Featured Deals */}
        <section className="mb-20">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-meetpedia-secondary mb-2">Featured Flight Deals</h2>
              <p className="text-lg text-gray-600">This month's best domestic and international offers</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-meetpedia-secondary mb-6">Domestic Deals</h3>
              <div className="space-y-4">
                {deals.slice(0, 2).map((deal, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold text-meetpedia-secondary">{deal.route}</h4>
                        <p className="text-gray-600">{deal.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-meetpedia-primary">{deal.price}</p>
                        <p className="text-sm text-gray-500 line-through">{deal.normal}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-meetpedia-secondary mb-6">International Deals</h3>
              <div className="space-y-4">
                {deals.slice(1).map((deal, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold text-meetpedia-secondary">{deal.route}</h4>
                        <p className="text-gray-600">{deal.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-meetpedia-primary">{deal.price}</p>
                        <p className="text-sm text-gray-500 line-through">{deal.normal}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Airline Partners */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-meetpedia-secondary text-center mb-12">Our Airline Partners</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {airlines.map((airline, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-meetpedia-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-meetpedia-primary font-bold text-lg">{airline.logo}</span>
                </div>
                <p className="text-sm text-meetpedia-secondary font-medium">{airline.name}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-meetpedia-light rounded-lg p-12">
          <h2 className="text-3xl font-bold text-meetpedia-secondary mb-4">Ready to Find Your Perfect Flight?</h2>
          <p className="text-lg text-gray-600 mb-8">Search thousands of flights and get the best deals with Price Drop Protection</p>
          <Button size="lg" className="bg-meetpedia-primary hover:bg-meetpedia-accent">
            Search Flights Now
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SearchFlights;
