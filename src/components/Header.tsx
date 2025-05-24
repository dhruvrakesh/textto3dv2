
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, ChevronDown, MessageCircle, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gray-50 py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span className="text-travel-gray">Get the app</span>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-travel-gray hover:text-travel-navy transition-colors">
                USD
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border shadow-lg">
                <div className="p-2">
                  <div className="py-2 px-3 hover:bg-gray-50 cursor-pointer">USD - US Dollar</div>
                  <div className="py-2 px-3 hover:bg-gray-50 cursor-pointer">EUR - Euro</div>
                  <div className="py-2 px-3 hover:bg-gray-50 cursor-pointer">GBP - British Pound</div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-travel-blue" />
            <span className="text-xl font-semibold text-travel-navy font-inter">TravelNow</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-travel-navy hover:text-travel-blue transition-colors font-medium">
                Shop travel
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border shadow-lg w-96 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="py-2 px-3 hover:bg-gray-50 cursor-pointer rounded">Stays</div>
                    <div className="py-2 px-3 hover:bg-gray-50 cursor-pointer rounded">Flights</div>
                    <div className="py-2 px-3 hover:bg-gray-50 cursor-pointer rounded">Cars</div>
                  </div>
                  <div className="space-y-2">
                    <div className="py-2 px-3 hover:bg-gray-50 cursor-pointer rounded">Packages</div>
                    <div className="py-2 px-3 hover:bg-gray-50 cursor-pointer rounded">Things to Do</div>
                    <div className="py-2 px-3 hover:bg-gray-50 cursor-pointer rounded">Cruises</div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right side navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-travel-gray hover:text-travel-navy transition-colors text-sm">
              List your property
            </a>
            <a href="#" className="text-travel-gray hover:text-travel-navy transition-colors text-sm">
              Support
            </a>
            <a href="#" className="text-travel-gray hover:text-travel-navy transition-colors text-sm">
              Trips
            </a>
            <MessageCircle className="h-5 w-5 text-travel-gray hover:text-travel-navy cursor-pointer transition-colors" />
            <Button variant="outline" className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white transition-all">
              Sign in
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-travel-navy"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <div className="space-y-4">
              <div className="py-2">
                <div className="font-medium text-travel-navy mb-2">Shop travel</div>
                <div className="ml-4 space-y-2 text-sm">
                  <div className="py-1 text-travel-gray">Stays</div>
                  <div className="py-1 text-travel-gray">Flights</div>
                  <div className="py-1 text-travel-gray">Cars</div>
                  <div className="py-1 text-travel-gray">Packages</div>
                  <div className="py-1 text-travel-gray">Things to Do</div>
                  <div className="py-1 text-travel-gray">Cruises</div>
                </div>
              </div>
              <div className="space-y-3 pt-2">
                <a href="#" className="block text-travel-gray text-sm">List your property</a>
                <a href="#" className="block text-travel-gray text-sm">Support</a>
                <a href="#" className="block text-travel-gray text-sm">Trips</a>
                <Button variant="outline" className="w-full border-travel-blue text-travel-blue">
                  Sign in
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
