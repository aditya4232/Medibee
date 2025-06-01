import { medicalKB } from './medicalKnowledgeBase';

// Document Processing Interfaces
interface ProcessedDocument {
  extractedText: string;
  structuredData: MedicalStructuredData;
  confidence: number;
  processingMethod: string;
  entities: ExtractedEntity[];
  metadata: DocumentMetadata;
}

interface MedicalStructuredData {
  patientInfo: {
    name?: string;
    age?: string;
    gender?: string;
    id?: string;
  };
  labResults: LabResult[];
  medications: MedicationEntry[];
  diagnoses: string[];
  vitals: VitalSign[];
  reportType: string;
  reportDate?: string;
  physician?: string;
  institution?: string;
}

interface LabResult {
  testName: string;
  value: string;
  unit?: string;
  referenceRange?: string;
  status: 'normal' | 'high' | 'low' | 'critical' | 'unknown';
  confidence: number;
}

interface MedicationEntry {
  name: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  route?: string;
  confidence: number;
}

interface VitalSign {
  type: string;
  value: string;
  unit?: string;
  timestamp?: string;
  confidence: number;
}

interface ExtractedEntity {
  text: string;
  type: 'medication' | 'condition' | 'lab_test' | 'vital' | 'person' | 'date' | 'value';
  confidence: number;
  position: { start: number; end: number };
  normalizedForm?: string;
}

interface DocumentMetadata {
  fileType: string;
  fileSize: number;
  processingTime: number;
  ocrEngine?: string;
  language: string;
  quality: 'high' | 'medium' | 'low';
}

// Medical Document Processor
class MedicalDocumentProcessor {
  private initialized = false;

  // Initialize the document processor
  async initialize(): Promise<void> {
    if (this.initialized) return;
    
    console.log('Initializing Medical Document Processor...');
    
    // Initialize medical knowledge base
    await medicalKB.initialize();
    
    this.initialized = true;
    console.log('Medical Document Processor initialized');
  }

  // Process medical document (main entry point)
  async processDocument(file: File): Promise<ProcessedDocument> {
    await this.initialize();
    
    const startTime = Date.now();
    
    try {
      // Extract text based on file type
      const extractedText = await this.extractText(file);
      
      // Extract structured medical data
      const structuredData = await this.extractStructuredData(extractedText);
      
      // Extract medical entities
      const entities = await this.extractMedicalEntities(extractedText);
      
      // Calculate overall confidence
      const confidence = this.calculateOverallConfidence(entities, structuredData);
      
      // Create metadata
      const metadata: DocumentMetadata = {
        fileType: file.type || this.getFileTypeFromName(file.name),
        fileSize: file.size,
        processingTime: Date.now() - startTime,
        language: 'en', // Default to English
        quality: confidence > 0.8 ? 'high' : confidence > 0.6 ? 'medium' : 'low'
      };

      return {
        extractedText,
        structuredData,
        confidence,
        processingMethod: 'browser-based',
        entities,
        metadata
      };
    } catch (error) {
      console.error('Document processing error:', error);
      throw new Error('Failed to process document');
    }
  }

  // Extract text from different file types
  private async extractText(file: File): Promise<string> {
    const fileType = file.type || this.getFileTypeFromName(file.name);
    
    if (fileType.includes('image')) {
      return await this.extractTextFromImage(file);
    } else if (fileType.includes('pdf')) {
      return await this.extractTextFromPDF(file);
    } else if (fileType.includes('text')) {
      return await this.extractTextFromTextFile(file);
    } else {
      throw new Error(`Unsupported file type: ${fileType}`);
    }
  }

