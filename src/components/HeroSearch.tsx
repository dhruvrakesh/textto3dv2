import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, MapPin, User, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const HeroSearch = () => {
  const [activeTab, setActiveTab] = useState('stays');
  const [addFlight, setAddFlight] = useState(false);
  const [addCar, setAddCar] = useState(false);

  return (
    <section className="bg-gradient-to-b from-meetpedia-light to-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-meetpedia-secondary mb-4 font-inter animate-fade-in">
              Your next trip starts here
            </h1>
            <p className="text-lg text-meetpedia-secondary/70 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Search, compare, and save on flights, hotels, and more
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-6 bg-meetpedia-light">
                <TabsTrigger 
                  value="stays" 
                  className="data-[state=active]:bg-white data-[state=active]:text-meetpedia-primary"
                >
                  Stays
                </TabsTrigger>
                <TabsTrigger 
                  value="flights"
                  className="data-[state=active]:bg-white data-[state=active]:text-meetpedia-primary"
                >
                  Flights
                </TabsTrigger>
                <TabsTrigger 
                  value="cars"
                  className="data-[state=active]:bg-white data-[state=active]:text-meetpedia-primary"
                >
                  Cars
                </TabsTrigger>
                <TabsTrigger 
                  value="packages"
                  className="data-[state=active]:bg-white data-[state=active]:text-meetpedia-primary"
                >
                  Packages
                </TabsTrigger>
                <TabsTrigger 
                  value="activities"
                  className="data-[state=active]:bg-white data-[state=active]:text-meetpedia-primary"
                >
                  Things to Do
                </TabsTrigger>
                <TabsTrigger 
                  value="cruises"
                  className="data-[state=active]:bg-white data-[state=active]:text-meetpedia-primary"
                >
                  Cruises
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stays" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-meetpedia-secondary/60" />
                    <Input
                      placeholder="Where to?"
                      className="pl-10 h-12 border-gray-300 focus:border-meetpedia-primary focus:ring-meetpedia-accent"
                    />
                  </div>
                  
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-meetpedia-secondary/60" />
                    <Input
                      placeholder="May 25 – May 27"
                      className="pl-10 h-12 border-gray-300 focus:border-meetpedia-primary focus:ring-meetpedia-accent"
                      readOnly
                    />
                  </div>
                  
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-meetpedia-secondary/60" />
                    <Input
                      placeholder="2 travelers, 1 room"
                      className="pl-10 h-12 border-gray-300 focus:border-meetpedia-primary focus:ring-meetpedia-accent"
                      readOnly
                    />
                  </div>
                  
                  <Button className="h-12 bg-meetpedia-primary hover:bg-meetpedia-primary/90 text-white font-medium focus:ring-2 focus:ring-meetpedia-accent focus:ring-dashed">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
                
                <div className="flex gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addFlight}
                      onChange={(e) => setAddFlight(e.target.checked)}
                      className="rounded border-gray-300 text-meetpedia-primary focus:ring-meetpedia-accent"
                    />
                    <span className="text-sm text-meetpedia-secondary/70">Add a flight</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addCar}
                      onChange={(e) => setAddCar(e.target.checked)}
                      className="rounded border-gray-300 text-meetpedia-primary focus:ring-meetpedia-accent"
                    />
                    <span className="text-sm text-meetpedia-secondary/70">Add a car</span>
                  </label>
                </div>
              </TabsContent>

              <TabsContent value="flights" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input placeholder="From" className="h-12 border-gray-300 focus:border-meetpedia-primary" />
                  <Input placeholder="To" className="h-12 border-gray-300 focus:border-meetpedia-primary" />
                  <Input placeholder="Departure" className="h-12 border-gray-300 focus:border-meetpedia-primary" />
                  <Button className="h-12 bg-meetpedia-primary hover:bg-meetpedia-primary/90 text-white font-medium">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="cars" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input placeholder="Pick-up location" className="h-12 border-gray-300 focus:border-meetpedia-primary" />
                  <Input placeholder="Pick-up date" className="h-12 border-gray-300 focus:border-meetpedia-primary" />
                  <Input placeholder="Drop-off date" className="h-12 border-gray-300 focus:border-meetpedia-primary" />
                  <Button className="h-12 bg-meetpedia-primary hover:bg-meetpedia-primary/90 text-white font-medium">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="packages" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input placeholder="Destination" className="h-12 border-gray-300 focus:border-meetpedia-primary" />
                  <Input placeholder="Departure city" className="h-12 border-gray-300 focus:border-meetpedia-primary" />
                  <Input placeholder="Dates" className="h-12 border-gray-300 focus:border-meetpedia-primary" />
                  <Button className="h-12 bg-meetpedia-primary hover:bg-meetpedia-primary/90 text-white font-medium">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="activities" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input placeholder="Destination" className="col-span-2 h-12 border-gray-300 focus:border-meetpedia-primary" />
                  <Input placeholder="Date" className="h-12 border-gray-300 focus:border-meetpedia-primary" />
                  <Button className="h-12 bg-meetpedia-primary hover:bg-meetpedia-primary/90 text-white font-medium">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="cruises" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input placeholder="Destination" className="h-12 border-gray-300 focus:border-meetpedia-primary" />
                  <Input placeholder="Departure port" className="h-12 border-gray-300 focus:border-meetpedia-primary" />
                  <Input placeholder="Dates" className="h-12 border-gray-300 focus:border-meetpedia-primary" />
                  <Button className="h-12 bg-meetpedia-primary hover:bg-meetpedia-primary/90 text-white font-medium">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSearch;
