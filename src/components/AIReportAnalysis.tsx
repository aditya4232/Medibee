import { useState, useCallback } from 'react';
import { Upload, FileText, Brain, AlertTriangle, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useSession } from './SessionProvider';
import { aiEngine, type AIResponse } from '@/lib/aiEngine';
import { documentProcessor, type ProcessedDocument } from '@/lib/documentProcessor';

interface AnalysisResult {
  reportType: string;
  keyFindings: string[];
  normalValues: string[];
  abnormalValues: string[];
  recommendations: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
  summary: string;
  nextSteps: string[];
}

const AIReportAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [processedDocument, setProcessedDocument] = useState<ProcessedDocument | null>(null);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { addMedicalRecord, triggerSessionStart, hasActiveSession } = useSession();

  // Enhanced AI-powered report analysis with document processing
  const analyzeReport = async (file: File): Promise<void> => {
    try {
      // Step 1: Process document with enhanced OCR and entity extraction
      console.log('Processing document...');
      const processed = await documentProcessor.processDocument(file);
      setProcessedDocument(processed);

      // Step 2: Use AI engine for enhanced analysis
      console.log('Analyzing with AI...');
      const response = await aiEngine.analyzeReport(processed.extractedText, processed.structuredData.reportType);
      setAiResponse(response);

      if (response.success) {
        setError(null);

        // Save comprehensive analysis to medical records
        if (hasActiveSession) {
          await addMedicalRecord({
            type: 'enhanced_ai_analysis',
            fileName: file.name,
            reportType: processed.structuredData.reportType,
            processedDocument: processed,
            aiResponse: response,
            uploadDate: new Date().toISOString(),
            confidence: processed.confidence,
            extractedEntities: processed.entities.length,
            structuredData: processed.structuredData
          });
        }

        toast({
          title: "Enhanced Analysis Complete",
          description: `Document processed with ${Math.round(processed.confidence * 100)}% confidence. AI analysis complete.`,
        });
      } else {
        setError(response.error || 'AI analysis failed');
      }
    } catch (err) {
      setError('Failed to analyze report. Please try again.');
      console.error('Enhanced report analysis error:', err);
    }
  };



  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF or image file (JPG, PNG).",
          variant: "destructive"
        });
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive"
        });
        return;
      }

      setSelectedFile(file);
      setError(null);
      setAiResponse(null);
      setProcessedDocument(null);
    }
  }, [toast]);

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    // Trigger session start if no active session
    if (!hasActiveSession) {
      triggerSessionStart();
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAiResponse(null);
    setProcessedDocument(null);

    await analyzeReport(selectedFile);
    setIsAnalyzing(false);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-500/20 text-green-700 dark:text-green-300';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300';
      case 'High': return 'bg-red-500/20 text-red-700 dark:text-red-300';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="glass border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-medical-purple" />
            AI Medical Report Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* File Upload */}
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-foreground">Upload Medical Report</h3>
                <p className="text-sm text-muted-foreground">
                  Upload blood test, X-ray, MRI, or any medical report (PDF, JPG, PNG)
                </p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="report-upload"
                />
                <label htmlFor="report-upload">
                  <Button variant="outline" className="glass border-white/20" asChild>
                    <span>Choose File</span>
                  </Button>
                </label>
              </div>
            </div>

            {/* Selected File */}
            {selectedFile && (
              <div className="flex items-center justify-between p-3 rounded-lg glass border border-white/10">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-medical-blue" />
                  <div>
                    <p className="font-medium text-foreground">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="bg-medical-gradient hover:opacity-90 text-white"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Analyze with AI
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Disclaimer */}
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-amber-700 dark:text-amber-300">
                  <strong>AI Analysis Disclaimer:</strong> This AI analysis is for informational purposes only
                  and should not replace professional medical consultation. Always discuss results with your healthcare provider.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis in Progress */}
      {isAnalyzing && (
        <Card className="glass border-white/20">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <Loader2 className="w-12 h-12 animate-spin mx-auto text-medical-purple" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">AI Analysis in Progress</h3>
                <p className="text-muted-foreground">Processing your medical report...</p>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>🔍 Extracting text and data from report</p>
                <p>🧠 Analyzing values with AI algorithms</p>
                <p>📊 Comparing with normal reference ranges</p>
                <p>💡 Generating insights and recommendations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Data State */}
      {error && (
        <Card className="glass border-white/20">
          <CardContent className="p-8 text-center">
            <XCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Analysis Not Available</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Coming Soon:</strong> Real-time AI analysis powered by advanced machine learning algorithms.
                The system will analyze blood tests, X-rays, MRIs, and other medical reports to provide instant insights.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Document Processing Results */}
      {processedDocument && (
        <div className="space-y-4">
          {/* Document Processing Info */}
          <Card className="glass border-white/20 border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Document Processed
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {Math.round(processedDocument.confidence * 100)}% Confidence
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Processing Time: {processedDocument.metadata.processingTime}ms</p>
                <p>Entities Extracted: {processedDocument.entities.length}</p>
                <p>Report Type: {processedDocument.structuredData.reportType}</p>
              </div>
            </CardContent>
          </Card>

          {/* Structured Data */}
          {processedDocument.structuredData.labResults.length > 0 && (
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Lab Results Extracted
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {processedDocument.structuredData.labResults.map((result, index) => (
                    <div key={index} className="p-3 rounded-lg glass border border-white/10">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-foreground">{result.testName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {result.value} {result.unit}
                            {result.referenceRange && ` (Normal: ${result.referenceRange})`}
                          </p>
                        </div>
                        <Badge
                          variant={result.status === 'normal' ? 'default' : 'destructive'}
                          className={result.status === 'normal' ? 'bg-green-500/20 text-green-700' : ''}
                        >
                          {result.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Medications Extracted */}
          {processedDocument.structuredData.medications.length > 0 && (
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  Medications Extracted
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {processedDocument.structuredData.medications.map((med, index) => (
                    <div key={index} className="p-2 rounded-lg glass border border-white/10">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium text-foreground">{med.name}</span>
                          {med.dosage && <span className="text-sm text-muted-foreground ml-2">{med.dosage}</span>}
                          {med.frequency && <span className="text-sm text-muted-foreground ml-2">({med.frequency})</span>}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {Math.round(med.confidence * 100)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* AI Analysis Results */}
      {aiResponse && aiResponse.success && (
        <div className="space-y-4">
          {/* AI Response Info */}
          <Card className="glass border-white/20 border-green-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    Enhanced AI Analysis Complete
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {Math.round(aiResponse.confidence * 100)}% Confidence
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Sources: {aiResponse.sources.join(', ')}
              </p>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                AI Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg glass">
                  <h4 className="font-medium text-foreground mb-2">Enhanced AI Analysis</h4>
                  <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {typeof aiResponse.data === 'string' ? aiResponse.data : JSON.stringify(aiResponse.data, null, 2)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Disclaimer */}
          <Card className="glass border-white/20 border-amber-500/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-amber-700 dark:text-amber-300">
                  <strong>Enhanced AI Analysis Disclaimer:</strong> {aiResponse.disclaimer}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AIReportAnalysis;
