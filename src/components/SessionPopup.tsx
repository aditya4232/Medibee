
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Shield, Monitor, LogIn } from 'lucide-react';
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
      const userData = await signInWithGoogle();
      if (userData) {
        await startSession(
          ipData || { ip: '127.0.0.1', location: 'Local', country: 'India', city: 'Mumbai' },
          deviceInfo || { type: 'Desktop', browser: 'Chrome', os: 'Windows' },
          userData.displayName || userData.email
        );

        toast({
          title: "Google Login Successful!",
          description: `Welcome ${userData.displayName || userData.email}!`,
        });

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

  if (sessionLoading || hasActiveSession) return null;

  return (
    <AnimatePresence>
      {showSessionPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-sm"
          >
            <Card className="bg-white/95 dark:bg-slate-900/95 border-white/20 shadow-2xl">
              <CardHeader className="pb-3 text-center">
                <div className="space-y-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-sm font-bold text-white">M</span>
                  </div>
                  <div>
                    <CardTitle className="text-base text-foreground">Welcome to MediBee</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">Choose how to continue</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                    <Shield className="h-3 w-3 text-green-500" />
                    <div>
                      <p className="text-xs font-medium text-foreground">Privacy First</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                    <Monitor className="h-3 w-3 text-blue-500" />
                    <div>
                      <p className="text-xs font-medium text-foreground">Secure Session</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={handleGoogleLogin}
                    disabled={isGoogleLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 text-sm shadow-lg"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    {isGoogleLoading ? 'Connecting...' : 'Continue with Google'}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Recommended • Permanent storage • Cross-device sync
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Input
                    placeholder="Enter your name (optional)"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-white/5 border-white/20 placeholder-muted-foreground text-sm"
                  />

                  <Button
                    onClick={handleStartSession}
                    disabled={isLoading || !deviceInfo || !ipData}
                    variant="outline"
                    className="w-full bg-white/5 border-white/20 font-semibold py-2 text-sm"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {isLoading ? 'Starting...' : 'Start Guest Session'}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Temporary • 7-hour limit • Local storage only
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SessionPopup;
