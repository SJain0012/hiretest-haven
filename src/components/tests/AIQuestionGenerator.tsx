
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PersonalityTrait {
  id: string;
  name: string;
  description: string;
}

interface TechRole {
  id: string;
  name: string;
  description: string;
}

interface Question {
  id: string;
  text: string;
  type: 'multiple_choice' | 'scale' | 'text';
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: { min: string; max: string };
}

interface AIQuestionGeneratorProps {
  onQuestionsGenerated: (questions: Question[]) => void;
}

const personalityTraits: PersonalityTrait[] = [
  { id: 'openness', name: 'Openness', description: 'Appreciation for art, emotion, adventure, unusual ideas, imagination, curiosity, and variety of experience' },
  { id: 'conscientiousness', name: 'Conscientiousness', description: 'Tendency to be organized and dependable, show self-discipline, act dutifully, aim for achievement, and prefer planned behavior' },
  { id: 'extraversion', name: 'Extraversion', description: 'Energy, positive emotions, assertiveness, sociability and the tendency to seek stimulation in the company of others' },
  { id: 'agreeableness', name: 'Agreeableness', description: 'Tendency to be compassionate and cooperative rather than suspicious and antagonistic towards others' },
  { id: 'neuroticism', name: 'Emotional Stability', description: 'Tendency to experience unpleasant emotions easily, such as anger, anxiety, depression, and vulnerability' },
  { id: 'creativity', name: 'Creativity', description: 'Ability to generate original ideas, think outside the box, and find innovative solutions' },
  { id: 'leadership', name: 'Leadership', description: 'Ability to guide, motivate and inspire others towards achieving shared goals' },
  { id: 'adaptability', name: 'Adaptability', description: 'Ability to adjust to new conditions and handle unexpected challenges' },
  { id: 'teamwork', name: 'Teamwork', description: 'Ability to collaborate effectively with others to achieve common goals' }
];

const techRoles: TechRole[] = [
  { id: 'software-developer', name: 'Software Developer', description: 'Assesses programming skills, problem-solving abilities, and software development knowledge' },
  { id: 'qa-tester', name: 'QA Tester', description: 'Evaluates testing methodologies, bug identification skills, and quality assurance principles' },
  { id: 'product-manager', name: 'Product Manager', description: 'Measures product vision, stakeholder management, and strategic planning abilities' },
  { id: 'ux-designer', name: 'UX Designer', description: 'Examines user-centered design principles, wireframing abilities, and usability testing knowledge' },
  { id: 'data-scientist', name: 'Data Scientist', description: 'Assesses data analysis skills, statistical knowledge, and machine learning understanding' },
  { id: 'devops-engineer', name: 'DevOps Engineer', description: 'Evaluates CI/CD knowledge, infrastructure automation, and system reliability engineering' }
];

