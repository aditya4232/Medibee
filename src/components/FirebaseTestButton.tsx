import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { runFirebaseTests } from '@/utils/firebaseTest';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const FirebaseTestButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  const handleTest = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      await runFirebaseTests();
      setTestResult('success');
    } catch (error) {
      console.error('Firebase test failed:', error);
      setTestResult('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {testResult && (
        <Badge 
          variant={testResult === 'success' ? 'default' : 'destructive'}
          className="flex items-center gap-1"
        >
          {testResult === 'success' ? (
            <>
              <CheckCircle size={14} />
              Firebase Connected
            </>
          ) : (
            <>
              <XCircle size={14} />
              Firebase Error
            </>
          )}
        </Badge>
      )}
      
      <Button
        onClick={handleTest}
        disabled={isLoading}
        variant="outline"
        size="sm"
        className="bg-white/90 backdrop-blur-sm"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Testing...
          </>
        ) : (
          'Test Firebase'
        )}
      </Button>
    </div>
  );
};

export default FirebaseTestButton;
