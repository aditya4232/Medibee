
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Microscope, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DNABackground from '@/components/DNABackground';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Navigation from '@/components/Navigation';

const Analysis = () => {
  const [selectedReport, setSelectedReport] = useState('blood_test');

  const analysisResults = {
    blood_test: {
      title: 'Blood Test Analysis',
      date: '2024-01-15',
      status: 'completed',
      findings: [
        { type: 'normal', text: 'Hemoglobin levels within normal range (14.2 g/dL)' },
        { type: 'warning', text: 'Cholesterol slightly elevated (210 mg/dL)' },
        { type: 'normal', text: 'Blood sugar levels normal (95 mg/dL)' },
        { type: 'alert', text: 'Vitamin D deficiency detected (18 ng/mL)' }
      ],
      recommendations: [
        'Consider reducing saturated fat intake',
        'Increase vitamin D supplementation',
        'Regular cardiovascular exercise recommended'
      ]
    },
    xray: {
      title: 'X-Ray Analysis',
      date: '2024-01-10',
      status: 'completed',
      findings: [
        { type: 'normal', text: 'No fractures or abnormalities detected' },
        { type: 'normal', text: 'Bone density appears normal' },
        { type: 'warning', text: 'Minor joint space narrowing observed' }
      ],
      recommendations: [
        'Continue regular physical activity',
        'Consider joint health supplements',
        'Follow-up in 6 months if symptoms persist'
      ]
    }
  };

  const statusIcons = {
    normal: CheckCircle,
    warning: AlertTriangle,
    alert: AlertTriangle
  };

  const statusColors = {
    normal: 'text-medical-green',
    warning: 'text-medical-amber',
    alert: 'text-medical-red'
  };

  const currentAnalysis = analysisResults[selectedReport];

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
              Medical Analysis
            </h1>
            <p className="text-xl text-muted-foreground">
              AI-powered insights from your medical reports
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Report Selection */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Microscope className="h-5 w-5 text-medical-blue" />
                    Reports
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Object.entries(analysisResults).map(([key, report]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedReport(key)}
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        selectedReport === key
                          ? 'bg-medical-blue/20 border border-medical-blue/30'
                          : 'hover:bg-white/10'
                      }`}
                    >
                      <p className="font-medium text-foreground">{report.title}</p>
                      <p className="text-sm text-muted-foreground">{report.date}</p>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Analysis Results */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div className="space-y-6">
                {/* Analysis Header */}
                <Card className="glass border-white/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-foreground">{currentAnalysis.title}</CardTitle>
                        <p className="text-muted-foreground">Analyzed on {currentAnalysis.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-medical-green" />
                        <span className="text-sm font-medium text-medical-green">Analysis Complete</span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Findings */}
                <Card className="glass border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Brain className="h-5 w-5 text-medical-purple" />
                      AI Findings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentAnalysis.findings.map((finding, index) => {
                        const Icon = statusIcons[finding.type];
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className="flex items-start gap-3 p-3 rounded-lg glass"
                          >
                            <Icon className={`h-5 w-5 mt-0.5 ${statusColors[finding.type]} medical-glow`} />
                            <p className="text-foreground">{finding.text}</p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="glass border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <TrendingUp className="h-5 w-5 text-medical-green" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentAnalysis.recommendations.map((recommendation, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="flex items-start gap-3 p-3 rounded-lg glass"
                        >
                          <div className="w-2 h-2 bg-medical-blue rounded-full mt-2"></div>
                          <p className="text-foreground">{recommendation}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex gap-4"
                >
                  <Button className="bg-medical-gradient hover:opacity-90 text-white">
                    Download Report
                  </Button>
                  <Button variant="outline" className="glass border-white/20">
                    Share with Doctor
                  </Button>
                  <Button variant="outline" className="glass border-white/20">
                    Schedule Follow-up
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
