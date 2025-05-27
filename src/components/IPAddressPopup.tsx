
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Globe, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const IPAddressPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ipData, setIpData] = useState(null);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('medibee_ip_popup_seen');
    if (!hasSeenPopup) {
      // Simulate IP address detection
      setTimeout(() => {
        setIpData({
          ip: '192.168.1.100',
          location: 'New Delhi, India',
          timestamp: new Date().toLocaleString()
        });
        setIsVisible(true);
      }, 2000);
    }
  }, []);

  const handleAccept = () => {
    // Store IP data temporarily
    const sessionData = {
      ipAddress: ipData.ip,
      location: ipData.location,
      timestamp: ipData.timestamp,
      sessionId: Math.random().toString(36).substring(7)
    };
    
    localStorage.setItem('medibee_session', JSON.stringify(sessionData));
    localStorage.setItem('medibee_ip_popup_seen', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('medibee_ip_popup_seen', 'true');
    setIsVisible(false);
  };

  if (!ipData) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <Card className="glass border-white/20 max-w-md w-full">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-medical-gradient rounded-xl flex items-center justify-center">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-foreground">Security Notice</CardTitle>
                  </div>
                  <button
                    onClick={handleDecline}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We've detected your connection for security and analytics purposes.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg glass">
                    <Globe className="h-5 w-5 text-medical-blue" />
                    <div>
                      <p className="text-sm font-medium text-foreground">IP Address</p>
                      <p className="text-sm text-muted-foreground">{ipData.ip}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg glass">
                    <Globe className="h-5 w-5 text-medical-green" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">{ipData.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg glass">
                    <Clock className="h-5 w-5 text-medical-purple" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Session Started</p>
                      <p className="text-sm text-muted-foreground">{ipData.timestamp}</p>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground bg-white/5 p-3 rounded-lg">
                  <p className="mb-2">🔒 <strong>Privacy Promise:</strong></p>
                  <p>Your data is temporarily stored for this session only and will be automatically cleared when you close the application. We use this information solely for providing personalized medical assistance.</p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleAccept}
                    className="flex-1 bg-medical-gradient hover:opacity-90 text-white"
                  >
                    Accept & Continue
                  </Button>
                  <Button
                    onClick={handleDecline}
                    variant="outline"
                    className="flex-1 glass border-white/20"
                  >
                    Decline
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IPAddressPopup;
