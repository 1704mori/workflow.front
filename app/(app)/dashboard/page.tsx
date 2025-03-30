import { WorkflowList } from '@/components/workflows/WorkflowList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function DashboardPage() {
  // In a real app, you would fetch workflows from your API
  const mockWorkflows = [
    {
      id: '1',
      name: 'Email Notification Workflow',
      description: 'Sends email notifications when new data is received',
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Data Transformation Pipeline',
      description: 'Cleans and transforms incoming data',
      isActive: false,
      createdAt: new Date().toISOString(),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/workflows/new">
          <Button>
            Create Workflow
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold mb-4">Your Workflows</h2>
          <WorkflowList workflows={mockWorkflows} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold mb-4">Recent Executions</h2>
          <p className="text-slate-500">No recent executions found.</p>
        </div>
      </div>
    </div>
  );
}