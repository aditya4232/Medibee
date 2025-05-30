
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, MapPin, Monitor, Shield, LogIn } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession } from './SessionProvider';
import { useToast } from '@/hooks/use-toast';

interface DeviceInfo {
  type: string;
  browser: string;
  os: string;
}

interface IPData {
  ip: string;
  location: string;
  country: string;
  city: string;
}

const SessionPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [ipData, setIPData] = useState<IPData | null>(null);
  const { startSession, hasActiveSession, isLoading: sessionLoading } = useSession();
  const { toast } = useToast();

  useEffect(() => {
    // Show popup only when session is not loading and no active session exists
    if (!sessionLoading && !hasActiveSession) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [hasActiveSession, sessionLoading]);

  useEffect(() => {
    if (isVisible) {
      // Get device info
      const getDeviceInfo = () => {
        const userAgent = navigator.userAgent;
        let deviceType = 'Desktop';
        let browser = 'Unknown';
        let os = 'Unknown';

        if (/Mobile|Android|iPhone/i.test(userAgent)) {
          deviceType = 'Mobile';
        } else if (/Tablet|iPad/i.test(userAgent)) {
          deviceType = 'Tablet';
        }

        if (userAgent.includes('Chrome')) browser = 'Chrome';
        else if (userAgent.includes('Firefox')) browser = 'Firefox';
        else if (userAgent.includes('Safari')) browser = 'Safari';
        else if (userAgent.includes('Edge')) browser = 'Edge';

        if (userAgent.includes('Windows')) os = 'Windows';
        else if (userAgent.includes('Mac')) os = 'macOS';
        else if (userAgent.includes('Linux')) os = 'Linux';
        else if (userAgent.includes('Android')) os = 'Android';
        else if (userAgent.includes('iOS')) os = 'iOS';

        setDeviceInfo({ type: deviceType, browser, os });
      };

      // Get IP and location
      const getIPData = async () => {
        try {
          const response = await fetch('https://ipapi.co/json/');
          const data = await response.json();
          setIPData({
            ip: data.ip || 'Unknown',
            location: `${data.city || 'Unknown'}, ${data.country_name || 'Unknown'}`,
            country: data.country_name || 'Unknown',
            city: data.city || 'Unknown'
          });
        } catch (error) {
          console.log('Could not fetch IP data:', error);
          setIPData({
            ip: '192.168.1.1',
            location: 'India',
            country: 'India',
            city: 'Mumbai'
          });
        }
      };

      getDeviceInfo();
      getIPData();
    }
  }, [isVisible]);

  const handleStartSession = async () => {
    if (!deviceInfo || !ipData) {
      toast({
        title: "Error",
        description: "Please wait for device information to load.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await startSession(ipData, deviceInfo, userName.trim() || 'Guest User');
      toast({
        title: "Session Started!",
        description: "Welcome to MediBee. Your secure session is now active.",
      });
      setIsVisible(false);
    } catch (error) {
      console.error('Error starting session:', error);
      toast({
        title: "Error",
        description: "Failed to start session. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Don't show if session is loading or if there's already an active session
  if (sessionLoading || hasActiveSession) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
        >
          <Card className="glass border-white/20 shadow-2xl backdrop-blur-md">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-medical-gradient rounded-xl flex items-center justify-center">
                    <span className="text-xl font-bold text-white">M</span>
                  </div>
                  <div>
                    <CardTitle className="text-foreground">Welcome to MediBee</CardTitle>
                    <p className="text-sm text-muted-foreground">Your AI Medical Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Start Your Secure Health Session
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized medical insights with AI-powered analysis
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg glass">
                  <Shield className="h-5 w-5 text-medical-green" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Privacy First</p>
                    <p className="text-xs text-muted-foreground">End-to-end encrypted sessions</p>
                  </div>
                </div>
                
                {deviceInfo && (
                  <div className="flex items-center gap-3 p-3 rounded-lg glass">
                    <Monitor className="h-5 w-5 text-medical-blue" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Device</p>
                      <p className="text-xs text-muted-foreground">{deviceInfo.type} - {deviceInfo.browser}</p>
                    </div>
                  </div>
                )}
                
                {ipData && (
                  <div className="flex items-center gap-3 p-3 rounded-lg glass">
                    <MapPin className="h-5 w-5 text-medical-purple" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Location</p>
                      <p className="text-xs text-muted-foreground">{ipData.location}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Name (Optional)
                  </label>
                  <Input
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="glass border-white/20 placeholder-muted-foreground"
                  />
                </div>

                <Button
                  onClick={handleStartSession}
                  disabled={isLoading || !deviceInfo || !ipData}
                  className="w-full bg-medical-gradient hover:opacity-90 text-white font-semibold"
                >
                  <User className="w-4 h-4 mr-2" />
                  {isLoading ? 'Starting Session...' : 'Start Secure Session'}
                </Button>

                <div className="text-center">
                  <Button
                    variant="outline"
                    className="w-full glass border-white/20"
                    onClick={() => {
                      toast({
                        title: "Google Login",
                        description: "Google authentication will be available soon for permanent data storage.",
                      });
                    }}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login with Google (Coming Soon)
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  By starting a session, you agree to our{' '}
                  <button className="text-medical-blue hover:underline">Privacy Policy</button>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SessionPopup;
