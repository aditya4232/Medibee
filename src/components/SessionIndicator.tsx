
import { motion } from 'framer-motion';
import { Clock, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSession } from './SessionProvider';
import { useToast } from '@/hooks/use-toast';

const SessionIndicator = () => {
  const { session, endSession, hasActiveSession } = useSession();
  const { toast } = useToast();

  if (!hasActiveSession || !session) return null;

  const handleEndSession = () => {
    endSession();
    toast({
      title: "Session Ended",
      description: "Your session has been terminated securely.",
    });
  };

  const sessionDuration = () => {
    const start = new Date(session.startTime);
    const now = new Date();
    const diff = Math.floor((now.getTime() - start.getTime()) / 1000 / 60);
    return `${diff}m`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-16 right-20 z-40"
    >
      <div className="flex items-center gap-2 glass px-3 py-2 rounded-lg border border-white/20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <div className="text-xs text-foreground">
            <div className="flex items-center gap-1">
              <User size={12} />
              <span className="max-w-16 truncate">{session.userData.userName || 'Guest'}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock size={10} />
          <span>{sessionDuration()}</span>
        </div>

        <Button
          onClick={handleEndSession}
          size="sm"
          variant="ghost"
          className="h-5 w-5 p-0 hover:bg-red-500/20 hover:text-red-500"
        >
          <LogOut size={10} />
        </Button>
      </div>
    </motion.div>
  );
};

export default SessionIndicator;