export const AIQuestionGenerator: React.FC<AIQuestionGeneratorProps> = ({ onQuestionsGenerated }) => {
  const { toast } = useToast();
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'traits' | 'roles'>('traits');

  const handleTraitToggle = (traitId: string) => {
    setSelectedTraits(prev => 
      prev.includes(traitId) 
        ? prev.filter(id => id !== traitId)
        : [...prev, traitId]
    );
  };

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const generateQuestions = () => {
    if (activeTab === 'traits' && selectedTraits.length === 0) {
      toast({
        title: "No traits selected",
        description: "Please select at least one personality trait.",
        variant: "destructive",
      });
      return;
    }

    if (activeTab === 'roles' && !selectedRole) {
      toast({
        title: "No role selected",
        description: "Please select a tech role to generate questions.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation with a timeout (would be replaced with actual API call)
    setTimeout(() => {
      const generatedQuestions: Question[] = [];
      
      if (activeTab === 'traits') {
        // Generate questions based on selected traits
        selectedTraits.forEach(traitId => {
          const trait = personalityTraits.find(t => t.id === traitId);
          if (trait) {
            // Generate 2-3 questions per trait
            const numQuestions = Math.floor(Math.random() * 2) + 2; // 2-3 questions
            
            for (let i = 0; i < numQuestions; i++) {
              // Create either multiple choice or scale question
              const questionType = Math.random() > 0.5 ? 'multiple_choice' : 'scale';
              
              let question: Question = {
                id: `q-${Date.now()}-${i}-${traitId}`,
                text: generateQuestionText(trait, i),
                type: questionType,
              };
              
              if (questionType === 'multiple_choice') {
                question.options = generateOptions(trait, i);
              } else {
                question.scaleMin = 1;
                question.scaleMax = 5;
                question.scaleLabels = { 
                  min: 'Strongly Disagree', 
                  max: 'Strongly Agree' 
                };
              }
              
              generatedQuestions.push(question);
            }
          }
        });
      } else {
        // Generate questions based on selected role
        const role = techRoles.find(r => r.id === selectedRole);
        if (role) {
          const roleQuestions = generateRoleBasedQuestions(role);
          generatedQuestions.push(...roleQuestions);
        }
      }
      
      setIsGenerating(false);
      onQuestionsGenerated(generatedQuestions);
    }, 2000); // Simulate 2-second delay for "AI thinking"
  };

  const generateRoleBasedQuestions = (role: TechRole): Question[] => {
    const questions: Question[] = [];
    
    // Role-specific questions
    const roleQuestionsMap: Record<string, Array<{ text: string, type: 'multiple_choice' | 'scale' | 'text', options?: string[] }>> = {
      'software-developer': [
        {
          text: "How do you approach debugging a complex issue in an application?",
          type: "text"
        },
        {
          text: "How comfortable are you with test-driven development?",
          type: "scale"
        },
        {
          text: "Which approach do you prefer when tackling a new programming problem?",
          type: "multiple_choice",
          options: [
            "Research existing solutions before implementing anything",
            "Start coding and refine as I go",
            "Plan extensively using diagrams or pseudocode first",
            "Discuss with teammates to brainstorm approaches",
            "Break down the problem into smaller sub-problems"
          ]
        },
        {
          text: "How do you prioritize technical debt versus new features?",
          type: "scale"
        },
        {
          text: "How do you stay updated with the latest programming trends and technologies?",
          type: "multiple_choice",
          options: [
            "Online courses and certifications",
            "Technical blogs and newsletters",
            "Open source contributions",
            "Professional networking and conferences",
            "Side projects and experimentation"
          ]
        }
      ],
      'qa-tester': [
        {
          text: "Describe your approach to creating a test plan for a new feature.",
          type: "text"
        },
        {
          text: "How experienced are you with automated testing frameworks?",
          type: "scale"
        },
        {
          text: "Which testing methodology do you find most effective?",
          type: "multiple_choice",
          options: [
            "Black box testing",
            "White box testing",
            "Exploratory testing",
            "Regression testing",
            "Integration testing"
          ]
        },
        {
          text: "How do you prioritize which bugs to fix first?",
          type: "multiple_choice",
          options: [
            "By severity and impact on users",
            "By ease of fix (quick wins first)",
            "By age (oldest bugs first)",
            "By affected feature importance",
            "By stakeholder priority"
          ]
        },
        {
          text: "How comfortable are you with creating test documentation?",
          type: "scale"
        }
      ],
      'product-manager': [
        {
          text: "How do you gather and prioritize user requirements?",
          type: "text"
        },
        {
          text: "Rate your ability to manage competing stakeholder priorities.",
          type: "scale"
        },
        {
          text: "How do you approach feature prioritization?",
          type: "multiple_choice",
          options: [
            "Impact vs effort analysis",
            "Customer feedback and demand",
            "Strategic alignment with company goals",
            "Revenue or growth potential",
            "Competitive analysis"
          ]
        },
        {
          text: "How do you measure the success of a product or feature?",
          type: "multiple_choice",
          options: [
            "User engagement metrics",
            "Revenue or conversion increase",
            "Customer satisfaction scores",
            "Retention metrics",
            "Achievement of specific business KPIs"
          ]
        },
        {
          text: "Describe your experience with creating product roadmaps.",
          type: "text"
        }
      ],
      'ux-designer': [
        {
          text: "How do you incorporate user feedback into your design process?",
          type: "text"
        },
        {
          text: "Rate your proficiency with design systems and component libraries.",
          type: "scale"
        },
        {
          text: "Which user research method do you find most valuable?",
          type: "multiple_choice",
          options: [
            "Usability testing",
            "User interviews",
            "Surveys and questionnaires",
            "Analytics and heatmaps",
            "Contextual inquiry"
          ]
        },
        {
          text: "How do you balance aesthetics with usability in your designs?",
          type: "scale"
        },
        {
          text: "How do you approach designing for accessibility?",
          type: "text"
        }
      ],
      'data-scientist': [
        {
          text: "Describe your approach to cleaning and preparing a messy dataset.",
          type: "text"
        },
        {
          text: "Rate your expertise with machine learning algorithms.",
          type: "scale"
        },
        {
          text: "Which data visualization technique do you find most effective for communicating insights?",
          type: "multiple_choice",
          options: [
            "Interactive dashboards",
            "Statistical charts (box plots, histograms)",
            "Geospatial visualizations",
            "Network graphs",
            "Time series visualization"
          ]
        },
        {
          text: "How do you evaluate the performance of a machine learning model?",
          type: "multiple_choice",
          options: [
            "Accuracy metrics (precision, recall, F1)",
            "Cross-validation techniques",
            "ROC curves and AUC",
            "Confusion matrices",
            "Business impact assessment"
          ]
        },
        {
          text: "How comfortable are you with explaining complex data concepts to non-technical stakeholders?",
          type: "scale"
        }
      ],
      'devops-engineer': [
        {
          text: "Describe your experience with implementing CI/CD pipelines.",
          type: "text"
        },
        {
          text: "Rate your proficiency with infrastructure as code.",
          type: "scale"
        },
        {
          text: "Which cloud platform do you have the most experience with?",
          type: "multiple_choice",
          options: [
            "AWS",
            "Google Cloud Platform",
            "Microsoft Azure",
            "DigitalOcean",
            "Heroku"
          ]
        },
        {
          text: "How do you approach monitoring and alerting for production systems?",
          type: "multiple_choice",
          options: [
            "Comprehensive metrics collection with dashboards",
            "Log aggregation and analysis",
            "Synthetic monitoring and health checks",
            "Anomaly detection and proactive alerting",
            "User-reported issues and feedback"
          ]
        },
        {
          text: "How do you handle security concerns in your infrastructure?",
          type: "text"
        }
      ]
    };
    
    const roleQuestions = roleQuestionsMap[role.id] || [];
    
    roleQuestions.forEach((q, i) => {
      const question: Question = {
        id: `q-${Date.now()}-${i}-${role.id}`,
        text: q.text,
        type: q.type
      };
      
      if (q.type === 'multiple_choice') {
        question.options = q.options || [];
      } else if (q.type === 'scale') {
        question.scaleMin = 1;
        question.scaleMax = 5;
        question.scaleLabels = { 
          min: 'Beginner', 
          max: 'Expert' 
        };
      }
      
      questions.push(question);
    });
    
    return questions;
  };

  const generateQuestionText = (trait: PersonalityTrait, index: number): string => {
    const questionTemplates = [
      `How do you respond when faced with ${trait.name.toLowerCase()}-related challenges?`,
      `How comfortable are you with situations that require ${trait.name.toLowerCase()}?`,
      `Would you consider yourself someone who demonstrates high levels of ${trait.name.toLowerCase()}?`,
      `In team settings, how important do you consider ${trait.name.toLowerCase()} to be?`,
      `How do you typically handle situations that test your ${trait.name.toLowerCase()}?`
    ];
    
    // Specific questions for each trait
    const traitSpecificQuestions: Record<string, string[]> = {
      openness: [
        "I enjoy exploring new ideas and concepts.",
        "I prefer routines and familiar experiences over new adventures.",
        "I enjoy engaging with abstract and theoretical concepts."
      ],
      conscientiousness: [
        "I pay attention to details and strive for accuracy in my work.",
        "I follow through on commitments and meet deadlines consistently.",
        "I prefer to plan ahead rather than be spontaneous."
      ],
      extraversion: [
        "I feel energized after spending time with large groups of people.",
        "I prefer initiating conversations rather than waiting for others to approach me.",
        "I enjoy being the center of attention in social settings."
      ],
      agreeableness: [
        "I prioritize cooperation over competition in team settings.",
        "I find it easy to empathize with others' perspectives, even when they differ from mine.",
        "I prefer to avoid confrontations, even when I disagree strongly."
      ],
      neuroticism: [
        "I remain calm under pressure and in stressful situations.",
        "I recover quickly from setbacks and disappointments.",
        "I rarely worry about future events or overthink past situations."
      ],
      creativity: [
        "I often come up with unconventional solutions to problems.",
        "I enjoy expressing myself through creative activities.",
        "I'm comfortable challenging established ways of doing things."
      ],
      leadership: [
        "I naturally take charge in group situations.",
        "People often look to me for guidance and direction.",
        "I'm comfortable making decisions that affect others."
      ],
      adaptability: [
        "I adjust quickly to unexpected changes in plans or circumstances.",
        "I'm comfortable working in environments with changing priorities.",
        "I see change as an opportunity rather than a threat."
      ],
      teamwork: [
        "I value the input and contributions of all team members.",
        "I'm willing to compromise my preferences for the good of the team.",
        "I communicate effectively with team members with different working styles."
      ]
    };
    
    if (trait.id in traitSpecificQuestions && index < traitSpecificQuestions[trait.id].length) {
      return traitSpecificQuestions[trait.id][index];
    }
    
    // Return a generic question if we run out of specific ones
    const randomIndex = Math.floor(Math.random() * questionTemplates.length);
    return questionTemplates[randomIndex];
  };
  
  const generateOptions = (trait: PersonalityTrait, index: number): string[] => {
    const genericOptions = [
      "Strongly Disagree", 
      "Disagree", 
      "Neutral", 
      "Agree", 
      "Strongly Agree"
    ];
    
    const specificOptionSets: Record<string, string[][]> = {
      openness: [
        [
          "I avoid new ideas and prefer familiar concepts",
          "I am somewhat cautious about exploring new ideas",
          "I occasionally explore new ideas",
          "I regularly seek out new ideas and concepts",
          "I constantly seek out and embrace novel ideas and concepts"
        ]
      ],
      extraversion: [
        [
          "I feel drained after social interactions",
          "I prefer small, intimate gatherings",
          "I enjoy social events sometimes",
          "I enjoy most social gatherings",
          "I seek out and thrive in highly social environments"
        ]
      ]
    };
    
    if (trait.id in specificOptionSets && index < specificOptionSets[trait.id].length) {
      return specificOptionSets[trait.id][index];
    }
    
    return genericOptions;
  };

  return (
    <div className="space-y-4 py-4">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'traits' | 'roles')} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="traits">Personality Traits</TabsTrigger>
          <TabsTrigger value="roles">Tech Roles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="traits" className="space-y-4">
          <div className="text-sm mb-4">
            Select the personality traits you want to assess:
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
            {personalityTraits.map(trait => (
              <Card key={trait.id} className={`border transition-colors ${selectedTraits.includes(trait.id) ? 'border-primary bg-primary/5' : ''}`}>
                <CardContent className="p-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id={trait.id} 
                      checked={selectedTraits.includes(trait.id)}
                      onCheckedChange={() => handleTraitToggle(trait.id)}
                      className="mt-1"
                    />
                    <div className="grid gap-1.5">
                      <label
                        htmlFor={trait.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {trait.name}
                      </label>
                      <p className="text-xs text-muted-foreground">
                        {trait.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-between pt-4 items-center">
            <div className="text-sm text-muted-foreground">
              Selected traits: <span className="font-medium">{selectedTraits.length}</span>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="roles" className="space-y-4">
          <div className="text-sm mb-4">
            Select a tech role to generate relevant questions:
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
            {techRoles.map(role => (
              <Card 
                key={role.id} 
                className={`border transition-colors cursor-pointer ${selectedRole === role.id ? 'border-primary bg-primary/5' : ''}`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id={role.id} 
                      checked={selectedRole === role.id}
                      onCheckedChange={() => handleRoleSelect(role.id)}
                      className="mt-1"
                    />
                    <div className="grid gap-1.5">
                      <label
                        htmlFor={role.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {role.name}
                      </label>
                      <p className="text-xs text-muted-foreground">
                        {role.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-between pt-4 items-center">
            <div className="text-sm text-muted-foreground">
              Selected role: <span className="font-medium">{selectedRole ? techRoles.find(r => r.id === selectedRole)?.name || '' : 'None'}</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end pt-4">
        <Button onClick={generateQuestions} disabled={isGenerating || (activeTab === 'traits' && selectedTraits.length === 0) || (activeTab === 'roles' && !selectedRole)}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Questions
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
