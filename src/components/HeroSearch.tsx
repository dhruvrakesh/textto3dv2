
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
    <section className="bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-travel-navy mb-4 font-inter animate-fade-in">
              Your next trip starts here
            </h1>
            <p className="text-lg text-travel-gray animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Search, compare, and save on flights, hotels, and more
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-6 bg-gray-100">
                <TabsTrigger 
                  value="stays" 
                  className="data-[state=active]:bg-white data-[state=active]:text-travel-navy"
                >
                  Stays
                </TabsTrigger>
                <TabsTrigger 
                  value="flights"
                  className="data-[state=active]:bg-white data-[state=active]:text-travel-navy"
                >
                  Flights
                </TabsTrigger>
                <TabsTrigger 
                  value="cars"
                  className="data-[state=active]:bg-white data-[state=active]:text-travel-navy"
                >
                  Cars
                </TabsTrigger>
                <TabsTrigger 
                  value="packages"
                  className="data-[state=active]:bg-white data-[state=active]:text-travel-navy"
                >
                  Packages
                </TabsTrigger>
                <TabsTrigger 
                  value="activities"
                  className="data-[state=active]:bg-white data-[state=active]:text-travel-navy"
                >
                  Things to Do
                </TabsTrigger>
                <TabsTrigger 
                  value="cruises"
                  className="data-[state=active]:bg-white data-[state=active]:text-travel-navy"
                >
                  Cruises
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stays" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-travel-gray" />
                    <Input
                      placeholder="Where to?"
                      className="pl-10 h-12 border-gray-300 focus:border-travel-blue focus:ring-travel-blue"
                    />
                  </div>
                  
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-travel-gray" />
                    <Input
                      placeholder="May 25 – May 27"
                      className="pl-10 h-12 border-gray-300 focus:border-travel-blue focus:ring-travel-blue"
                      readOnly
                    />
                  </div>
                  
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-travel-gray" />
                    <Input
                      placeholder="2 travelers, 1 room"
                      className="pl-10 h-12 border-gray-300 focus:border-travel-blue focus:ring-travel-blue"
                      readOnly
                    />
                  </div>
                  
                  <Button className="h-12 bg-travel-blue hover:bg-blue-700 text-white font-medium">
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
                      className="rounded border-gray-300 text-travel-blue focus:ring-travel-blue"
                    />
                    <span className="text-sm text-travel-gray">Add a flight</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addCar}
                      onChange={(e) => setAddCar(e.target.checked)}
                      className="rounded border-gray-300 text-travel-blue focus:ring-travel-blue"
                    />
                    <span className="text-sm text-travel-gray">Add a car</span>
                  </label>
                </div>
              </TabsContent>

              <TabsContent value="flights" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input placeholder="From" className="h-12 border-gray-300 focus:border-travel-blue" />
                  <Input placeholder="To" className="h-12 border-gray-300 focus:border-travel-blue" />
                  <Input placeholder="Departure" className="h-12 border-gray-300 focus:border-travel-blue" />
                  <Button className="h-12 bg-travel-blue hover:bg-blue-700 text-white font-medium">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="cars" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input placeholder="Pick-up location" className="h-12 border-gray-300 focus:border-travel-blue" />
                  <Input placeholder="Pick-up date" className="h-12 border-gray-300 focus:border-travel-blue" />
                  <Input placeholder="Drop-off date" className="h-12 border-gray-300 focus:border-travel-blue" />
                  <Button className="h-12 bg-travel-blue hover:bg-blue-700 text-white font-medium">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="packages" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input placeholder="Destination" className="h-12 border-gray-300 focus:border-travel-blue" />
                  <Input placeholder="Departure city" className="h-12 border-gray-300 focus:border-travel-blue" />
                  <Input placeholder="Dates" className="h-12 border-gray-300 focus:border-travel-blue" />
                  <Button className="h-12 bg-travel-blue hover:bg-blue-700 text-white font-medium">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="activities" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input placeholder="Destination" className="col-span-2 h-12 border-gray-300 focus:border-travel-blue" />
                  <Input placeholder="Date" className="h-12 border-gray-300 focus:border-travel-blue" />
                  <Button className="h-12 bg-travel-blue hover:bg-blue-700 text-white font-medium">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="cruises" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input placeholder="Destination" className="h-12 border-gray-300 focus:border-travel-blue" />
                  <Input placeholder="Departure port" className="h-12 border-gray-300 focus:border-travel-blue" />
                  <Input placeholder="Dates" className="h-12 border-gray-300 focus:border-travel-blue" />
                  <Button className="h-12 bg-travel-blue hover:bg-blue-700 text-white font-medium">
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
