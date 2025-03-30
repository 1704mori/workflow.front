"use client";

import React, { useCallback, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";

import { CustomNode } from "./CustomNode";
import { CustomEdge } from "./CustomEdge";
import { WorkflowData } from "@/lib/node/types";

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

interface WorkflowEditorProps {
  workflow: WorkflowData;
  setWorkflow: (workflow: WorkflowData) => void;
  onNodeSelect: (nodeId: string | null) => void;
}

export const WorkflowEditor: React.FC<WorkflowEditorProps> = ({
  workflow,
  setWorkflow,
  onNodeSelect,
}) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(
    workflow.nodes as Node[]
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    workflow.edges as Edge[]
  );

  // Update parent workflow state when nodes or edges change
  React.useEffect(() => {
    setWorkflow({
      nodes: nodes as any[],
      edges: edges as any[],
    });
  }, [nodes, edges, setWorkflow]);

  // Update the component when the parent workflow changes
  React.useEffect(() => {
    setNodes(workflow.nodes as Node[]);
    setEdges(workflow.edges as Edge[]);
  }, [workflow, setNodes, setEdges]);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, type: "custom" }, eds));
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const nodeType = event.dataTransfer.getData("application/reactflow/type");
      const nodeData = JSON.parse(
        event.dataTransfer.getData("application/reactflow/data")
      );

      // Check if the drag started from outside the workflow area
      if (typeof nodeType === "undefined" || !nodeType) {
        return;
      }

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: `${nodeData.id}_${Date.now()}`,
        type: "custom",
        position,
        data: {
          label: nodeData.name,
          nodeType: nodeData.id,
          inputs: {},
        },
      };

      setNodes((nds) => nds.concat(newNode as Node));
    },
    [setNodes]
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      onNodeSelect(node.id);
    },
    [onNodeSelect]
  );

  return (
    <div className="h-full w-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background gap={16} size={1} />
      </ReactFlow>
    </div>
  );
};
