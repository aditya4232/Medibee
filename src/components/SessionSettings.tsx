
import { motion } from 'framer-motion';
import { X, Share, LogOut, Clock, MapPin, Monitor, User, Activity, Search, FileText, Database, Download, Shield, Timer, Chrome } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useSession } from './SessionProvider';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { signInWithGoogle } from '@/lib/auth';

interface SessionSettingsProps {
  onClose: () => void;
}

const SessionSettings = ({ onClose }: SessionSettingsProps) => {
  const { session, endSession, shareSession, updateUserName } = useSession();
  const { toast } = useToast();
  const [newUserName, setNewUserName] = useState(session?.userData.userName || '');
  const [isConnectingGoogle, setIsConnectingGoogle] = useState(false);

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

  const handleUpdateUserName = async () => {
    if (newUserName.trim() && newUserName !== session?.userData.userName) {
      await updateUserName(newUserName.trim());
      toast({
        title: "Name Updated",
        description: "Your display name has been updated successfully.",
      });
    }
  };

  const handleExportData = () => {
    if (session) {
      const dataToExport = {
        sessionInfo: {
          sessionId: session.sessionId,
          startTime: session.startTime,
          location: session.location,
          deviceInfo: session.deviceInfo
        },
        userData: session.userData,
        activities: session.userActivities,
        visitedPages: session.visitedPages
      };

      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `medibee-session-${session.sessionId}.json`;
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Data Exported",
        description: "Your session data has been downloaded as JSON file.",
      });
    }
  };

  if (!session) return null;

  const handleConnectGoogle = async () => {
    setIsConnectingGoogle(true);
    try {
      const userData = await signInWithGoogle();
      if (userData) {
        toast({
          title: "Google Account Connected!",
          description: "Your data will now be saved permanently to your Google account.",
        });
        // Here you would merge session data with Google account
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect Google account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsConnectingGoogle(false);
    }
  };

  const sessionDuration = () => {
    const start = new Date(session.startTime);
    const now = new Date();
    const diff = Math.floor((now.getTime() - start.getTime()) / 1000 / 60);
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const getSessionTimeRemaining = () => {
    const start = new Date(session.startTime);
    const now = new Date();
    const elapsed = Math.floor((now.getTime() - start.getTime()) / 1000 / 60);
    const remaining = 420 - elapsed; // 7 hours = 420 minutes
    if (remaining <= 0) return "Session expired";
    const hours = Math.floor(remaining / 60);
    const minutes = remaining % 60;
    return hours > 0 ? `${hours}h ${minutes}m remaining` : `${minutes}m remaining`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="glass border-white/20 max-h-[85vh] overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                <User size={18} />
                Session Settings
              </CardTitle>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>
          </CardHeader>
          <CardContent className="overflow-y-auto max-h-[calc(85vh-80px)] pb-4">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="data">Medical Data</TabsTrigger>
                <TabsTrigger value="export">Export</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {/* Session Status Banner */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-medical-blue/20 to-medical-green/20 border border-medical-blue/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <h3 className="font-semibold text-foreground">Active Session</h3>
                        <p className="text-sm text-muted-foreground">{getSessionTimeRemaining()}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-700 dark:text-green-300">
                      <Timer className="w-3 h-3 mr-1" />
                      7h Max
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg glass">
                      <Clock className="h-5 w-5 text-medical-blue" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Session Duration</p>
                        <p className="text-sm text-muted-foreground">{sessionDuration()}</p>
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

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg glass">
                      <Activity className="h-5 w-5 text-medical-amber" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Total Activities</p>
                        <p className="text-sm text-muted-foreground">{session.userActivities?.length || 0}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg glass">
                      <FileText className="h-5 w-5 text-medical-red" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Medical Records</p>
                        <p className="text-sm text-muted-foreground">{session.userData.medicalRecords?.length || 0}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg glass">
                      <Search className="h-5 w-5 text-medical-blue" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Search Queries</p>
                        <p className="text-sm text-muted-foreground">{session.userData.searchHistory?.length || 0}</p>
                      </div>
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
              </TabsContent>

              <TabsContent value="profile" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Display Name
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        placeholder="Enter your name"
                        className="glass border-white/20"
                      />
                      <Button onClick={handleUpdateUserName}>
                        Update
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg glass">
                    <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Account Features
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Connect your Google account to save data permanently and access it from any device.
                      Your session will become permanent and won't expire.
                    </p>
                    <Button
                      onClick={handleConnectGoogle}
                      disabled={isConnectingGoogle}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                    >
                      <Chrome className="w-4 h-4 mr-2" />
                      {isConnectingGoogle ? 'Connecting...' : 'Connect Google Account'}
                    </Button>

                    <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <p className="text-xs text-amber-700 dark:text-amber-300">
                        <strong>Benefits:</strong> Permanent storage, cross-device sync, advanced AI features,
                        unlimited session time, and priority support.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {session.userActivities?.slice().reverse().map((activity, index) => (
                    <div key={index} className="p-3 rounded-lg glass">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-foreground capitalize">
                            {activity.action.replace(/_/g, ' ')}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.page} • {new Date(activity.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )) || (
                    <p className="text-center text-muted-foreground">No activities recorded yet</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="data" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg glass">
                    <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                      <FileText size={16} />
                      Medical Records ({session.userData.medicalRecords?.length || 0})
                    </h3>
                    <div className="max-h-32 overflow-y-auto">
                      {session.userData.medicalRecords?.length > 0 ? (
                        session.userData.medicalRecords.map((record, index) => (
                          <div key={index} className="text-sm text-muted-foreground mb-1">
                            Record #{index + 1}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No medical records yet</p>
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg glass">
                    <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                      <Search size={16} />
                      Search History ({session.userData.searchHistory?.length || 0})
                    </h3>
                    <div className="max-h-32 overflow-y-auto">
                      {session.userData.searchHistory?.length > 0 ? (
                        session.userData.searchHistory.slice(-5).map((query, index) => (
                          <div key={index} className="text-sm text-muted-foreground mb-1">
                            "{query}"
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No searches yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="export" className="space-y-4">
                <div className="p-4 rounded-lg glass text-center">
                  <Database className="mx-auto h-12 w-12 text-medical-blue mb-4" />
                  <h3 className="font-medium text-foreground mb-2">Export Your Data</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download all your session data including medical records, search history, and activity logs.
                  </p>
                  <Button onClick={handleExportData} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export Session Data (JSON)
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SessionSettings;
