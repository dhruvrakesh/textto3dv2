
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, MessageCircle, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-meetpedia-border sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-meetpedia-light py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span className="text-meetpedia-secondary">Get the app</span>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-meetpedia-secondary hover:text-meetpedia-primary transition-colors focus:outline-none focus:ring-2 focus:ring-meetpedia-accent focus:ring-dashed">
                USD
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border shadow-lg z-50">
                <div className="p-2">
                  <div className="py-2 px-3 hover:bg-meetpedia-light cursor-pointer rounded">USD - US Dollar</div>
                  <div className="py-2 px-3 hover:bg-meetpedia-light cursor-pointer rounded">EUR - Euro</div>
                  <div className="py-2 px-3 hover:bg-meetpedia-light cursor-pointer rounded">GBP - British Pound</div>
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
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/public/images/8161b190-9101-4789-8086-015601e5a6b9.png" 
                alt="Meetpedia Travel" 
                className="h-10 lg:h-10 md:h-8 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-meetpedia-secondary hover:text-meetpedia-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-meetpedia-accent focus:ring-dashed">
                Shop travel
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border shadow-lg w-96 p-4 z-50">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Link to="/" className="block py-2 px-3 hover:bg-meetpedia-light cursor-pointer rounded text-meetpedia-secondary hover:text-meetpedia-primary">Stays</Link>
                    <Link to="/search-flights" className="block py-2 px-3 hover:bg-meetpedia-light cursor-pointer rounded text-meetpedia-secondary hover:text-meetpedia-primary">Flights</Link>
                    <div className="py-2 px-3 hover:bg-meetpedia-light cursor-pointer rounded text-meetpedia-secondary hover:text-meetpedia-primary">Cars</div>
                  </div>
                  <div className="space-y-2">
                    <Link to="/explore-packages" className="block py-2 px-3 hover:bg-meetpedia-light cursor-pointer rounded text-meetpedia-secondary hover:text-meetpedia-primary">Packages</Link>
                    <div className="py-2 px-3 hover:bg-meetpedia-light cursor-pointer rounded text-meetpedia-secondary hover:text-meetpedia-primary">Things to Do</div>
                    <Link to="/browse-cruises" className="block py-2 px-3 hover:bg-meetpedia-light cursor-pointer rounded text-meetpedia-secondary hover:text-meetpedia-primary">Cruises</Link>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right side navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-meetpedia-secondary hover:text-meetpedia-primary transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-meetpedia-accent focus:ring-dashed">
              List your property
            </a>
            <a href="#" className="text-meetpedia-secondary hover:text-meetpedia-primary transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-meetpedia-accent focus:ring-dashed">
              Support
            </a>
            <a href="#" className="text-meetpedia-secondary hover:text-meetpedia-primary transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-meetpedia-accent focus:ring-dashed">
              Trips
            </a>
            <MessageCircle className="h-5 w-5 text-meetpedia-secondary hover:text-meetpedia-primary cursor-pointer transition-colors" />
            <Button variant="outline" className="border-meetpedia-primary text-meetpedia-primary hover:bg-meetpedia-primary hover:text-white transition-all focus:ring-2 focus:ring-meetpedia-accent focus:ring-dashed">
              Sign in
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-meetpedia-secondary"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-meetpedia-border animate-fade-in">
            <div className="space-y-4">
              <div className="py-2">
                <div className="font-medium text-meetpedia-secondary mb-2">Shop travel</div>
                <div className="ml-4 space-y-2 text-sm">
                  <Link to="/" className="block py-1 text-meetpedia-secondary">Stays</Link>
                  <Link to="/search-flights" className="block py-1 text-meetpedia-secondary">Flights</Link>
                  <div className="py-1 text-meetpedia-secondary">Cars</div>
                  <Link to="/explore-packages" className="block py-1 text-meetpedia-secondary">Packages</Link>
                  <div className="py-1 text-meetpedia-secondary">Things to Do</div>
                  <Link to="/browse-cruises" className="block py-1 text-meetpedia-secondary">Cruises</Link>
                </div>
              </div>
              <div className="space-y-3 pt-2">
                <a href="#" className="block text-meetpedia-secondary text-sm">List your property</a>
                <a href="#" className="block text-meetpedia-secondary text-sm">Support</a>
                <a href="#" className="block text-meetpedia-secondary text-sm">Trips</a>
                <Button variant="outline" className="w-full border-meetpedia-primary text-meetpedia-primary">
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
