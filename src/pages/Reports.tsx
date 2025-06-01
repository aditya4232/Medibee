
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Calendar, Filter, Search, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DNABackground from '@/components/DNABackground';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Navigation from '@/components/Navigation';
import SessionIndicator from '@/components/SessionIndicator';
import { useSession } from '@/components/SessionProvider';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
  const { session, trackActivity } = useSession();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const medicalRecords = session?.userData?.medicalRecords || [];
  
  const handleNewReport = () => {
    trackActivity('new_report_clicked');
    navigate('/analysis');
  };

  const mockReports = [
    {
      id: 1,
      title: 'Blood Test Results',
      date: '2024-05-15',
      type: 'Laboratory',
      status: 'Normal',
      size: '2.4 MB'
    },
    {
      id: 2,
      title: 'Chest X-Ray Report',
      date: '2024-05-10',
      type: 'Imaging',
      status: 'Reviewed',
      size: '1.8 MB'
    },
    {
      id: 3,
      title: 'Prescription Analysis',
      date: '2024-05-08',
      type: 'Prescription',
      status: 'Analyzed',
      size: '0.5 MB'
    }
  ];

  const reports = medicalRecords.length > 0 ? medicalRecords : mockReports;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <DNABackground />
      <ThemeSwitcher />
      <Navigation />
      <SessionIndicator />

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
                  Medical Reports
                </h1>
                <p className="text-xl text-muted-foreground">
                  View and manage your medical documents and analysis results
                </p>
              </div>
              <Button
                onClick={handleNewReport}
                className="bg-medical-gradient hover:opacity-90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Analysis
              </Button>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <Card className="glass border-white/20 mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 glass border-white/20"
                  />
                </div>
                <Button variant="outline" className="glass border-white/20">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="glass border-white/20">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date Range
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="glass border-white/20">
              <TabsTrigger value="all">All Reports ({reports.length})</TabsTrigger>
              <TabsTrigger value="laboratory">Laboratory</TabsTrigger>
              <TabsTrigger value="imaging">Imaging</TabsTrigger>
              <TabsTrigger value="prescription">Prescriptions</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {reports.length === 0 ? (
                <Card className="glass border-white/20">
                  <CardContent className="p-12 text-center">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No Reports Yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Upload your first medical document to get started with AI analysis
                    </p>
                    <Button
                      onClick={handleNewReport}
                      className="bg-medical-gradient hover:opacity-90 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Upload First Report
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {reports.map((report: any) => (
                    <Card key={report.id} className="glass border-white/20 hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-medical-blue/20 rounded-lg flex items-center justify-center">
                              <FileText className="w-6 h-6 text-medical-blue" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{report.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{report.type}</span>
                                <span>•</span>
                                <span>{report.date}</span>
                                <span>•</span>
                                <span>{report.size}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              report.status === 'Normal' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                              report.status === 'Reviewed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                              'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                            }`}>
                              {report.status}
                            </span>
                            <Button size="sm" variant="outline" className="glass border-white/20">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="glass border-white/20">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="laboratory">
              <Card className="glass border-white/20">
                <CardContent className="p-12 text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No Laboratory Reports</h3>
                  <p className="text-muted-foreground">
                    Upload blood tests, urine analysis, or other lab reports
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="imaging">
              <Card className="glass border-white/20">
                <CardContent className="p-12 text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No Imaging Reports</h3>
                  <p className="text-muted-foreground">
                    Upload X-rays, MRI, CT scans, or ultrasound reports
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prescription">
              <Card className="glass border-white/20">
                <CardContent className="p-12 text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No Prescription Analysis</h3>
                  <p className="text-muted-foreground">
                    Upload prescriptions for AI-powered medicine analysis
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Reports;
