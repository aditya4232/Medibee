import { collection, doc, getDoc, getDocs, setDoc, query, where, orderBy, limit, addDoc } from 'firebase/firestore';
import { db } from './firebase';

// Medical Knowledge Base Interfaces
interface MedicalEntity {
  id: string;
  type: 'drug' | 'condition' | 'symptom' | 'procedure' | 'lab_test';
  name: string;
  synonyms: string[];
  description: string;
  category: string;
  metadata: Record<string, any>;
  sources: string[];
  lastUpdated: string;
}

interface DrugEntity extends MedicalEntity {
  type: 'drug';
  genericName: string;
  brandNames: string[];
  dosageForm: string[];
  strength: string[];
  indications: string[];
  contraindications: string[];
  sideEffects: string[];
  interactions: string[];
  mechanism: string;
  pharmacokinetics: {
    absorption: string;
    distribution: string;
    metabolism: string;
    elimination: string;
  };
  pricing: {
    averagePrice: number;
    priceRange: { min: number; max: number };
    currency: string;
  };
}

interface ConditionEntity extends MedicalEntity {
  type: 'condition';
  icdCode: string;
  symptoms: string[];
  causes: string[];
  riskFactors: string[];
  diagnosis: string[];
  treatment: string[];
  prognosis: string;
  prevalence: string;
  severity: 'mild' | 'moderate' | 'severe' | 'critical';
}

interface LabTestEntity extends MedicalEntity {
  type: 'lab_test';
  referenceRanges: {
    age?: string;
    gender?: string;
    condition?: string;
    normalRange: { min: number; max: number; unit: string };
  }[];
  clinicalSignificance: string;
  methodology: string;
  specimenType: string;
  turnaroundTime: string;
}

interface KnowledgeGraph {
  entities: Map<string, MedicalEntity>;
  relationships: Map<string, { from: string; to: string; type: string; weight: number }[]>;
}

// Medical Knowledge Base Engine
class MedicalKnowledgeBaseEngine {
  private knowledgeGraph: KnowledgeGraph;
  private initialized = false;

  constructor() {
    this.knowledgeGraph = {
      entities: new Map(),
      relationships: new Map()
    };
  }

  // Initialize knowledge base with open-source medical data
  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      console.log('Initializing Medical Knowledge Base...');
      
      // Load existing knowledge from Firestore
      await this.loadKnowledgeFromFirestore();
      
      // If empty, seed with open-source medical data
      if (this.knowledgeGraph.entities.size === 0) {
        await this.seedWithOpenSourceData();
      }
      
