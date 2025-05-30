
import { motion } from 'framer-motion';
import { X, Share, LogOut, Clock, MapPin, Monitor } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSession } from './SessionProvider';
import { useToast } from '@/hooks/use-toast';

interface SessionSettingsProps {
  onClose: () => void;
}

const SessionSettings = ({ onClose }: SessionSettingsProps) => {
  const { session, endSession, shareSession } = useSession();
  const { toast } = useToast();

  const handleShareSession = () => {
    const link = shareSession();
    toast({
      title: "Session Link Copied!",
      description: "Share this link to resume your session on another device.",
    });
  };

  const handleEndSession = () => {
    endSession();
    onClose();
    toast({
      title: "Session Ended",
      description: "Your session has been terminated securely.",
    });
  };

  if (!session) return null;

  return (
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
      >
        <Card className="glass border-white/20 max-w-md w-full">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Session Settings</CardTitle>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg glass">
                <Clock className="h-5 w-5 text-medical-blue" />
                <div>
                  <p className="text-sm font-medium text-foreground">Session Started</p>
                  <p className="text-sm text-muted-foreground">{new Date(session.startTime).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg glass">
                <MapPin className="h-5 w-5 text-medical-green" />
                <div>
                  <p className="text-sm font-medium text-foreground">Location</p>
                  <p className="text-sm text-muted-foreground">{session.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg glass">
                <Monitor className="h-5 w-5 text-medical-purple" />
                <div>
                  <p className="text-sm font-medium text-foreground">Device</p>
                  <p className="text-sm text-muted-foreground">{session.deviceInfo}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                onClick={handleShareSession}
                className="w-full bg-medical-blue hover:bg-blue-600 text-white"
              >
                <Share className="w-4 h-4 mr-2" />
                Share Session Link
              </Button>
              
              <Button
                onClick={handleEndSession}
                variant="destructive"
                className="w-full"
              >
                <LogOut className="w-4 h-4 mr-2" />
                End Session
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SessionSettings;
