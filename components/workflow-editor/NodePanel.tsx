"use client";

import React from "react";
import { NodeCard } from "./NodeCard";
import { Input } from "@/components/ui/input";
import { NodeDefinition } from "@/lib/node/types";

interface NodePanelProps {
  nodeDefinitions: NodeDefinition[];
}

export const NodePanel: React.FC<NodePanelProps> = ({ nodeDefinitions }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [categories, setCategories] = React.useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );

  // Extract unique categories
  React.useEffect(() => {
    const cats = new Set<string>();
    nodeDefinitions.forEach((node) => {
      cats.add(node.category);
    });
    setCategories(cats);
  }, [nodeDefinitions]);

  // Filter nodes based on search term and selected category
  const filteredNodes = React.useMemo(() => {
    return nodeDefinitions.filter((node) => {
      const matchesSearch =
        node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory
        ? node.category === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [nodeDefinitions, searchTerm, selectedCategory]);

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search nodes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className={`px-2 py-1 text-xs rounded-full ${
            selectedCategory === null
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {Array.from(categories).map((category) => (
          <button
            key={category}
            className={`px-2 py-1 text-xs rounded-full capitalize ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filteredNodes.map((node) => (
          <NodeCard key={node.id} nodeDefinition={node} />
        ))}
      </div>
    </div>
  );
};
