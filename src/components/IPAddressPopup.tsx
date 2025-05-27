import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Globe, Clock, Monitor, Smartphone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSession } from './SessionProvider';

const IPAddressPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ipData, setIpData] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const { startSession } = useSession();

  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad|Android/i.test(userAgent) && !/Mobile/i.test(userAgent);
    
    let deviceType = 'Desktop';
    if (isMobile) deviceType = 'Mobile';
    if (isTablet) deviceType = 'Tablet';

    const browserInfo = userAgent.includes('Chrome') ? 'Chrome' : 
                       userAgent.includes('Firefox') ? 'Firefox' : 
                       userAgent.includes('Safari') ? 'Safari' : 'Unknown';

    return {
      type: deviceType,
      browser: browserInfo,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  };

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('medibee_session_id');
    if (!hasSeenPopup) {
      const deviceData = getDeviceInfo();
      setDeviceInfo(deviceData);
      
      // Simulate IP detection (in real app, use a service like ipapi.co)
      setTimeout(() => {
        setIpData({
          ip: '192.168.1.100',
          location: 'Mumbai, Maharashtra, India',
          timestamp: new Date().toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            dateStyle: 'full',
            timeStyle: 'medium'
          }),
          isp: 'Jio Fiber',
          coordinates: '19.0760° N, 72.8777° E'
        });
        setIsVisible(true);
      }, 2000);
    }
  }, []);

  const handleAccept = async () => {
    await startSession(ipData, deviceInfo);
    setIsVisible(false);
  };

  const handleDecline = () => {
    setIsVisible(false);
  };

  if (!ipData || !deviceInfo) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            <Card className="glass border-white/30 max-w-lg w-full shadow-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-medical-gradient rounded-xl flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-foreground text-xl">Start Secure Session</CardTitle>
                      <p className="text-sm text-muted-foreground">Begin your medical journey</p>
                    </div>
                  </div>
                  <button
                    onClick={handleDecline}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Welcome to MediBee! 🐝</h3>
                  <p className="text-muted-foreground text-sm">
                    Start a secure session to access personalized medical assistance and store your health data.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl glass border border-white/20">
                    <Globe className="h-5 w-5 text-medical-blue flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">IP Address</p>
                      <p className="text-sm text-muted-foreground truncate">{ipData.ip}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-xl glass border border-white/20">
                    <MapPin className="h-5 w-5 text-medical-green flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">{ipData.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-xl glass border border-white/20">
                    {deviceInfo.type === 'Mobile' ? <Smartphone className="h-5 w-5 text-medical-purple flex-shrink-0" /> : <Monitor className="h-5 w-5 text-medical-purple flex-shrink-0" />}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">Device</p>
                      <p className="text-sm text-muted-foreground">{deviceInfo.type} - {deviceInfo.browser}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-xl glass border border-white/20">
                    <Clock className="h-5 w-5 text-medical-amber flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">Session Time</p>
                      <p className="text-sm text-muted-foreground">{ipData.timestamp}</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-medical-blue" />
                    <span className="font-semibold">What happens when you start a session?</span>
                  </div>
                  <ul className="space-y-1 ml-6">
                    <li>• Access to medical record upload & analysis</li>
                    <li>• Personalized health insights & recommendations</li>
                    <li>• Secure data storage with Firebase</li>
                    <li>• Search medical information & get references</li>
                    <li>• Generate and download medical reports</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleAccept}
                    className="flex-1 bg-medical-gradient hover:opacity-90 text-white font-semibold py-3"
                  >
                    Start Medical Session
                  </Button>
                  <Button
                    onClick={handleDecline}
                    variant="outline"
                    className="flex-1 glass border-white/30 hover:bg-white/10 py-3"
                  >
                    Browse Only
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
