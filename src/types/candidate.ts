
export interface Candidate {
  id: string;
  name: string;
  email: string;
  status: "pending" | "completed" | "expired";
  testName: string;
  completedDate?: string;
}

export const statusColorMap = {
  pending: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
  completed: 'bg-green-100 text-green-800 hover:bg-green-200',
  expired: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
};
