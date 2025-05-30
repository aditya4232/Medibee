
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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
        description: "Welcome to MediBee. Redirecting to dashboard...",
      });
      setIsVisible(false);
      // Redirect to dashboard after successful session start
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
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
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsVisible(false)}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm px-4"
          >
          <Card className="glass border-white/20 shadow-2xl backdrop-blur-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-medical-gradient rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-white">M</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg text-foreground">Welcome to MediBee</CardTitle>
                    <p className="text-xs text-muted-foreground">Start your health session</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  <X size={18} />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Get AI-powered medical insights securely
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 rounded-lg glass">
                  <Shield className="h-4 w-4 text-medical-green" />
                  <div>
                    <p className="text-xs font-medium text-foreground">Privacy Protected</p>
                  </div>
                </div>

                {deviceInfo && ipData && (
                  <div className="flex items-center gap-2 p-2 rounded-lg glass">
                    <Monitor className="h-4 w-4 text-medical-blue" />
                    <div>
                      <p className="text-xs text-foreground">{deviceInfo.type} • {ipData.city}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div>
                  <Input
                    placeholder="Enter your name (optional)"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="glass border-white/20 placeholder-muted-foreground text-sm"
                  />
                </div>

                <Button
                  onClick={handleStartSession}
                  disabled={isLoading || !deviceInfo || !ipData}
                  className="w-full bg-medical-gradient hover:opacity-90 text-white font-semibold text-sm py-2"
                >
                  <User className="w-4 h-4 mr-2" />
                  {isLoading ? 'Starting...' : 'Start Session'}
                </Button>

                <Button
                  variant="outline"
                  className="w-full glass border-white/20 text-sm py-2"
                  onClick={() => {
                    toast({
                      title: "Google Login",
                      description: "Google authentication coming soon for permanent storage.",
                    });
                  }}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login with Google
                </Button>
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  By continuing, you agree to our{' '}
                  <button className="text-medical-blue hover:underline">Privacy Policy</button>
                </p>
              </div>
            </CardContent>
          </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SessionPopup;
