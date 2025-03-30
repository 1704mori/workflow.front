'use client';

import React from 'react';
import { NodeDefinition } from '@/lib/node/types';

interface NodeCardProps {
  nodeDefinition: NodeDefinition;
}

export const NodeCard: React.FC<NodeCardProps> = ({ nodeDefinition }) => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('application/reactflow/type', 'custom');
    event.dataTransfer.setData(
      'application/reactflow/data',
      JSON.stringify(nodeDefinition)
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="p-3 bg-white border rounded-md shadow-sm cursor-grab hover:shadow-md transition-shadow"
      draggable
      onDragStart={onDragStart}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-100">
          {nodeDefinition.icon ? (
            <img
              src={nodeDefinition.icon}
              alt={nodeDefinition.name}
              className="w-5 h-5"
            />
          ) : (
            <div className="w-5 h-5 rounded-full bg-slate-300" />
          )}
        </div>
        <div>
          <h3 className="font-medium text-sm">{nodeDefinition.name}</h3>
          <p className="text-xs text-slate-500">{nodeDefinition.description}</p>
          <span className="text-xs text-slate-400 capitalize">
            {nodeDefinition.category}
          </span>
        </div>
      </div>
    </div>
  );
};