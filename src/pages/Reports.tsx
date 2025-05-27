
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Calendar, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DNABackground from '@/components/DNABackground';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Navigation from '@/components/Navigation';

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const reports = [
    {
      id: 1,
      title: 'Complete Blood Count',
      type: 'Blood Test',
      date: '2024-01-15',
      status: 'analyzed',
      size: '2.3 MB',
      doctor: 'Dr. Sarah Johnson'
    },
    {
      id: 2,
      title: 'Chest X-Ray',
      type: 'Imaging',
      date: '2024-01-10',
      status: 'analyzed',
      size: '15.7 MB',
      doctor: 'Dr. Michael Chen'
    },
    {
      id: 3,
      title: 'Lipid Profile',
      type: 'Blood Test',
      date: '2024-01-05',
      status: 'pending',
      size: '1.8 MB',
      doctor: 'Dr. Sarah Johnson'
    },
    {
      id: 4,
      title: 'ECG Report',
      type: 'Cardiology',
      date: '2023-12-28',
      status: 'analyzed',
      size: '850 KB',
      doctor: 'Dr. Robert Wilson'
    },
    {
      id: 5,
      title: 'MRI Brain Scan',
      type: 'Imaging',
      date: '2023-12-20',
      status: 'analyzed',
      size: '42.1 MB',
      doctor: 'Dr. Emily Davis'
    }
  ];

  const statusColors = {
    analyzed: 'text-medical-green',
    pending: 'text-medical-amber',
    reviewing: 'text-medical-blue'
  };

  const statusBg = {
    analyzed: 'bg-medical-green/20',
    pending: 'bg-medical-amber/20',
    reviewing: 'bg-medical-blue/20'
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || report.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesFilter;
  });

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
              View and manage all your medical documents
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card className="glass border-white/20">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reports, doctors, or types..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 glass border-white/20"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={filterType === 'all' ? 'default' : 'outline'}
                      onClick={() => setFilterType('all')}
                      className={filterType === 'all' ? 'bg-medical-blue text-white' : 'glass border-white/20'}
                    >
                      All
                    </Button>
                    <Button
                      variant={filterType === 'blood' ? 'default' : 'outline'}
                      onClick={() => setFilterType('blood')}
                      className={filterType === 'blood' ? 'bg-medical-blue text-white' : 'glass border-white/20'}
                    >
                      Blood Tests
                    </Button>
                    <Button
                      variant={filterType === 'imaging' ? 'default' : 'outline'}
                      onClick={() => setFilterType('imaging')}
                      className={filterType === 'imaging' ? 'bg-medical-blue text-white' : 'glass border-white/20'}
                    >
                      Imaging
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report, index) => (
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
                      <FileText className="h-8 w-8 text-medical-blue medical-glow" />
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusBg[report.status]} ${statusColors[report.status]}`}>
                        {report.status}
                      </div>
                    </div>
                    <CardTitle className="text-lg text-foreground">{report.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{report.type}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{report.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{report.size}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        by {report.doctor}
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
            ))}
          </div>

          {filteredReports.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-12"
            >
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No reports found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
