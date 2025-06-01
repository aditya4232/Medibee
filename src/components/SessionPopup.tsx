
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, User, MapPin, Monitor, Shield, LogIn } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession } from './SessionProvider';
import { useToast } from '@/hooks/use-toast';
import { signInWithGoogle } from '@/lib/auth';

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
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [ipData, setIPData] = useState<IPData | null>(null);
  const { startSession, hasActiveSession, showSessionPopup, triggerSessionStart, isLoading: sessionLoading } = useSession();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize device and IP data on component mount
  useEffect(() => {
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

    const getIPData = async () => {
      try {
        // Use a CORS-friendly IP service or fallback to default data
        // For development, we'll use default data to avoid CORS issues
        setIPData({
          ip: '127.0.0.1',
          location: 'Local Development',
          country: 'India',
          city: 'Mumbai'
        });
      } catch (error) {
        console.log('Could not fetch IP data:', error);
        setIPData({
          ip: '127.0.0.1',
          location: 'Local Development',
          country: 'India',
          city: 'Mumbai'
        });
      }
    };

    getDeviceInfo();
    getIPData();
  }, []);



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

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      console.log('Starting Google login...');
      const userData = await signInWithGoogle();
      if (userData) {
        console.log('Google login successful:', userData);

        // Create a permanent session with Google user data
        const sessionData = {
          ...userData,
          isPermanentUser: true,
          googleUser: true
        };

        await startSession(
          ipData || { ip: '127.0.0.1', location: 'Local', country: 'India', city: 'Mumbai' },
          deviceInfo || { type: 'Desktop', browser: 'Chrome', os: 'Windows' },
          userData.displayName || userData.email
        );

        toast({
          title: "Google Login Successful!",
          description: `Welcome ${userData.displayName || userData.email}! Your data will be saved permanently.`,
        });

        // Redirect to dashboard after successful Google login
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast({
        title: "Login Failed",
        description: "Failed to login with Google. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Don't show if session is loading or if there's already an active session
  if (sessionLoading || hasActiveSession) return null;

  return (
    <AnimatePresence>
      {showSessionPopup && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => {}} // Backdrop click disabled for now
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
          >
          <Card className="glass border-white/20 shadow-2xl backdrop-blur-md">
            <CardHeader className="pb-4 text-center">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-medical-gradient rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-2xl font-bold text-white">M</span>
                </div>
                <div>
                  <CardTitle className="text-xl text-foreground">Welcome to MediBee</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Choose how you'd like to continue</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Features */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-lg glass">
                  <Shield className="h-4 w-4 text-medical-green" />
                  <div>
                    <p className="text-xs font-medium text-foreground">Privacy First</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg glass">
                  <Monitor className="h-4 w-4 text-medical-blue" />
                  <div>
                    <p className="text-xs font-medium text-foreground">Secure Session</p>
                  </div>
                </div>
              </div>

              {/* Google Login - Primary Option */}
              <div className="space-y-3">
                <Button
                  onClick={handleGoogleLogin}
                  disabled={isGoogleLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 text-sm shadow-lg"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  {isGoogleLoading ? 'Connecting...' : 'Continue with Google'}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Recommended • Permanent storage • Cross-device sync
                </p>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              {/* Guest Session */}
              <div className="space-y-3">
                <Input
                  placeholder="Enter your name (optional)"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="glass border-white/20 placeholder-muted-foreground"
                />

                <Button
                  onClick={handleStartSession}
                  disabled={isLoading || !deviceInfo || !ipData}
                  variant="outline"
                  className="w-full glass border-white/20 font-semibold py-3"
                >
                  <User className="w-4 h-4 mr-2" />
                  {isLoading ? 'Starting...' : 'Start Guest Session'}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Temporary • 7-hour limit • Local storage only
                </p>
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
