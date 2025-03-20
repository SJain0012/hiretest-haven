
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PersonalityTrait {
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

export const AIQuestionGenerator: React.FC<AIQuestionGeneratorProps> = ({ onQuestionsGenerated }) => {
  const { toast } = useToast();
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTraitToggle = (traitId: string) => {
    setSelectedTraits(prev => 
      prev.includes(traitId) 
        ? prev.filter(id => id !== traitId)
        : [...prev, traitId]
    );
  };

  const generateQuestions = () => {
    if (selectedTraits.length === 0) {
      toast({
        title: "No traits selected",
        description: "Please select at least one personality trait.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation with a timeout (would be replaced with actual API call)
    setTimeout(() => {
      const generatedQuestions: Question[] = [];
      
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
      
      setIsGenerating(false);
      onQuestionsGenerated(generatedQuestions);
    }, 2000); // Simulate 2-second delay for "AI thinking"
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
        <Button onClick={generateQuestions} disabled={isGenerating || selectedTraits.length === 0}>
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
