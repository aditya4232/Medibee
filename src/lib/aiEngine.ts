import { collection, doc, getDoc, getDocs, setDoc, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase';
import { medicalKB, type MedicalEntity, type DrugEntity, type ConditionEntity } from './medicalKnowledgeBase';

// Enhanced AI Engine Configuration
const AI_CONFIG = {
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
  GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
  MEDICINE_API_BASE: 'https://api.fda.gov/drug',
  INDIAN_MEDICINE_API: 'https://api.1mg.com',
  PUBMED_API: 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils',
  RXNORM_API: 'https://rxnav.nlm.nih.gov/REST',
  UMLS_API: 'https://uts-ws.nlm.nih.gov/rest',
};

// Knowledge Base Interfaces
interface MedicineKnowledge {
  id: string;
  name: string;
  genericName: string;
  category: string;
  uses: string[];
  sideEffects: string[];
  dosage: string;
  contraindications: string[];
  interactions: string[];
  price: {
    min: number;
    max: number;
    currency: string;
  };
  availability: 'Available' | 'Limited' | 'Prescription Required' | 'Out of Stock';
  lastUpdated: string;
}

interface MedicalKnowledge {
  id: string;
  condition: string;
  symptoms: string[];
  causes: string[];
  treatments: string[];
  severity: 'Low' | 'Medium' | 'High';
  specialistRequired: boolean;
  emergencySignals: string[];
  lastUpdated: string;
}

interface AIResponse {
  success: boolean;
  data?: any;
  error?: string;
  sources: string[];
  confidence: number;
  disclaimer: string;
}

// AI Engine Class
class MediBeeAIEngine {
  private knowledgeBaseInitialized = false;

  // Initialize Enhanced AI Knowledge Base
  async initializeKnowledgeBase(): Promise<void> {
    if (this.knowledgeBaseInitialized) return;

    try {
      console.log('Initializing Enhanced AI Knowledge Base...');

      // Initialize the medical knowledge base
      await medicalKB.initialize();

      // Initialize vector embeddings (placeholder for future implementation)
      await this.initializeVectorDatabase();

      this.knowledgeBaseInitialized = true;
      console.log('Enhanced AI Knowledge Base initialized');
    } catch (error) {
      console.error('Failed to initialize enhanced knowledge base:', error);
    }
  }

  // Initialize vector database for semantic search
  private async initializeVectorDatabase(): Promise<void> {
    // Placeholder for vector database initialization
    // In production, this would set up ChromaDB or similar
    console.log('Vector database initialization placeholder');
  }

  // Seed initial knowledge base with common medicines and conditions
  private async seedKnowledgeBase(): Promise<void> {
    const commonMedicines: Partial<MedicineKnowledge>[] = [
      {
        id: 'paracetamol',
        name: 'Paracetamol',
        genericName: 'Acetaminophen',
        category: 'Analgesic',
        uses: ['Fever', 'Pain relief', 'Headache'],
        sideEffects: ['Nausea', 'Liver damage (overdose)'],
        dosage: '500mg-1000mg every 4-6 hours',
        contraindications: ['Severe liver disease'],
        interactions: ['Warfarin', 'Alcohol'],
        price: { min: 10, max: 50, currency: 'INR' },
        availability: 'Available',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'ibuprofen',
        name: 'Ibuprofen',
        genericName: 'Ibuprofen',
        category: 'NSAID',
        uses: ['Pain relief', 'Inflammation', 'Fever'],
        sideEffects: ['Stomach upset', 'Kidney problems'],
        dosage: '200mg-400mg every 4-6 hours',
        contraindications: ['Kidney disease', 'Heart disease'],
        interactions: ['Blood thinners', 'ACE inhibitors'],
        price: { min: 15, max: 80, currency: 'INR' },
        availability: 'Available',
        lastUpdated: new Date().toISOString()
      }
    ];

    // Store medicines in Firestore
    for (const medicine of commonMedicines) {
      await setDoc(doc(db, 'ai_knowledge_medicine', medicine.id!), medicine);
    }

    console.log('Knowledge base seeded with common medicines');
  }

  // Enhanced medicine search using knowledge base and AI
  async searchMedicine(query: string): Promise<AIResponse> {
    try {
      await this.initializeKnowledgeBase();

      // Search in enhanced knowledge base
      const kbResults = medicalKB.searchEntities(query, 'drug');

      if (kbResults.length > 0) {
        // Convert to expected format and enhance with AI insights
        const enhancedResults = await this.enhanceMedicineResults(kbResults, query);

        return {
          success: true,
          data: enhancedResults,
          sources: ['Medical Knowledge Base', 'Open Medical Data'],
          confidence: 0.90,
          disclaimer: 'This information is for educational purposes only. Always consult with a healthcare professional.'
        };
      }

      // Search external APIs if not found locally
      const externalResults = await this.searchExternalMedicineAPIs(query);

      if (externalResults) {
        // Store new knowledge in KB
        await this.storeNewMedicineKnowledge(externalResults);

        return {
          success: true,
          data: externalResults,
          sources: ['External Medical APIs', 'FDA Database', 'RxNorm'],
          confidence: 0.75,
          disclaimer: 'This information is sourced from external databases. Always verify with a healthcare professional.'
        };
      }

      // Try semantic search with AI if exact matches fail
      const aiResults = await this.performSemanticMedicineSearch(query);

      if (aiResults) {
        return {
          success: true,
          data: aiResults,
          sources: ['AI Semantic Search', 'Medical Literature'],
          confidence: 0.65,
          disclaimer: 'AI-generated results. Please verify with healthcare professional and official sources.'
        };
      }

      return {
        success: false,
        error: 'No information found for this medicine',
        sources: [],
        confidence: 0,
        disclaimer: 'Unable to find reliable information. Please consult a healthcare professional.'
      };

    } catch (error) {
      console.error('Enhanced medicine search error:', error);
      return {
        success: false,
        error: 'Search failed due to technical issues',
        sources: [],
        confidence: 0,
        disclaimer: 'Technical error occurred. Please try again or consult a healthcare professional.'
      };
    }
  }

  // Enhanced medical report analysis using AI and knowledge base
  async analyzeReport(reportText: string, reportType: string): Promise<AIResponse> {
    try {
      await this.initializeKnowledgeBase();

      if (!AI_CONFIG.GEMINI_API_KEY) {
        return {
          success: false,
          error: 'AI analysis not configured',
          sources: [],
          confidence: 0,
          disclaimer: 'AI analysis requires proper configuration. Please consult a healthcare professional.'
        };
      }

      // Extract medical entities from report text
      const extractedEntities = await this.extractMedicalEntities(reportText);

      // Get relevant knowledge base information
      const relevantKnowledge = await this.getRelevantKnowledge(extractedEntities, reportType);

      // Build enhanced prompt with knowledge base context
      const prompt = this.buildEnhancedReportAnalysisPrompt(reportText, reportType, relevantKnowledge);
      const aiResponse = await this.callGeminiAPI(prompt);

      if (aiResponse) {
        // Parse and enhance the AI response
        const enhancedAnalysis = await this.enhanceAnalysisWithKnowledge(aiResponse, extractedEntities);

        // Store analysis for learning
        await this.storeAnalysisResult(reportText, reportType, enhancedAnalysis);

        return {
          success: true,
          data: enhancedAnalysis,
          sources: ['Gemini AI', 'Medical Knowledge Base', 'Open Medical Data'],
          confidence: 0.85,
          disclaimer: 'AI analysis enhanced with medical knowledge base. Always discuss results with your doctor.'
        };
      }

      return {
        success: false,
        error: 'AI analysis failed',
        sources: [],
        confidence: 0,
        disclaimer: 'Unable to analyze report. Please consult a healthcare professional.'
      };

    } catch (error) {
      console.error('Enhanced report analysis error:', error);
      return {
        success: false,
        error: 'Analysis failed due to technical issues',
        sources: [],
        confidence: 0,
        disclaimer: 'Technical error occurred. Please consult a healthcare professional.'
      };
    }
  }

  // Enhance medicine results with AI insights
  private async enhanceMedicineResults(entities: MedicalEntity[], query: string): Promise<any[]> {
    const enhancedResults = [];

    for (const entity of entities) {
      if (entity.type === 'drug') {
        const drugEntity = entity as DrugEntity;

        // Get related conditions and interactions
        const relatedConditions = medicalKB.getRelatedEntities(entity.id, 'treats');
        const interactions = medicalKB.getRelatedEntities(entity.id, 'interacts_with');

        // Convert to expected format
        const enhancedResult = {
          id: drugEntity.id,
          name: drugEntity.name,
          genericName: drugEntity.genericName,
          category: drugEntity.category,
          uses: drugEntity.indications,
          sideEffects: drugEntity.sideEffects,
          dosage: drugEntity.strength.join(', '),
          contraindications: drugEntity.contraindications,
          interactions: drugEntity.interactions,
          price: drugEntity.pricing,
          availability: 'Available', // Default for KB entries
          lastUpdated: drugEntity.lastUpdated,
          relatedConditions: relatedConditions.map(c => c.name),
          drugInteractions: interactions.map(i => i.name),
          sources: drugEntity.sources
        };

        enhancedResults.push(enhancedResult);
      }
    }

    return enhancedResults;
  }

  // Perform semantic search using AI
  private async performSemanticMedicineSearch(query: string): Promise<any> {
    try {
      if (!AI_CONFIG.GEMINI_API_KEY) {
        return null;
      }

      const prompt = `
        You are a medical AI assistant. A user is searching for information about: "${query}"

        Based on your medical knowledge, provide information about this medicine/drug including:
        1. Generic and brand names
        2. Primary uses and indications
        3. Common dosages
        4. Side effects
        5. Contraindications
        6. Drug interactions

        Format your response as JSON with the following structure:
        {
          "name": "Medicine Name",
          "genericName": "Generic Name",
          "category": "Drug Category",
          "uses": ["use1", "use2"],
          "sideEffects": ["effect1", "effect2"],
          "dosage": "Common dosage information",
          "contraindications": ["contra1", "contra2"],
          "interactions": ["drug1", "drug2"],
          "availability": "Available",
          "confidence": 0.7
        }

        Only provide information for legitimate, well-known medications. If the query is not about a real medicine, return null.
      `;

      const aiResponse = await this.callGeminiAPI(prompt);

      if (aiResponse) {
        try {
          const parsed = JSON.parse(aiResponse);
          return [parsed]; // Return as array to match expected format
        } catch (parseError) {
          console.error('Failed to parse AI response:', parseError);
          return null;
        }
      }

      return null;
    } catch (error) {
      console.error('Semantic search error:', error);
      return null;
    }
  }

  // Search external medicine APIs
  private async searchExternalMedicineAPIs(query: string): Promise<any> {
    try {
      // This would integrate with real APIs like:
      // - FDA Drug Database
      // - 1mg API
      // - PharmEasy API
      // - Indian government drug databases

      // For now, return null to indicate no external data
      // In production, implement actual API calls here
      return null;
    } catch (error) {
      console.error('External API search error:', error);
      return null;
    }
  }

  // Store new medicine knowledge
  private async storeNewMedicineKnowledge(medicineData: any): Promise<void> {
    try {
      const medicineId = medicineData.name.toLowerCase().replace(/\s+/g, '_');
      await setDoc(doc(db, 'ai_knowledge_medicine', medicineId), {
        ...medicineData,
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to store medicine knowledge:', error);
    }
  }

  // Extract medical entities from report text
  private async extractMedicalEntities(reportText: string): Promise<string[]> {
    const entities: string[] = [];
    const text = reportText.toLowerCase();

    // Simple entity extraction (in production, use NLP libraries)
    const commonMedicalTerms = [
      'hemoglobin', 'glucose', 'cholesterol', 'blood pressure', 'heart rate',
      'white blood cells', 'red blood cells', 'platelets', 'creatinine',
      'bilirubin', 'albumin', 'protein', 'sodium', 'potassium', 'chloride'
    ];

    for (const term of commonMedicalTerms) {
      if (text.includes(term)) {
        entities.push(term);
      }
    }

    return entities;
  }

  // Get relevant knowledge from knowledge base
  private async getRelevantKnowledge(entities: string[], reportType: string): Promise<string> {
    let knowledge = '';

    // Get lab test reference ranges
    for (const entity of entities) {
      const labTests = medicalKB.searchEntities(entity, 'lab_test');
      for (const test of labTests) {
        if (test.type === 'lab_test') {
          knowledge += `${test.name}: ${test.description}\n`;
          // Add reference ranges if available
        }
      }
    }

    // Get related conditions
    const conditions = medicalKB.searchEntities(reportType);
    for (const condition of conditions.slice(0, 3)) { // Limit to top 3
      knowledge += `Related condition: ${condition.name} - ${condition.description}\n`;
    }

    return knowledge;
  }

  // Build enhanced prompt with knowledge base context
  private buildEnhancedReportAnalysisPrompt(reportText: string, reportType: string, knowledge: string): string {
    return `
      You are an advanced medical AI assistant with access to a comprehensive medical knowledge base.

      Analyze this ${reportType} medical report using the provided medical knowledge:

      Report Content:
      ${reportText}

      Relevant Medical Knowledge:
      ${knowledge}

      Please provide a comprehensive analysis including:
      1. Key findings and extracted values
      2. Comparison with normal reference ranges
      3. Clinical significance of abnormal values
      4. Potential health implications and conditions
      5. Recommended next steps and follow-up
      6. Risk assessment (Low/Medium/High) with justification
      7. Related conditions to monitor
      8. Lifestyle recommendations if applicable

      Format the response as structured JSON with the following sections:
      {
        "summary": "Brief overview of findings",
        "keyFindings": ["finding1", "finding2"],
        "abnormalValues": [{"parameter": "name", "value": "X", "normal": "Y-Z", "significance": "explanation"}],
        "riskAssessment": {"level": "Low/Medium/High", "factors": ["factor1", "factor2"]},
        "recommendations": ["rec1", "rec2"],
        "followUp": ["action1", "action2"],
        "relatedConditions": ["condition1", "condition2"]
      }

      Always include appropriate medical disclaimers and emphasize the need for professional consultation.
    `;
  }

  // Enhance analysis with knowledge base information
  private async enhanceAnalysisWithKnowledge(aiResponse: string, entities: string[]): Promise<any> {
    try {
      let analysis = JSON.parse(aiResponse);

      // Add knowledge base enhancements
      analysis.knowledgeBaseEnhancements = {
        extractedEntities: entities,
        relatedDrugs: [],
        relatedConditions: [],
        additionalResources: []
      };

      // Find related drugs for any conditions mentioned
      for (const entity of entities) {
        const drugs = medicalKB.searchEntities(entity, 'drug');
        analysis.knowledgeBaseEnhancements.relatedDrugs.push(
          ...drugs.slice(0, 3).map(d => ({ name: d.name, indication: entity }))
        );
      }

      return analysis;
    } catch (error) {
      console.error('Failed to enhance analysis:', error);
      return aiResponse; // Return original if parsing fails
    }
  }

  // Build prompt for report analysis (legacy method for compatibility)
  private buildReportAnalysisPrompt(reportText: string, reportType: string): string {
    return this.buildEnhancedReportAnalysisPrompt(reportText, reportType, '');
  }

  // Call Gemini AI API
  private async callGeminiAPI(prompt: string): Promise<any> {
    try {
      const response = await fetch(`${AI_CONFIG.GEMINI_API_URL}?key=${AI_CONFIG.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (error) {
      console.error('Gemini API call failed:', error);
      return null;
    }
  }

  // Store analysis result for learning
  private async storeAnalysisResult(reportText: string, reportType: string, analysis: any): Promise<void> {
    try {
      const analysisId = `analysis_${Date.now()}`;
      await setDoc(doc(db, 'ai_analysis_history', analysisId), {
        reportType,
        reportText: reportText.substring(0, 500), // Store first 500 chars for privacy
        analysis,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to store analysis result:', error);
    }
  }

  // Get nearby pharmacies using location
  async getNearbyPharmacies(latitude: number, longitude: number): Promise<AIResponse> {
    try {
      // This would integrate with Google Maps API or similar
      // For now, return placeholder response
      return {
        success: false,
        error: 'Location services not yet integrated',
        sources: [],
        confidence: 0,
        disclaimer: 'Pharmacy location feature coming soon. Please search manually.'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Location search failed',
        sources: [],
        confidence: 0,
        disclaimer: 'Unable to find nearby pharmacies. Please search manually.'
      };
    }
  }
}

// Export singleton instance
export const aiEngine = new MediBeeAIEngine();
export type { AIResponse, MedicineKnowledge, MedicalKnowledge };
