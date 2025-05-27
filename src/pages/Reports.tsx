
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Calendar, Search, Upload, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DNABackground from '@/components/DNABackground';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Navigation from '@/components/Navigation';
import { useSession } from '@/components/SessionProvider';

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { session, hasActiveSession } = useSession();
  const [filteredReports, setFilteredReports] = useState([]);

  useEffect(() => {
    if (session?.userData?.medicalRecords) {
      const filtered = session.userData.medicalRecords.filter(record => 
        record.fileName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.type?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredReports(filtered);
    }
  }, [session, searchTerm]);

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'uploaded_document': return FileText;
      case 'lab_report': return Brain;
      case 'prescription': return FileText;
      default: return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'analyzed': return 'text-medical-green bg-medical-green/20';
      case 'processing': return 'text-medical-amber bg-medical-amber/20';
      default: return 'text-medical-blue bg-medical-blue/20';
    }
  };

  if (!hasActiveSession) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <DNABackground />
        <ThemeSwitcher />
        <Navigation />
        
        <div className="relative z-10 pt-24 px-4 pb-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-12 rounded-3xl"
            >
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Start a Session to View Reports</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Begin your medical journey to upload and analyze your health documents
              </p>
              <Button 
                onClick={() => window.location.href = '/'}
                className="bg-medical-gradient text-white px-8 py-3"
              >
                Start Session
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

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
              Medical Reports
            </h1>
            <p className="text-xl text-muted-foreground">
              View and manage your uploaded medical documents
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card className="glass border-white/20">
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search your medical reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 glass border-white/20"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Reports */}
          {filteredReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report, index) => {
                const Icon = getReportIcon(report.type);
                return (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="glass border-white/20 hover:shadow-neon-blue transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <Icon className="h-8 w-8 text-medical-blue medical-glow" />
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor('analyzed')}`}>
                            analyzed
                          </div>
                        </div>
                        <CardTitle className="text-lg text-foreground">{report.fileName}</CardTitle>
                        <p className="text-sm text-muted-foreground">{report.type}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">
                              {new Date(report.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">
                              {(report.fileSize / 1024 / 1024).toFixed(1)} MB
                            </span>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button size="sm" className="bg-medical-blue hover:bg-blue-600 text-white flex-1">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline" className="glass border-white/20">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-12"
            >
              <Card className="glass border-white/20 max-w-md mx-auto">
                <CardContent className="p-12">
                  <Upload className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No Reports Found</h3>
                  <p className="text-muted-foreground mb-6">
                    Start by uploading your first medical document
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/'}
                    className="bg-medical-gradient text-white"
                  >
                    Upload Document
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
