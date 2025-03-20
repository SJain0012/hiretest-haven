
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface PersonalityTrait {
  trait: string;
  score: number;
  description: string;
}

interface PersonalityChartProps {
  data: PersonalityTrait[];
  candidateName: string;
}

// Custom colors with opacity for the radar fill
const RADAR_FILL_COLOR = 'rgba(14, 165, 233, 0.3)';
const RADAR_STROKE_COLOR = 'rgba(14, 165, 233, 0.8)';

const PersonalityChart: React.FC<PersonalityChartProps> = ({ data, candidateName }) => {
  // Transform data for RadarChart
  const chartData = data.map((item) => ({
    trait: item.trait,
    value: item.score,
    fullMark: 100,
  }));

  const chartConfig = {
    personality: { label: "Personality Score", color: "#0EA5E9" },
  };

  return (
    <Card className="overflow-hidden blue-card">
      <CardHeader className="pb-2">
        <CardTitle>Personality Profile: <span className="blue-gradient-text">{candidateName}</span></CardTitle>
        <CardDescription>
          Overview of personality traits based on assessment results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ChartContainer config={chartConfig} className="h-full">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid strokeDasharray="3 3" />
              <PolarAngleAxis dataKey="trait" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#6b7280' }} />
              <Radar
                name="Personality"
                dataKey="value"
                stroke={RADAR_STROKE_COLOR}
                fill={RADAR_FILL_COLOR}
                fillOpacity={0.7}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </RadarChart>
          </ChartContainer>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {data.map((trait) => (
            <div key={trait.trait} className="rounded-lg border p-3 transition-all hover:shadow-md hover:border-blue-300">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{trait.trait}</h4>
                <span className="text-sm font-semibold blue-gradient-text">{trait.score}%</span>
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
