'use client';

import React from 'react';
import { WorkflowCard } from './WorkflowCard';

interface WorkflowListProps {
  workflows: {
    id: string;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
  }[];
}

export const WorkflowList: React.FC<WorkflowListProps> = ({ workflows }) => {
  if (workflows.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500">No workflows found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
};