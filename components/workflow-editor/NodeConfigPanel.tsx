"use client";

import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { NodeDefinition, WorkflowData, NodeInput } from "@/lib/node/types";

interface NodeConfigPanelProps {
  nodeId: string;
  workflow: WorkflowData;
  setWorkflow: (workflow: WorkflowData) => void;
  nodeDefinitions: NodeDefinition[];
  onClose: () => void;
}

export const NodeConfigPanel: React.FC<NodeConfigPanelProps> = ({
  nodeId,
  workflow,
  setWorkflow,
  nodeDefinitions,
  onClose,
}) => {
  // Find the node in the workflow
  const node = workflow.nodes.find((n) => n.id === nodeId);
  if (!node) return null;

  // Find the node definition
  const nodeDefinition = nodeDefinitions.find(
    (def) => def.id === node.data.nodeType
  );
  if (!nodeDefinition) return null;

  const handleInputChange = (inputId: string, value: any) => {
    const updatedNodes = workflow.nodes.map((n) => {
      if (n.id === nodeId) {
        return {
          ...n,
          data: {
            ...n.data,
            inputs: {
              ...n.data.inputs,
              [inputId]: value,
            },
          },
        };
      }
      return n;
    });

    setWorkflow({
      ...workflow,
      nodes: updatedNodes,
    });
  };

  const renderInputField = (input: NodeInput) => {
    const value =
      node.data.inputs[input.id] !== undefined
        ? node.data.inputs[input.id]
        : input.default || "";

    switch (input.type) {
      case "string":
        return (
          <Input
            id={input.id}
            value={value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            placeholder={input.description}
          />
        );
      case "number":
        return (
          <Input
            id={input.id}
            type="number"
            value={value}
            onChange={(e) =>
              handleInputChange(input.id, Number(e.target.value))
            }
            placeholder={input.description}
          />
        );
      case "boolean":
        return (
          <Switch
            id={input.id}
            checked={Boolean(value)}
            onCheckedChange={(checked) => handleInputChange(input.id, checked)}
          />
        );
      case "json":
      case "code":
        return (
          <Textarea
            id={input.id}
            value={
              typeof value === "object" ? JSON.stringify(value, null, 2) : value
            }
            onChange={(e) => {
              try {
                // Try to parse as JSON if it's a valid JSON string
                if (input.type === "json") {
                  const jsonValue = JSON.parse(e.target.value);
                  handleInputChange(input.id, jsonValue);
                } else {
                  handleInputChange(input.id, e.target.value);
                }
              } catch (err) {
                // If it's not valid JSON or code, just store the string
                handleInputChange(input.id, e.target.value);
              }
            }}
            placeholder={input.description}
            className="font-mono text-sm"
            rows={6}
          />
        );
      default:
        return (
          <Input
            id={input.id}
            value={value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            placeholder={input.description}
          />
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{nodeDefinition.name} Configuration</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {nodeDefinition.inputs.map((input) => (
          <div key={input.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor={input.id} className="text-sm font-medium">
                {input.label}
                {input.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
            </div>
            {renderInputField(input)}
            {input.description && (
              <p className="text-xs text-slate-500">{input.description}</p>
            )}
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <h4 className="font-medium mb-2">Outputs</h4>
        <div className="space-y-2">
          {nodeDefinition.outputs.map((output) => (
            <div
              key={output.id}
              className="flex items-center justify-between text-sm"
            >
              <span>{output.label}:</span>
              <span className="text-slate-500">{output.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