  // Extract text from image using browser-based OCR simulation
  private async extractTextFromImage(file: File): Promise<string> {
    // In a real implementation, this would use:
    // - Tesseract.js for browser-based OCR
    // - Google Vision API
    // - AWS Textract
    // - Azure Computer Vision
    
    // For now, simulate OCR with a placeholder
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Simulate OCR processing delay
        setTimeout(() => {
          resolve(`
            MEDICAL REPORT
            Patient: John Doe
            Age: 45 years
            Date: ${new Date().toLocaleDateString()}
            
            LABORATORY RESULTS:
            Hemoglobin: 14.2 g/dL (Normal: 13.5-17.5)
            Glucose: 95 mg/dL (Normal: 70-100)
            Cholesterol: 180 mg/dL (Normal: <200)
            
            MEDICATIONS:
            Paracetamol 500mg twice daily
            
            DIAGNOSIS:
            Normal health parameters
            
            Dr. Smith, MD
            City Hospital
          `);
        }, 1000);
      };
      reader.readAsDataURL(file);
    });
  }

  // Extract text from PDF
  private async extractTextFromPDF(file: File): Promise<string> {
    // In production, use PDF.js or similar library
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Simulate PDF text extraction
        resolve(`
          BLOOD TEST REPORT
          Patient ID: 12345
          Name: Jane Smith
          DOB: 01/01/1980
          
          TEST RESULTS:
          Complete Blood Count (CBC)
          - White Blood Cells: 7.2 K/uL (4.0-11.0)
          - Red Blood Cells: 4.5 M/uL (4.2-5.4)
          - Hemoglobin: 13.8 g/dL (12.0-16.0)
          - Platelets: 250 K/uL (150-450)
          
          Chemistry Panel:
          - Glucose: 88 mg/dL (70-100)
          - Creatinine: 0.9 mg/dL (0.6-1.2)
          - Total Cholesterol: 195 mg/dL (<200)
          
          All values within normal limits.
          
          Physician: Dr. Johnson
          Lab: Central Medical Lab
        `);
      };
      reader.readAsText(file);
    });
  }

  // Extract text from text file
  private async extractTextFromTextFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string || '');
      reader.onerror = () => reject(new Error('Failed to read text file'));
      reader.readAsText(file);
    });
  }

  // Extract structured medical data from text
  private async extractStructuredData(text: string): Promise<MedicalStructuredData> {
    const structuredData: MedicalStructuredData = {
      patientInfo: {},
      labResults: [],
      medications: [],
      diagnoses: [],
      vitals: [],
      reportType: this.determineReportType(text)
    };

    // Extract patient information
    structuredData.patientInfo = this.extractPatientInfo(text);
    
    // Extract lab results
    structuredData.labResults = this.extractLabResults(text);
    
    // Extract medications
    structuredData.medications = this.extractMedications(text);
    
    // Extract diagnoses
    structuredData.diagnoses = this.extractDiagnoses(text);
    
    // Extract vital signs
    structuredData.vitals = this.extractVitalSigns(text);
    
    // Extract dates and physician info
    structuredData.reportDate = this.extractDate(text);
    structuredData.physician = this.extractPhysician(text);
    structuredData.institution = this.extractInstitution(text);

    return structuredData;
  }

  // Extract patient information
  private extractPatientInfo(text: string): any {
    const patientInfo: any = {};
    
    // Name extraction
    const nameMatch = text.match(/(?:patient|name):\s*([a-zA-Z\s]+)/i);
    if (nameMatch) patientInfo.name = nameMatch[1].trim();
    
    // Age extraction
    const ageMatch = text.match(/age:\s*(\d+)/i);
    if (ageMatch) patientInfo.age = ageMatch[1];
    
    // Gender extraction
    const genderMatch = text.match(/(?:gender|sex):\s*(male|female|m|f)/i);
    if (genderMatch) patientInfo.gender = genderMatch[1].toLowerCase();
    
    // ID extraction
    const idMatch = text.match(/(?:patient\s*id|id):\s*([a-zA-Z0-9]+)/i);
    if (idMatch) patientInfo.id = idMatch[1];
    
    return patientInfo;
  }

  // Extract lab results with reference ranges
  private extractLabResults(text: string): LabResult[] {
    const results: LabResult[] = [];
    
    // Common lab test patterns
    const labPatterns = [
      /hemoglobin:\s*([\d.]+)\s*([a-zA-Z\/]+)?\s*(?:\(([^)]+)\))?/i,
      /glucose:\s*([\d.]+)\s*([a-zA-Z\/]+)?\s*(?:\(([^)]+)\))?/i,
      /cholesterol:\s*([\d.]+)\s*([a-zA-Z\/]+)?\s*(?:\(([^)]+)\))?/i,
      /creatinine:\s*([\d.]+)\s*([a-zA-Z\/]+)?\s*(?:\(([^)]+)\))?/i,
      /white\s*blood\s*cells?:\s*([\d.]+)\s*([a-zA-Z\/]+)?\s*(?:\(([^)]+)\))?/i,
      /red\s*blood\s*cells?:\s*([\d.]+)\s*([a-zA-Z\/]+)?\s*(?:\(([^)]+)\))?/i,
      /platelets?:\s*([\d.]+)\s*([a-zA-Z\/]+)?\s*(?:\(([^)]+)\))?/i
    ];
    
    for (const pattern of labPatterns) {
      const match = text.match(pattern);
      if (match) {
        const testName = pattern.source.split(':')[0].replace(/[\\()]/g, '').replace(/\s*\\\s*/g, ' ');
        const value = match[1];
        const unit = match[2] || '';
        const referenceRange = match[3] || '';
        
        // Determine status based on reference range
        const status = this.determineLabStatus(testName, value, referenceRange);
        
        results.push({
          testName: this.normalizeTestName(testName),
          value,
          unit,
          referenceRange,
          status,
          confidence: 0.8
        });
      }
    }
    
    return results;
  }

  // Extract medications
  private extractMedications(text: string): MedicationEntry[] {
    const medications: MedicationEntry[] = [];
    
    // Medication patterns
    const medPatterns = [
      /([a-zA-Z]+(?:\s+[a-zA-Z]+)*)\s+(\d+(?:\.\d+)?)\s*(mg|g|ml|mcg)\s*(?:(once|twice|thrice|\d+\s*times?)\s*(?:daily|per\s*day)?)?/gi
    ];
    
    for (const pattern of medPatterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        const name = match[1].trim();
        const dosage = `${match[2]} ${match[3]}`;
        const frequency = match[4] || '';
        
        // Validate against knowledge base
        const drugEntities = medicalKB.searchEntities(name, 'drug');
        const confidence = drugEntities.length > 0 ? 0.9 : 0.6;
        
        medications.push({
          name,
          dosage,
          frequency,
          confidence
        });
      }
    }
    
    return medications;
  }

  // Extract diagnoses
  private extractDiagnoses(text: string): string[] {
    const diagnoses: string[] = [];
    
    // Look for diagnosis sections
    const diagnosisMatch = text.match(/(?:diagnosis|impression|assessment):\s*([^.]+)/i);
    if (diagnosisMatch) {
      diagnoses.push(diagnosisMatch[1].trim());
    }
    
    return diagnoses;
  }

  // Extract vital signs
  private extractVitalSigns(text: string): VitalSign[] {
    const vitals: VitalSign[] = [];
    
    // Vital sign patterns
    const vitalPatterns = [
      { pattern: /blood\s*pressure:\s*(\d+\/\d+)/i, type: 'Blood Pressure', unit: 'mmHg' },
      { pattern: /heart\s*rate:\s*(\d+)/i, type: 'Heart Rate', unit: 'bpm' },
      { pattern: /temperature:\s*([\d.]+)/i, type: 'Temperature', unit: '°F' },
      { pattern: /weight:\s*([\d.]+)/i, type: 'Weight', unit: 'kg' },
      { pattern: /height:\s*([\d.]+)/i, type: 'Height', unit: 'cm' }
    ];
    
    for (const { pattern, type, unit } of vitalPatterns) {
      const match = text.match(pattern);
      if (match) {
        vitals.push({
          type,
          value: match[1],
          unit,
          confidence: 0.8
        });
      }
    }
    
    return vitals;
  }

  // Extract medical entities using simple NLP
  private async extractMedicalEntities(text: string): Promise<ExtractedEntity[]> {
    const entities: ExtractedEntity[] = [];
    
    // Search for known medical entities in knowledge base
    const words = text.toLowerCase().split(/\s+/);
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
      // Search for drugs
      const drugs = medicalKB.searchEntities(word, 'drug');
      if (drugs.length > 0) {
        entities.push({
          text: word,
          type: 'medication',
          confidence: 0.8,
          position: { start: i, end: i + 1 },
          normalizedForm: drugs[0].name
        });
      }
      
      // Search for conditions
      const conditions = medicalKB.searchEntities(word, 'condition');
      if (conditions.length > 0) {
        entities.push({
          text: word,
          type: 'condition',
          confidence: 0.8,
          position: { start: i, end: i + 1 },
          normalizedForm: conditions[0].name
        });
      }
      
      // Search for lab tests
      const labTests = medicalKB.searchEntities(word, 'lab_test');
      if (labTests.length > 0) {
        entities.push({
          text: word,
          type: 'lab_test',
          confidence: 0.8,
          position: { start: i, end: i + 1 },
          normalizedForm: labTests[0].name
        });
      }
    }
    
    return entities;
  }

  // Helper methods
  private getFileTypeFromName(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf': return 'application/pdf';
      case 'jpg': case 'jpeg': return 'image/jpeg';
      case 'png': return 'image/png';
      case 'txt': return 'text/plain';
      default: return 'application/octet-stream';
    }
  }

  private determineReportType(text: string): string {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('blood') || lowerText.includes('cbc')) return 'Blood Test';
    if (lowerText.includes('x-ray') || lowerText.includes('xray')) return 'X-Ray';
    if (lowerText.includes('mri')) return 'MRI';
    if (lowerText.includes('ct') || lowerText.includes('scan')) return 'CT Scan';
    if (lowerText.includes('echo') || lowerText.includes('cardiac')) return 'Cardiac Test';
    return 'Medical Report';
  }

  private normalizeTestName(testName: string): string {
    return testName.replace(/[\\()]/g, '').replace(/\s+/g, ' ').trim();
  }

  private determineLabStatus(testName: string, value: string, referenceRange: string): 'normal' | 'high' | 'low' | 'critical' | 'unknown' {
    // Simple status determination (in production, use comprehensive reference ranges)
    if (!referenceRange) return 'unknown';
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 'unknown';
    
    // Parse reference range (e.g., "13.5-17.5", "<200", ">100")
    const rangeMatch = referenceRange.match(/([\d.]+)-([\d.]+)/);
    if (rangeMatch) {
      const min = parseFloat(rangeMatch[1]);
      const max = parseFloat(rangeMatch[2]);
      
      if (numValue < min) return 'low';
      if (numValue > max) return 'high';
      return 'normal';
    }
    
    return 'unknown';
  }

  private extractDate(text: string): string | undefined {
    const dateMatch = text.match(/(\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2})/);
    return dateMatch ? dateMatch[1] : undefined;
  }

  private extractPhysician(text: string): string | undefined {
    const physicianMatch = text.match(/(?:dr\.?|doctor)\s+([a-zA-Z\s]+)/i);
    return physicianMatch ? physicianMatch[1].trim() : undefined;
  }

  private extractInstitution(text: string): string | undefined {
    const institutionMatch = text.match(/(?:hospital|clinic|lab|medical center):\s*([^.\n]+)/i);
    return institutionMatch ? institutionMatch[1].trim() : undefined;
  }

  private calculateOverallConfidence(entities: ExtractedEntity[], structuredData: MedicalStructuredData): number {
    let totalConfidence = 0;
    let count = 0;
    
    // Factor in entity confidence
    for (const entity of entities) {
      totalConfidence += entity.confidence;
      count++;
    }
    
    // Factor in structured data completeness
    if (structuredData.labResults.length > 0) {
      totalConfidence += structuredData.labResults.reduce((sum, lab) => sum + lab.confidence, 0);
      count += structuredData.labResults.length;
    }
    
    if (structuredData.medications.length > 0) {
      totalConfidence += structuredData.medications.reduce((sum, med) => sum + med.confidence, 0);
      count += structuredData.medications.length;
    }
    
    return count > 0 ? totalConfidence / count : 0.5;
  }
}

// Export singleton instance
export const documentProcessor = new MedicalDocumentProcessor();
export type { ProcessedDocument, MedicalStructuredData, LabResult, MedicationEntry, ExtractedEntity };
