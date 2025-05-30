import { useState } from 'react';
import { Search, MapPin, ShoppingCart, AlertTriangle, ExternalLink, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface MedicineInfo {
  name: string;
  genericName: string;
  manufacturer: string;
  price: string;
  dosage: string;
  sideEffects: string[];
  uses: string[];
  availability: 'Available' | 'Limited' | 'Out of Stock';
  nearbyStores: {
    name: string;
    distance: string;
    price: string;
    address: string;
    phone: string;
  }[];
  onlineStores: {
    name: string;
    price: string;
    url: string;
    delivery: string;
  }[];
}

const MedicineSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [medicineInfo, setMedicineInfo] = useState<MedicineInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // This would be replaced with actual API calls to Indian medicine databases
  const searchMedicine = async (query: string): Promise<MedicineInfo | null> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // For demo purposes, return null to show "no data" state
    // In production, this would call:
    // 1. Indian Drug Database APIs
    // 2. Pharmacy APIs (1mg, PharmEasy, etc.)
    // 3. Government drug databases
    // 4. Google Maps API for nearby pharmacies

    return null;
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Enter Medicine Name",
        description: "Please enter a medicine name to search.",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    setError(null);
    setMedicineInfo(null);

    try {
      const result = await searchMedicine(searchQuery);
      if (result) {
        setMedicineInfo(result);
      } else {
        setError('No data available for this medicine. Please try a different search term.');
      }
    } catch (err) {
      setError('Failed to search medicine. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card className="glass border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-medical-blue" />
            Medicine Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter medicine name (e.g., Paracetamol, Crocin, etc.)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="glass border-white/20"
              disabled={isSearching}
            />
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-medical-gradient hover:opacity-90 text-white"
            >
              {isSearching ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-700 dark:text-amber-300">
                <strong>Medical Disclaimer:</strong> This information is for educational purposes only.
                Always consult with a qualified healthcare professional before taking any medication.
                AI-generated information may vary and should not replace professional medical advice.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isSearching && (
        <Card className="glass border-white/20">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-medical-blue" />
            <p className="text-muted-foreground">Searching Indian medicine databases...</p>
            <p className="text-sm text-muted-foreground mt-2">
              Checking availability, prices, and nearby stores
            </p>
          </CardContent>
        </Card>
      )}

      {/* No Data State */}
      {error && (
        <Card className="glass border-white/20">
          <CardContent className="p-8 text-center">
            <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Data Available</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Try searching for:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Paracetamol', 'Crocin', 'Dolo 650', 'Azithromycin', 'Amoxicillin'].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setError(null);
                    }}
                    className="glass border-white/20"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Note: Medicine Information section removed - only real API data will be shown */}
    </div>
  );
};

export default MedicineSearch;
