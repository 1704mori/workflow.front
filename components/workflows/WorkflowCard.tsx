"use client";

import React from "react";
import Link from "next/link";
import { Play, Pencil, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "@/lib/utils";

interface WorkflowCardProps {
  workflow: {
    id: string;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
  };
}

export const WorkflowCard: React.FC<WorkflowCardProps> = ({ workflow }) => {
  const [isActive, setIsActive] = React.useState(workflow.isActive);

  const handleToggleActive = (active: boolean) => {
    setIsActive(active);
    // In a real app, you would update the workflow in your API
    console.log(`Setting workflow ${workflow.id} active state to:`, active);
  };

  return (
    <div className="p-4 border rounded-lg bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-base">{workflow.name}</h3>
          {workflow.description && (
            <p className="text-sm text-slate-500 mt-1">
              {workflow.description}
            </p>
          )}
          <p className="text-xs text-slate-400 mt-2">
            Created {formatDistanceToNow(new Date(workflow.createdAt))} ago
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <Switch
              checked={isActive}
              onCheckedChange={handleToggleActive}
              className="mr-2"
            />
            <span className="text-sm">{isActive ? "Active" : "Inactive"}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex mt-4 space-x-2">
        <Link href={`/workflows/${workflow.id}/editor`}>
          <Button variant="outline" size="sm">
            <Pencil className="h-4 w-4 mr-1" /> Edit
          </Button>
        </Link>
        <Button variant="outline" size="sm">
          <Play className="h-4 w-4 mr-1" /> Run
        </Button>
      </div>
    </div>
  );
};
