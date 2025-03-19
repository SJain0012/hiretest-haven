
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface PersonalityTrait {
  trait: string;
  score: number;
  description: string;
}

interface PersonalityChartProps {
  data: PersonalityTrait[];
  candidateName: string;
}

// Custom color with opacity for the radar fill
const RADAR_FILL_COLOR = 'rgba(79, 70, 229, 0.2)';
const RADAR_STROKE_COLOR = 'rgba(79, 70, 229, 0.8)';

const PersonalityChart: React.FC<PersonalityChartProps> = ({ data, candidateName }) => {
  // Transform data for RadarChart
  const chartData = data.map((item) => ({
    trait: item.trait,
    value: item.score,
    fullMark: 100,
  }));

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>Personality Profile: {candidateName}</CardTitle>
        <CardDescription>
          Overview of personality traits based on assessment results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid strokeDasharray="3 3" />
              <PolarAngleAxis dataKey="trait" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar
                name="Personality"
                dataKey="value"
                stroke={RADAR_STROKE_COLOR}
                fill={RADAR_FILL_COLOR}
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {data.map((trait) => (
            <div key={trait.trait} className="rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{trait.trait}</h4>
                <span className="text-sm font-semibold">{trait.score}%</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {trait.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalityChart;
