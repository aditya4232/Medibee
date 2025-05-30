
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Activity, Heart, Brain, Calendar, TrendingUp, FileText, Search, Plus, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DNABackground from '@/components/DNABackground';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Navigation from '@/components/Navigation';
import MedicineSearch from '@/components/MedicineSearch';
import AIReportAnalysis from '@/components/AIReportAnalysis';
import UserProfile from '@/components/UserProfile';
import { useSession } from '@/components/SessionProvider';

const Dashboard = () => {
  const { session } = useSession();
  const [activeTab, setActiveTab] = useState('overview');

  // Get real data from session or show null state
  const medicalRecords = session?.userData?.medicalRecords || [];
  const searchHistory = session?.userData?.searchHistory || [];
  const userName = session?.userData?.userName || 'User';

  // Only show real health metrics if user has uploaded data
  const hasHealthData = medicalRecords.length > 0;

  const getSessionDuration = () => {
    if (!session) return '0m';
    const start = new Date(session.startTime);
    const now = new Date();
    const diff = Math.floor((now.getTime() - start.getTime()) / 1000 / 60);
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <DNABackground />
      <ThemeSwitcher />
      <Navigation />

      <div className="relative z-10 pt-24 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Health Dashboard
                </h1>
                <p className="text-xl text-muted-foreground">
                  Welcome back, {userName}! Session active for {getSessionDuration()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Session ID</p>
                <p className="text-xs font-mono text-foreground">{session?.sessionId?.slice(-8)}</p>
              </div>
            </div>
          </motion.div>

          {/* Main Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 glass border-white/20">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="reports">AI Analysis</TabsTrigger>
              <TabsTrigger value="medicine">Medicine Search</TabsTrigger>
              <TabsTrigger value="data">My Data</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {!hasHealthData ? (
                <Card className="glass border-white/20">
                  <CardContent className="p-8 text-center">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No Health Data Available</h3>
                    <p className="text-muted-foreground mb-6">
                      Start by setting up your profile and then upload medical reports or search for medicines to get personalized insights.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      <Button
                        onClick={() => setActiveTab('profile')}
                        className="bg-medical-gradient hover:opacity-90 text-white"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Setup Profile
                      </Button>
                      <Button
                        onClick={() => setActiveTab('reports')}
                        variant="outline"
                        className="glass border-white/20"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Reports
                      </Button>
                      <Button
                        onClick={() => setActiveTab('medicine')}
                        variant="outline"
                        className="glass border-white/20"
                      >
                        <Search className="w-4 h-4 mr-2" />
                        Search Medicine
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Real health data would be displayed here */}
                  <Card className="glass border-white/20">
                    <CardHeader>
                      <CardTitle>Health Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Based on your uploaded reports</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <UserProfile />
            </TabsContent>

            {/* AI Report Analysis Tab */}
            <TabsContent value="reports">
              <AIReportAnalysis />
            </TabsContent>

            {/* Medicine Search Tab */}
            <TabsContent value="medicine">
              <MedicineSearch />
            </TabsContent>

            {/* My Data Tab */}
            <TabsContent value="data" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Medical Records */}
                <Card className="glass border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-medical-blue" />
                      Medical Records ({medicalRecords.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {medicalRecords.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">No medical records uploaded yet</p>
                        <Button
                          onClick={() => setActiveTab('reports')}
                          className="mt-4 bg-medical-gradient hover:opacity-90 text-white"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Upload First Report
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {medicalRecords.slice(0, 5).map((record: any, index: number) => (
                          <div key={index} className="p-3 rounded-lg glass border border-white/10">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-foreground">{record.type || 'Medical Record'}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(record.timestamp).toLocaleDateString()}
                                </p>
                              </div>
                              <Button size="sm" variant="outline" className="glass border-white/20">
                                View
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Search History */}
                <Card className="glass border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="w-5 h-5 text-medical-green" />
                      Search History ({searchHistory.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {searchHistory.length === 0 ? (
                      <div className="text-center py-8">
                        <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">No searches performed yet</p>
                        <Button
                          onClick={() => setActiveTab('medicine')}
                          className="mt-4 bg-medical-gradient hover:opacity-90 text-white"
                        >
                          <Search className="w-4 h-4 mr-2" />
                          Search Medicine
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {searchHistory.slice(0, 10).map((query: string, index: number) => (
                          <div key={index} className="p-2 rounded-lg glass border border-white/10">
                            <p className="text-sm text-foreground">{query}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Session Information */}
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-medical-purple" />
                    Session Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 rounded-lg glass">
                      <p className="text-sm text-muted-foreground">Session Duration</p>
                      <p className="font-medium text-foreground">{getSessionDuration()}</p>
                    </div>
                    <div className="p-3 rounded-lg glass">
                      <p className="text-sm text-muted-foreground">Pages Visited</p>
                      <p className="font-medium text-foreground">{session?.visitedPages?.length || 0}</p>
                    </div>
                    <div className="p-3 rounded-lg glass">
                      <p className="text-sm text-muted-foreground">Activities</p>
                      <p className="font-medium text-foreground">{session?.userActivities?.length || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
