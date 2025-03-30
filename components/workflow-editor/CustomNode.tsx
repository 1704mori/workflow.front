"use client";

import React, { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";

interface CustomNodeProps extends NodeProps {
  data: {
    label: string;
    nodeType: string;
    inputs: Record<string, any>;
  };
}

const CustomNodeComponent: React.FC<CustomNodeProps> = ({
  data,
  isConnectable,
}) => {
  // In a real app, you would fetch node definitions from context or props
  const getNodeTypeColor = (nodeType: string) => {
    const typeColors: Record<string, string> = {
      http_request: "bg-blue-500",
      data_transform: "bg-purple-500",
      condition: "bg-yellow-500",
      // Add more node type colors as needed
    };

    return typeColors[nodeType] || "bg-gray-500";
  };

  const getInputHandles = () => {
    // In a real app, you would generate these dynamically based on the node definition
    return (
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        isConnectable={isConnectable}
      />
    );
  };

  const getOutputHandles = () => {
    // In a real app, you would generate these dynamically based on the node definition
    if (data.nodeType === "condition") {
      return (
        <>
          <Handle
            type="source"
            position={Position.Right}
            id="true"
            style={{ top: "30%" }}
            isConnectable={isConnectable}
          />
          <Handle
            type="source"
            position={Position.Right}
            id="false"
            style={{ top: "70%" }}
            isConnectable={isConnectable}
          />
        </>
      );
    }

    return (
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        isConnectable={isConnectable}
      />
    );
  };

  return (
    <div className="min-w-[180px] rounded-md shadow-md bg-white border border-slate-200 overflow-hidden">
      <div
        className={`px-3 py-2 ${getNodeTypeColor(
          data.nodeType
        )} text-white font-medium`}
      >
        {data.label}
      </div>
      <div className="p-3 text-xs text-slate-500">
        {Object.entries(data.inputs).length > 0 ? (
          <ul className="space-y-1">
            {Object.entries(data.inputs).map(([key, value]) => (
              <li key={key} className="flex justify-between">
                <span>{key}:</span>
                <span className="font-mono">
                  {String(value).substring(0, 20)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No inputs configured</p>
        )}
      </div>
      {getInputHandles()}
      {getOutputHandles()}
    </div>
  );
};

export const CustomNode = memo(CustomNodeComponent);
