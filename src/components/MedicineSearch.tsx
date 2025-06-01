import { useState } from 'react';
import { Search, MapPin, ShoppingCart, AlertTriangle, ExternalLink, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { aiEngine, type AIResponse, type MedicineKnowledge } from '@/lib/aiEngine';
import { useSession } from './SessionProvider';

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
  const [searchResults, setSearchResults] = useState<MedicineKnowledge[]>([]);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { addSearchQuery, triggerSessionStart, hasActiveSession } = useSession();

  // Real AI-powered medicine search
  const searchMedicine = async (query: string): Promise<void> => {
    try {
      const response = await aiEngine.searchMedicine(query);
      setAiResponse(response);

      if (response.success && response.data) {
        setSearchResults(Array.isArray(response.data) ? response.data : [response.data]);
        setError(null);

        // Track search in session
        if (hasActiveSession) {
          await addSearchQuery(query);
        }
      } else {
        setSearchResults([]);
        setError(response.error || 'No medicine information found');
      }
    } catch (err) {
      setSearchResults([]);
      setError('Search failed. Please try again.');
      console.error('Medicine search error:', err);
    }
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

    // Trigger session start if no active session
    if (!hasActiveSession) {
      triggerSessionStart();
      return;
    }

    setIsSearching(true);
    setError(null);
    setSearchResults([]);
    setAiResponse(null);

    await searchMedicine(searchQuery);
    setIsSearching(false);
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

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          {/* AI Response Info */}
          {aiResponse && (
            <Card className="glass border-white/20 border-green-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                      AI-Powered Results
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {Math.round(aiResponse.confidence * 100)}% Confidence
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Sources: {aiResponse.sources.join(', ')}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Medicine Results */}
          {searchResults.map((medicine, index) => (
            <Card key={index} className="glass border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{medicine.name}</span>
                  <Badge
                    variant={medicine.availability === 'Available' ? 'default' : 'destructive'}
                    className={medicine.availability === 'Available' ? 'bg-green-500/20 text-green-700' : ''}
                  >
                    {medicine.availability}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Basic Information</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Generic Name:</strong> {medicine.genericName}</p>
                      <p><strong>Category:</strong> {medicine.category}</p>
                      <p><strong>Dosage:</strong> {medicine.dosage}</p>
                      <p><strong>Price Range:</strong> ₹{medicine.price.min} - ₹{medicine.price.max}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Uses</h4>
                    <div className="flex flex-wrap gap-1">
                      {medicine.uses.map((use, useIndex) => (
                        <Badge key={useIndex} variant="secondary" className="text-xs">
                          {use}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {medicine.sideEffects.length > 0 && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Side Effects</h4>
                    <div className="flex flex-wrap gap-1">
                      {medicine.sideEffects.map((effect, effectIndex) => (
                        <Badge key={effectIndex} variant="outline" className="text-xs text-amber-600">
                          {effect}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {medicine.contraindications.length > 0 && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Contraindications</h4>
                    <div className="flex flex-wrap gap-1">
                      {medicine.contraindications.map((contra, contraIndex) => (
                        <Badge key={contraIndex} variant="destructive" className="text-xs">
                          {contra}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {/* AI Disclaimer */}
          {aiResponse && (
            <Card className="glass border-white/20 border-amber-500/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-amber-700 dark:text-amber-300">
                    <strong>AI Disclaimer:</strong> {aiResponse.disclaimer}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
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
                {['Paracetamol', 'Ibuprofen', 'Crocin', 'Dolo 650', 'Aspirin'].map((suggestion) => (
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
    </div>
  );
};

export default MedicineSearch;
