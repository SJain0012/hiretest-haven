
// Mock data for demonstration purposes

export const mockTests = [
  {
    id: 't1',
    name: 'Developer Personality Assessment',
    status: 'active',
    createdAt: '2023-10-15T14:23:00Z',
    candidatesCount: 23,
    completionRate: 78,
  },
  {
    id: 't2',
    name: 'Leadership Potential Evaluation',
    status: 'active',
    createdAt: '2023-11-02T09:45:00Z',
    candidatesCount: 15,
    completionRate: 93,
  },
  {
    id: 't3',
    name: 'Team Collaboration Assessment',
    status: 'draft',
    createdAt: '2023-11-23T16:10:00Z',
    candidatesCount: 0,
    completionRate: 0,
  },
  {
    id: 't4',
    name: 'Communication Skills Test',
    status: 'archived',
    createdAt: '2023-09-05T11:30:00Z',
    candidatesCount: 42,
    completionRate: 100,
  },
];

export const mockCandidates = [
  {
    id: 'c1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    status: 'completed',
    testName: 'Developer Personality Assessment',
    completedDate: '2023-11-10T15:23:00Z',
  },
  {
    id: 'c2',
    name: 'Maya Rodriguez',
    email: 'maya.rodriguez@example.com',
    status: 'pending',
    testName: 'Developer Personality Assessment',
  },
  {
    id: 'c3',
    name: 'Sam Thompson',
    email: 'sam.thompson@example.com',
    status: 'completed',
    testName: 'Leadership Potential Evaluation',
    completedDate: '2023-11-18T09:45:00Z',
  },
  {
    id: 'c4',
    name: 'Taylor Williams',
    email: 'taylor.williams@example.com',
    status: 'expired',
    testName: 'Developer Personality Assessment',
  },
  {
    id: 'c5',
    name: 'Jordan Smith',
    email: 'jordan.smith@example.com',
    status: 'completed',
    testName: 'Leadership Potential Evaluation',
    completedDate: '2023-11-15T14:30:00Z',
  },
];

export const mockTraits = [
  {
    trait: 'Openness',
    score: 85,
    description: 'High curiosity and willingness to try new things.',
  },
  {
    trait: 'Conscientiousness',
    score: 72,
    description: 'Good organization and reliability in work.',
  },
  {
    trait: 'Extraversion',
    score: 45,
    description: 'Balanced between social engagement and independent work.',
  },
  {
    trait: 'Agreeableness',
    score: 88,
    description: 'Strong team player with collaborative approach.',
  },
  {
    trait: 'Emotional Stability',
    score: 67,
    description: 'Good resilience to stress with room for growth.',
  },
  {
    trait: 'Problem Solving',
    score: 91,
    description: 'Excellent analytical abilities and creative solutions.',
  },
];

export const mockInsights = [
  {
    type: 'finding' as const,
    text: 'Strong analytical and problem-solving capabilities make this candidate well-suited for complex technical challenges.',
  },
  {
    type: 'finding' as const,
    text: 'High agreeableness score indicates excellent potential for team collaboration and mentoring junior developers.',
  },
  {
    type: 'question' as const,
    text: 'How does the candidate handle high-pressure situations given their moderate emotional stability score?',
  },
  {
    type: 'finding' as const,
    text: 'Exceptional openness to experience suggests adaptability to new technologies and methodologies.',
  },
  {
    type: 'question' as const,
    text: 'Would this candidate thrive in a leadership role considering their balanced extraversion levels?',
  },
];

export const mockTestQuestions = [
  {
    id: 'q1',
    text: 'I enjoy solving complex problems.',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Strongly Disagree', max: 'Strongly Agree' },
  },
  {
    id: 'q2',
    text: 'How do you prefer to work?',
    type: 'multiple_choice',
    options: ['Independently', 'In small teams', 'In large teams', 'Flexible between solo and team work'],
  },
  {
    id: 'q3',
    text: 'I prefer structured environments with clear guidelines.',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Strongly Disagree', max: 'Strongly Agree' },
  },
  {
    id: 'q4',
    text: 'Describe a situation where you had to adapt to an unexpected change.',
    type: 'text',
  },
];
