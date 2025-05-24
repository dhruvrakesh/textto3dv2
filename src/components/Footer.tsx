
import React from 'react';
import { MapPin } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "Investor Relations", "Advertising"]
    },
    {
      title: "Support",
      links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service", "Accessibility"]
    },
    {
      title: "Travel",
      links: ["Hotels", "Flights", "Car Rentals", "Vacation Packages", "Cruises"]
    },
    {
      title: "Partnerships",
      links: ["List your property", "Become an affiliate", "Travel Agent Support", "Developer Tools"]
    }
  ];

  return (
    <footer className="bg-meetpedia-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/public/images/8161b190-9101-4789-8086-015601e5a6b9.png" 
                alt="Meetpedia Travel" 
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for finding and booking the perfect trip. 
              Explore the world with confidence.
            </p>
            <div className="flex gap-4 mt-6">
              <div className="w-8 h-8 bg-meetpedia-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-meetpedia-accent transition-colors">
                <span className="text-xs font-bold">f</span>
              </div>
              <div className="w-8 h-8 bg-meetpedia-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-meetpedia-accent transition-colors">
                <span className="text-xs font-bold">t</span>
              </div>
              <div className="w-8 h-8 bg-meetpedia-orange rounded-full flex items-center justify-center cursor-pointer hover:bg-meetpedia-orange/80 transition-colors">
                <span className="text-xs font-bold">i</span>
              </div>
            </div>
          </div>

          {/* Links sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4 font-inter text-white">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-gray-300 text-sm hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-meetpedia-accent focus:ring-dashed"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2025 Meetpedia Travel, Inc. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-meetpedia-accent focus:ring-dashed">Sitemap</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-meetpedia-accent focus:ring-dashed">Privacy</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-meetpedia-accent focus:ring-dashed">Terms</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-meetpedia-accent focus:ring-dashed">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
