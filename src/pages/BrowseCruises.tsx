
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Anchor, MapPin, Calendar, Users, Shield, Star } from 'lucide-react';

const BrowseCruises = () => {
  const destinations = [
    {
      name: "Alaska Adventure",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=250&fit=crop",
      duration: "7 days",
      ports: "Seattle, Juneau, Ketchikan",
      price: "From $899"
    },
    {
      name: "Caribbean Paradise", 
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      duration: "8 days",
      ports: "Miami, Cozumel, Jamaica",
      price: "From $699"
    },
    {
      name: "Mediterranean Explorer",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=250&fit=crop", 
      duration: "12 days",
      ports: "Rome, Barcelona, Monaco",
      price: "From $1,299"
    }
  ];

  const cruiseLines = [
    { name: "Royal Caribbean", code: "RC" },
    { name: "Norwegian", code: "NCL" },
    { name: "Carnival", code: "CCL" },
    { name: "Princess", code: "PC" },
    { name: "Celebrity", code: "CEL" },
    { name: "Holland America", code: "HAL" }
  ];

  const testimonials = [
    {
      name: "Robert & Linda K.",
      cruise: "Alaska Adventure", 
      rating: 5,
      text: "The glacier views were breathtaking! Flexible booking made it stress-free to plan."
    },
    {
      name: "Maria S.",
      cruise: "Caribbean Paradise",
      rating: 5, 
      text: "Perfect family vacation. The kids loved the ship activities and we loved the beaches."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-inter">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-meetpedia-primary to-meetpedia-accent text-white py-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=600&fit=crop"
            alt="Cruise ship at sunset"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Flexible Cruise Plans You Can Count On</h1>
          <p className="text-xl mb-8 opacity-90">Explore the world's most beautiful destinations with peace of mind</p>
          <Button size="lg" className="bg-white text-meetpedia-primary hover:bg-gray-100">
            Browse Upcoming Cruises
          </Button>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Top Destinations */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-meetpedia-secondary mb-4">Top Cruise Destinations</h2>
            <p className="text-lg text-gray-600">Discover incredible itineraries to the world's most sought-after ports</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-meetpedia-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {destination.duration}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-meetpedia-secondary mb-2">{destination.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{destination.ports}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-meetpedia-primary">{destination.price}</span>
                    <Button variant="outline" className="border-meetpedia-primary text-meetpedia-primary hover:bg-meetpedia-primary hover:text-white">
                      View Cruises
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Flexible Cancellation */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-meetpedia-secondary mb-4">Flexible Cancellation Policy</h2>
            <p className="text-lg text-gray-600">Book with confidence knowing you can change your plans</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardHeader>
                <div className="w-16 h-16 bg-meetpedia-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-meetpedia-secondary">Free Cancellation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Cancel up to 75 days before departure for a full refund on most bookings.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="w-16 h-16 bg-meetpedia-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-meetpedia-secondary">Easy Date Changes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Modify your cruise dates with minimal fees, subject to availability.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="w-16 h-16 bg-meetpedia-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-meetpedia-secondary">24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Our cruise specialists are always available to help with changes or questions.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cruise Lines */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-meetpedia-secondary text-center mb-12">Our Cruise Line Partners</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {cruiseLines.map((line, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-meetpedia-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Anchor className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm text-meetpedia-secondary font-medium">{line.name}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-meetpedia-secondary text-center mb-12">What Our Cruisers Say</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-meetpedia-orange text-meetpedia-orange" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-meetpedia-accent rounded-full flex items-center justify-center mr-3">
                      <Anchor className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-meetpedia-secondary">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.cruise}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-meetpedia-light rounded-lg p-12">
          <h2 className="text-3xl font-bold text-meetpedia-secondary mb-4">Ready to Set Sail?</h2>
          <p className="text-lg text-gray-600 mb-8">Discover amazing cruise deals with flexible booking options</p>
          <Button size="lg" className="bg-meetpedia-primary hover:bg-meetpedia-accent">
            Browse All Cruises
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BrowseCruises;
