
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Search, Scan, FileText, Brain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession } from './SessionProvider';
import { useToast } from '@/hooks/use-toast';

const SessionActions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { addSearchQuery, addMedicalRecord } = useSession();
  const { toast } = useToast();

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await addSearchQuery(searchQuery);
      toast({
        title: "Search Added",
        description: `Searching for: ${searchQuery}`,
      });
      setSearchQuery('');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Simulate file processing
      setTimeout(async () => {
        const record = {
          type: 'uploaded_document',
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          uploadedAt: new Date().toISOString()
        };
        
        await addMedicalRecord(record);
        setIsUploading(false);
        
        toast({
          title: "File Uploaded",
          description: `${file.name} has been processed and saved.`,
        });
      }, 2000);
    }
  };

  const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return (
    <section className="relative z-10 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            What would you like to do today?
          </h2>
          <p className="text-lg text-muted-foreground">
            Upload medical documents, search for information, or get AI-powered insights
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass border-white/20 h-full">
              <CardContent className="p-6 text-center">
                <Search className="h-12 w-12 text-medical-blue mx-auto mb-4 medical-glow" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Search Medical Info</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get verified medical information with references
                </p>
                <div className="space-y-2">
                  <Input
                    placeholder="Search symptoms, medicines, conditions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="glass border-white/20"
                  />
                  <Button onClick={handleSearch} className="w-full bg-medical-blue hover:bg-blue-600 text-white">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass border-white/20 h-full">
              <CardContent className="p-6 text-center">
                <Upload className="h-12 w-12 text-medical-green mx-auto mb-4 medical-glow" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Upload Documents</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload prescriptions, lab reports, or medical images
                </p>
                <div className="space-y-2">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                  <Button
                    onClick={() => document.getElementById('file-upload')?.click()}
                    disabled={isUploading}
                    className="w-full bg-medical-green hover:bg-green-600 text-white"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {isUploading ? 'Processing...' : 'Upload File'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Scan (Mobile Only) */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass border-white/20 h-full">
                <CardContent className="p-6 text-center">
                  <Scan className="h-12 w-12 text-medical-purple mx-auto mb-4 medical-glow" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Scan Document</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Use your camera to scan medical documents
                  </p>
                  <Button className="w-full bg-medical-purple hover:bg-purple-600 text-white">
                    <Scan className="w-4 h-4 mr-2" />
                    Open Camera
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* AI Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isMobile ? 0.4 : 0.3 }}
            className={isMobile ? 'md:col-span-3' : 'md:col-span-1'}
          >
            <Card className="glass border-white/20 h-full">
              <CardContent className="p-6 text-center">
                <Brain className="h-12 w-12 text-medical-amber mx-auto mb-4 medical-glow" />
                <h3 className="text-lg font-semibold text-foreground mb-2">AI Analysis</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get AI-powered insights from your medical data
                </p>
                <Button className="w-full bg-medical-amber hover:bg-amber-600 text-white">
                  <Brain className="w-4 h-4 mr-2" />
                  Analyze Health Data
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SessionActions;