      this.initialized = true;
      console.log(`Knowledge Base initialized with ${this.knowledgeGraph.entities.size} entities`);
    } catch (error) {
      console.error('Failed to initialize knowledge base:', error);
    }
  }

  // Load knowledge from Firestore
  private async loadKnowledgeFromFirestore(): Promise<void> {
    try {
      const entitiesRef = collection(db, 'medical_knowledge');
      const snapshot = await getDocs(entitiesRef);
      
      snapshot.forEach((doc) => {
        const entity = doc.data() as MedicalEntity;
        this.knowledgeGraph.entities.set(entity.id, entity);
      });

      // Load relationships
      const relationshipsRef = collection(db, 'medical_relationships');
      const relSnapshot = await getDocs(relationshipsRef);
      
      relSnapshot.forEach((doc) => {
        const rel = doc.data();
        if (!this.knowledgeGraph.relationships.has(rel.from)) {
          this.knowledgeGraph.relationships.set(rel.from, []);
        }
        this.knowledgeGraph.relationships.get(rel.from)!.push({
          from: rel.from,
          to: rel.to,
          type: rel.type,
          weight: rel.weight
        });
      });
    } catch (error) {
      console.error('Error loading knowledge from Firestore:', error);
    }
  }

  // Seed with open-source medical data
  private async seedWithOpenSourceData(): Promise<void> {
    console.log('Seeding knowledge base with open-source medical data...');
    
    // Common medications from open sources
    const commonDrugs: Partial<DrugEntity>[] = [
      {
        id: 'paracetamol',
        type: 'drug',
        name: 'Paracetamol',
        genericName: 'Acetaminophen',
        brandNames: ['Tylenol', 'Crocin', 'Dolo'],
        synonyms: ['acetaminophen', 'APAP'],
        description: 'Analgesic and antipyretic medication',
        category: 'Analgesics',
        dosageForm: ['tablet', 'syrup', 'injection'],
        strength: ['500mg', '650mg', '1000mg'],
        indications: ['Pain relief', 'Fever reduction', 'Headache'],
        contraindications: ['Severe liver disease', 'Alcohol dependency'],
        sideEffects: ['Nausea', 'Liver damage (overdose)', 'Skin rash'],
        interactions: ['Warfarin', 'Alcohol', 'Phenytoin'],
        mechanism: 'Inhibits cyclooxygenase enzymes in the central nervous system',
        pharmacokinetics: {
          absorption: 'Rapid and complete oral absorption',
          distribution: 'Widely distributed, crosses placenta',
          metabolism: 'Hepatic metabolism via glucuronidation and sulfation',
          elimination: 'Renal elimination, half-life 1-4 hours'
        },
        pricing: {
          averagePrice: 25,
          priceRange: { min: 10, max: 50 },
          currency: 'INR'
        },
        metadata: {
          fdaApproved: true,
          pregnancyCategory: 'B',
          controlledSubstance: false
        },
        sources: ['FDA Orange Book', 'WHO Essential Medicines', 'PubMed'],
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'ibuprofen',
        type: 'drug',
        name: 'Ibuprofen',
        genericName: 'Ibuprofen',
        brandNames: ['Advil', 'Brufen', 'Combiflam'],
        synonyms: ['isobutylphenylpropionic acid'],
        description: 'Nonsteroidal anti-inflammatory drug (NSAID)',
        category: 'NSAIDs',
        dosageForm: ['tablet', 'capsule', 'syrup', 'gel'],
        strength: ['200mg', '400mg', '600mg'],
        indications: ['Pain relief', 'Inflammation', 'Fever', 'Arthritis'],
        contraindications: ['Peptic ulcer', 'Severe heart failure', 'Kidney disease'],
        sideEffects: ['Stomach upset', 'Kidney problems', 'Cardiovascular risk'],
        interactions: ['ACE inhibitors', 'Warfarin', 'Lithium'],
        mechanism: 'Inhibits cyclooxygenase-1 and cyclooxygenase-2 enzymes',
        pharmacokinetics: {
          absorption: 'Rapid oral absorption, peak levels in 1-2 hours',
          distribution: 'Highly protein bound (>99%)',
          metabolism: 'Hepatic metabolism',
          elimination: 'Renal and biliary elimination, half-life 2-4 hours'
        },
        pricing: {
          averagePrice: 30,
          priceRange: { min: 15, max: 60 },
          currency: 'INR'
        },
        metadata: {
          fdaApproved: true,
          pregnancyCategory: 'C',
          controlledSubstance: false
        },
        sources: ['FDA Orange Book', 'WHO Essential Medicines', 'Cochrane Reviews'],
        lastUpdated: new Date().toISOString()
      }
    ];

    // Common medical conditions
    const commonConditions: Partial<ConditionEntity>[] = [
      {
        id: 'hypertension',
        type: 'condition',
        name: 'Hypertension',
        synonyms: ['high blood pressure', 'HTN'],
        description: 'Persistently elevated blood pressure',
        category: 'Cardiovascular',
        icdCode: 'I10',
        symptoms: ['Headache', 'Dizziness', 'Chest pain', 'Shortness of breath'],
        causes: ['Genetics', 'Diet', 'Stress', 'Obesity', 'Smoking'],
        riskFactors: ['Age', 'Family history', 'Obesity', 'Sedentary lifestyle'],
        diagnosis: ['Blood pressure measurement', 'ECG', 'Echocardiogram'],
        treatment: ['Lifestyle changes', 'ACE inhibitors', 'Diuretics', 'Beta blockers'],
        prognosis: 'Good with proper management',
        prevalence: '1.13 billion people worldwide',
        severity: 'moderate',
        metadata: {
          chronicCondition: true,
          preventable: true
        },
        sources: ['WHO', 'AHA Guidelines', 'PubMed'],
        lastUpdated: new Date().toISOString()
      }
    ];

    // Common lab tests
    const commonLabTests: Partial<LabTestEntity>[] = [
      {
        id: 'hemoglobin',
        type: 'lab_test',
        name: 'Hemoglobin',
        synonyms: ['Hb', 'Haemoglobin'],
        description: 'Protein in red blood cells that carries oxygen',
        category: 'Hematology',
        referenceRanges: [
          {
            gender: 'male',
            normalRange: { min: 13.5, max: 17.5, unit: 'g/dL' }
          },
          {
            gender: 'female',
            normalRange: { min: 12.0, max: 16.0, unit: 'g/dL' }
          }
        ],
        clinicalSignificance: 'Indicates oxygen-carrying capacity and anemia',
        methodology: 'Automated hematology analyzer',
        specimenType: 'Whole blood (EDTA)',
        turnaroundTime: '1-2 hours',
        metadata: {
          criticalValues: { low: 7.0, high: 20.0 }
        },
        sources: ['Clinical Laboratory Standards Institute', 'WHO'],
        lastUpdated: new Date().toISOString()
      }
    ];

    // Store entities in Firestore and local graph
    for (const drug of commonDrugs) {
      await this.addEntity(drug as DrugEntity);
    }
    
    for (const condition of commonConditions) {
      await this.addEntity(condition as ConditionEntity);
    }
    
    for (const labTest of commonLabTests) {
      await this.addEntity(labTest as LabTestEntity);
    }

    // Create relationships
    await this.addRelationship('paracetamol', 'hypertension', 'treats', 0.3);
    await this.addRelationship('ibuprofen', 'hypertension', 'contraindicated', 0.8);
    
    console.log('Knowledge base seeded successfully');
  }

  // Add entity to knowledge base
  async addEntity(entity: MedicalEntity): Promise<void> {
    try {
      // Store in local graph
      this.knowledgeGraph.entities.set(entity.id, entity);
      
      // Store in Firestore
      await setDoc(doc(db, 'medical_knowledge', entity.id), entity);
    } catch (error) {
      console.error('Error adding entity:', error);
    }
  }

  // Add relationship between entities
  async addRelationship(fromId: string, toId: string, type: string, weight: number): Promise<void> {
    try {
      const relationship = { from: fromId, to: toId, type, weight };
      
      // Store in local graph
      if (!this.knowledgeGraph.relationships.has(fromId)) {
        this.knowledgeGraph.relationships.set(fromId, []);
      }
      this.knowledgeGraph.relationships.get(fromId)!.push(relationship);
      
      // Store in Firestore
      await addDoc(collection(db, 'medical_relationships'), relationship);
    } catch (error) {
      console.error('Error adding relationship:', error);
    }
  }

  // Search entities by name or synonyms
  searchEntities(query: string, type?: string): MedicalEntity[] {
    const results: MedicalEntity[] = [];
    const searchTerm = query.toLowerCase();
    
    for (const entity of this.knowledgeGraph.entities.values()) {
      if (type && entity.type !== type) continue;
      
      const nameMatch = entity.name.toLowerCase().includes(searchTerm);
      const synonymMatch = entity.synonyms.some(synonym => 
        synonym.toLowerCase().includes(searchTerm)
      );
      
      if (nameMatch || synonymMatch) {
        results.push(entity);
      }
    }
    
    return results.sort((a, b) => {
      // Prioritize exact matches
      const aExact = a.name.toLowerCase() === searchTerm;
      const bExact = b.name.toLowerCase() === searchTerm;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      return 0;
    });
  }

  // Get entity by ID
  getEntity(id: string): MedicalEntity | undefined {
    return this.knowledgeGraph.entities.get(id);
  }

  // Get related entities
  getRelatedEntities(entityId: string, relationshipType?: string): MedicalEntity[] {
    const relationships = this.knowledgeGraph.relationships.get(entityId) || [];
    const relatedEntities: MedicalEntity[] = [];
    
    for (const rel of relationships) {
      if (relationshipType && rel.type !== relationshipType) continue;
      
      const entity = this.knowledgeGraph.entities.get(rel.to);
      if (entity) {
        relatedEntities.push(entity);
      }
    }
    
    return relatedEntities.sort((a, b) => {
      const aRel = relationships.find(r => r.to === a.id);
      const bRel = relationships.find(r => r.to === b.id);
      return (bRel?.weight || 0) - (aRel?.weight || 0);
    });
  }

  // Get knowledge base statistics
  getStatistics() {
    const stats = {
      totalEntities: this.knowledgeGraph.entities.size,
      totalRelationships: Array.from(this.knowledgeGraph.relationships.values())
        .reduce((sum, rels) => sum + rels.length, 0),
      entityTypes: {} as Record<string, number>
    };
    
    for (const entity of this.knowledgeGraph.entities.values()) {
      stats.entityTypes[entity.type] = (stats.entityTypes[entity.type] || 0) + 1;
    }
    
    return stats;
  }
}

// Export singleton instance
export const medicalKB = new MedicalKnowledgeBaseEngine();
export type { MedicalEntity, DrugEntity, ConditionEntity, LabTestEntity };
