
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Star, Users, MapPin, Calendar } from 'lucide-react';

const ExplorePackages = () => {
  const destinations = [
    {
      name: "Hawaii Paradise",
      price: "$1,299",
      savings: "$300",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop",
      nights: "7 nights",
      includes: "Flight + Hotel + Car"
    },
    {
      name: "Europe Explorer",
      price: "$1,899",
      savings: "$450",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=250&fit=crop",
      nights: "10 nights",
      includes: "Flight + Hotel"
    },
    {
      name: "Caribbean Escape",
      price: "$999",
      savings: "$250",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      nights: "5 nights",
      includes: "Flight + Resort"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Denver, CO",
      text: "Saved over $400 on our Hawaii trip! The bundled package made everything so easy to book.",
      rating: 5
    },
    {
      name: "Mike Chen",
      location: "Austin, TX", 
      text: "The Europe package was incredible value. Everything was seamlessly coordinated.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white font-inter">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-meetpedia-primary to-meetpedia-accent text-white py-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop"
            alt="Happy travelers at airport"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Book Smarter with Bundled Travel Packages</h1>
          <p className="text-xl mb-8 opacity-90">Save more when you bundle flights, hotels, and cars together</p>
          <Button size="lg" className="bg-white text-meetpedia-primary hover:bg-gray-100">
            Browse Packages
          </Button>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* How Bundling Saves Money */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-meetpedia-secondary mb-4">Why Bundle Your Trip?</h2>
            <p className="text-lg text-gray-600">Discover the smart way to save on travel</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardHeader>
                <div className="w-16 h-16 bg-meetpedia-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-meetpedia-secondary">Instant Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Bundle flights and hotels to unlock exclusive discounts up to 30% off individual bookings.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="w-16 h-16 bg-meetpedia-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-meetpedia-secondary">One-Stop Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Plan your entire trip in one place. No need to juggle multiple reservations.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="w-16 h-16 bg-meetpedia-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-meetpedia-secondary">24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Get dedicated support for your entire trip from our travel experts.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-meetpedia-secondary text-center mb-12">Popular Bundle Destinations</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-meetpedia-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Save {destination.savings}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-meetpedia-secondary mb-2">{destination.name}</h3>
                  <p className="text-gray-600 mb-2">{destination.nights} • {destination.includes}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-meetpedia-primary">{destination.price}</span>
                    <Button variant="outline" className="border-meetpedia-primary text-meetpedia-primary hover:bg-meetpedia-primary hover:text-white">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-meetpedia-secondary text-center mb-12">What Our Travelers Say</h2>
          
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
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-meetpedia-secondary">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-meetpedia-secondary text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-meetpedia-secondary mb-3">Can I customize my package?</h3>
              <p className="text-gray-600">Absolutely! You can choose from different hotel categories, flight times, and add extras like car rentals or activities to create your perfect trip.</p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-meetpedia-secondary mb-3">Can I add a car rental to my package?</h3>
              <p className="text-gray-600">Yes! Adding a car rental to your flight and hotel package can provide additional savings and convenience for exploring your destination.</p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-meetpedia-secondary mb-3">What if I need to cancel or change my booking?</h3>
              <p className="text-gray-600">Package bookings include flexible change options. Specific terms depend on your chosen flights and hotels, and our support team is here to help with any modifications.</p>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-meetpedia-light rounded-lg p-12">
          <h2 className="text-3xl font-bold text-meetpedia-secondary mb-4">Ready to Start Saving?</h2>
          <p className="text-lg text-gray-600 mb-8">Discover amazing package deals and start planning your next adventure</p>
          <Button size="lg" className="bg-meetpedia-primary hover:bg-meetpedia-accent">
            Browse All Packages
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ExplorePackages;
