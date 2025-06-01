
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Brain, FileText, Camera, Scan, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DNABackground from '@/components/DNABackground';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Navigation from '@/components/Navigation';
import SessionIndicator from '@/components/SessionIndicator';
import { useSession } from '@/components/SessionProvider';

const Analysis = () => {
  const { trackActivity } = useSession();
  const [activeTab, setActiveTab] = useState('prescription');

  const handleAnalysisStart = (type: string) => {
    trackActivity('analysis_started', { type });
    // TODO: Implement actual analysis logic
    console.log(`Starting ${type} analysis`);
  };

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
            <h1 className="text-4xl font-bold text-foreground mb-4">
              AI Medical Analysis
            </h1>
            <p className="text-xl text-muted-foreground">
              Upload medical documents for intelligent analysis and insights
            </p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 glass border-white/20">
              <TabsTrigger value="prescription">Prescription Analysis</TabsTrigger>
              <TabsTrigger value="reports">Medical Reports</TabsTrigger>
              <TabsTrigger value="symptoms">Symptom Checker</TabsTrigger>
            </TabsList>

            <TabsContent value="prescription" className="space-y-6">
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-6 h-6 text-medical-blue" />
                    Prescription & Medicine Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center hover:border-medical-blue/50 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">Upload Prescription</h3>
                      <p className="text-muted-foreground mb-4">
                        Upload a photo of your prescription for AI analysis
                      </p>
                      <Button 
                        onClick={() => handleAnalysisStart('prescription')}
                        className="bg-medical-gradient hover:opacity-90 text-white"
                      >
                        Choose File
                      </Button>
                    </div>

                    <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center hover:border-medical-green/50 transition-colors cursor-pointer">
                      <Scan className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">Medicine Box Scan</h3>
                      <p className="text-muted-foreground mb-4">
                        Scan medicine packaging for detailed information
                      </p>
                      <Button 
                        onClick={() => handleAnalysisStart('medicine_box')}
                        variant="outline" 
                        className="glass border-white/20"
                      >
                        Scan Now
                      </Button>
                    </div>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                          Medical Disclaimer
                        </h4>
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                          AI analysis is for informational purposes only. Always consult with healthcare professionals for medical decisions.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-6 h-6 text-medical-green" />
                    Medical Report Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-12 text-center">
                    <Brain className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">Upload Medical Reports</h3>
                    <p className="text-muted-foreground mb-6">
                      Upload blood tests, X-rays, or other medical documents for AI interpretation
                    </p>
                    <Button 
                      onClick={() => handleAnalysisStart('medical_report')}
                      className="bg-medical-gradient hover:opacity-90 text-white"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="symptoms" className="space-y-6">
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-6 h-6 text-medical-purple" />
                    AI Symptom Checker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Brain className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                    <p className="text-muted-foreground mb-6">
                      AI-powered symptom checker will be available in the next update
                    </p>
                    <Button variant="outline" className="glass border-white/20" disabled>
                      Check Symptoms
                    </Button>
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

export default Analysis;
