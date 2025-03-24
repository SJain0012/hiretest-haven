
import { cn } from "@/lib/utils";
import {
  IconChartPie,
  IconSend,
  IconUserCircle,
  IconBuildingStore,
  IconFilter,
  IconUsers,
  IconPercentage,
  IconHeadset,
} from "@tabler/icons-react";

const features = [
  {
    title: "Insightful Analytics",
    description:
      "Visualize personality data with elegant charts and graphs to identify the perfect candidate fit.",
    icon: <IconChartPie className="h-6 w-6" />,
  },
  {
    title: "Automated Invitations",
    description:
      "Send personalized test invitations to candidates with just a few clicks.",
    icon: <IconSend className="h-6 w-6" />,
  },
  {
    title: "Candidate Profiles",
    description:
      "Build comprehensive profiles based on personality test results and other data points.",
    icon: <IconUserCircle className="h-6 w-6" />,
  },
  {
    title: "Customizable Tests",
    description: "Create personalized questionnaires tailored to your specific hiring needs.",
    icon: <IconBuildingStore className="h-6 w-6" />,
  },
  {
    title: "Advanced Filtering",
    description:
      "Quickly find candidates matching specific personality traits and attributes.",
    icon: <IconFilter className="h-6 w-6" />,
  },
  {
    title: "Team Collaboration",
    description:
      "Share insights and feedback with your team to make collective hiring decisions.",
    icon: <IconUsers className="h-6 w-6" />,
  },
  {
    title: "50% Discount Access",
    description:
      "Early adopters get 50% off any plan when we launch. Join the waitlist today.",
    icon: <IconPercentage className="h-6 w-6" />,
  },
  {
    title: "Priority Support",
    description: "Get priority access to our support team and product updates.",
    icon: <IconHeadset className="h-6 w-6" />,
  },
];

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-blue-medium dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-blue-dark dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-muted-foreground dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

export function FeaturesSectionNew() {
  return (
    <section className="w-full py-24 bg-blue-gradient-soft">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="space-y-2 mb-10">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything You <span className="blue-gradient-text">Need</span>
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              Our platform offers comprehensive tools to streamline your recruitment process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-7xl mx-auto w-full">
            {features.map((feature, index) => (
              <Feature key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSectionNew;
