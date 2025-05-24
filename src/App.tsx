
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ExplorePackages from "./pages/ExplorePackages";
import SearchFlights from "./pages/SearchFlights";
import OneKeyRewards from "./pages/OneKeyRewards";
import BrowseCruises from "./pages/BrowseCruises";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore-packages" element={<ExplorePackages />} />
          <Route path="/search-flights" element={<SearchFlights />} />
          <Route path="/one-key-rewards" element={<OneKeyRewards />} />
          <Route path="/browse-cruises" element={<BrowseCruises />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
