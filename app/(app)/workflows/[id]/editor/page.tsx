"use client";

import { useEffect, useState } from "react";
import { WorkflowEditor } from "@/components/workflow-editor/WorkflowEditor";
import { NodePanel } from "@/components/workflow-editor/NodePanel";
import { NodeConfigPanel } from "@/components/workflow-editor/NodeConfigPanel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NodeDefinition, WorkflowData } from "@/lib/node/types";
import { toast } from "sonner";

export default function WorkflowEditorPage({
  params,
}: {
  params: { id: string };
}) {
  const [workflow, setWorkflow] = useState<WorkflowData>({
    nodes: [],
    edges: [],
  });
  const [nodeDefinitions, setNodeDefinitions] = useState<NodeDefinition[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // In a real app, you would fetch the workflow and node definitions from your API
  useEffect(() => {
    // Mock data
    const mockNodeDefinitions: NodeDefinition[] = [
      {
        id: "http_request",
        name: "HTTP Request",
        description: "Make an HTTP request to an external API",
        category: "actions",
        version: "1.0.0",
        icon: "/icons/http.svg",
        inputs: [
          {
            id: "url",
            label: "URL",
            type: "string",
            required: true,
            description: "The URL to make the request to",
          },
          {
            id: "method",
            label: "Method",
            type: "string",
            required: true,
            default: "GET",
            description: "HTTP method (GET, POST, PUT, DELETE)",
          },
          {
            id: "headers",
            label: "Headers",
            type: "json",
            required: false,
            description: "HTTP headers as JSON",
          },
          {
            id: "body",
            label: "Body",
            type: "json",
            required: false,
            description: "Request body as JSON",
          },
        ],
        outputs: [
          {
            id: "response",
            label: "Response",
            type: "json",
            description: "The HTTP response",
          },
          {
            id: "statusCode",
            label: "Status Code",
            type: "number",
            description: "The HTTP status code",
          },
        ],
      },
      {
        id: "data_transform",
        name: "Data Transform",
        description: "Transform data using JavaScript",
        category: "actions",
        version: "1.0.0",
        icon: "/icons/transform.svg",
        inputs: [
          {
            id: "input",
            label: "Input",
            type: "json",
            required: true,
            description: "The input data to transform",
          },
          {
            id: "transform",
            label: "Transform Function",
            type: "code",
            required: true,
            default: "return input;",
            description: "JavaScript function to transform the input",
          },
        ],
        outputs: [
          {
            id: "output",
            label: "Output",
            type: "json",
            description: "The transformed output",
          },
        ],
      },
      {
        id: "condition",
        name: "Condition",
        description: "Evaluate a condition and route accordingly",
        category: "logic",
        version: "1.0.0",
        icon: "/icons/condition.svg",
        inputs: [
          {
            id: "condition",
            label: "Condition",
            type: "code",
            required: true,
            default: "return true;",
            description: "JavaScript condition to evaluate",
          },
        ],
        outputs: [
          {
            id: "true",
            label: "True",
            type: "trigger",
            description: "Execute when condition is true",
          },
          {
            id: "false",
            label: "False",
            type: "trigger",
            description: "Execute when condition is false",
          },
        ],
      },
    ];

    // Mock empty workflow or fetch existing one
    const mockWorkflow: WorkflowData = {
      nodes: [],
      edges: [],
    };

    setNodeDefinitions(mockNodeDefinitions);
    setWorkflow(mockWorkflow);
    setIsLoading(false);
  }, [params.id]);

  const handleSave = async () => {
    // In a real app, you would save the workflow to your API
    console.log("Saving workflow:", workflow);

    toast.success("Workflow saved", {
      description: "Your workflow has been saved successfully.",
    });
  };

  const handleDeploy = async () => {
    // In a real app, you would deploy the workflow
    console.log("Deploying workflow:", workflow);

    toast.success("Workflow deployed", {
      description: "Your workflow has been deployed successfully.",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-bold">Workflow Editor</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleSave}>
            Save
          </Button>
          <Button onClick={handleDeploy}>Deploy</Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 border-r bg-white p-4 overflow-y-auto">
          <Tabs defaultValue="nodes">
            <TabsList className="w-full">
              <TabsTrigger value="nodes" className="flex-1">
                Nodes
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="nodes" className="mt-4">
              <NodePanel nodeDefinitions={nodeDefinitions} />
            </TabsContent>
            <TabsContent value="settings">
              <div className="space-y-4 mt-4">
                <h3 className="font-medium">Workflow Settings</h3>
                <p className="text-sm text-slate-500">
                  Configure workflow settings here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex-1 relative">
          <WorkflowEditor
            workflow={workflow}
            setWorkflow={setWorkflow}
            onNodeSelect={setSelectedNode}
          />
        </div>

        {selectedNode && (
          <div className="w-80 border-l bg-white p-4 overflow-y-auto">
            <NodeConfigPanel
              nodeId={selectedNode}
              workflow={workflow}
              setWorkflow={setWorkflow}
              nodeDefinitions={nodeDefinitions}
              onClose={() => setSelectedNode(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
