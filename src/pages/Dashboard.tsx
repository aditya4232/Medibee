
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Activity, Heart, Brain, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DNABackground from '@/components/DNABackground';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Navigation from '@/components/Navigation';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('medibee_user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const healthMetrics = [
    {
      title: 'Heart Rate',
      value: '72 BPM',
      status: 'green',
      icon: Heart,
      change: '+2%'
    },
    {
      title: 'Blood Pressure',
      value: '120/80',
      status: 'green',
      icon: Activity,
      change: '-1%'
    },
    {
      title: 'BMI',
      value: '23.5',
      status: 'yellow',
      icon: TrendingUp,
      change: '+0.5%'
    },
    {
      title: 'Stress Level',
      value: 'Low',
      status: 'green',
      icon: Brain,
      change: '-5%'
    }
  ];

  const statusColors = {
    green: 'text-medical-green',
    yellow: 'text-medical-amber',
    red: 'text-medical-red'
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
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Health Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Welcome back, {userData?.email?.split('@')[0] || 'User'}! Here's your health overview.
            </p>
          </motion.div>

          {/* Health Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {healthMetrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="glass border-white/20 hover:shadow-neon-blue transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <metric.icon className={`h-8 w-8 ${statusColors[metric.status]} medical-glow`} />
                      <span className={`text-sm font-medium ${statusColors[metric.status]}`}>
                        {metric.change}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      {metric.title}
                    </h3>
                    <p className="text-2xl font-bold text-foreground">
                      {metric.value}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Upload className="h-5 w-5 text-medical-blue" />
                    Upload Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-medical-blue transition-colors">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag & drop your medical reports here
                    </p>
                    <Button className="bg-medical-blue hover:bg-blue-600 text-white">
                      Choose Files
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Calendar className="h-5 w-5 text-medical-green" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-medical-blue rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Blood test uploaded</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-medical-green rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Health metrics updated</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-medical-purple rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Consultation scheduled</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="text-foreground">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-medical-gradient hover:opacity-90 text-white">
                    <Brain className="h-4 w-4 mr-2" />
                    AI Health Analysis
                  </Button>
                  <Button variant="outline" className="w-full justify-start glass border-white/20">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Checkup
                  </Button>
                  <Button variant="outline" className="w-full justify-start glass border-white/20">
                    <Activity className="h-4 w-4 mr-2" />
                    View Trends
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
