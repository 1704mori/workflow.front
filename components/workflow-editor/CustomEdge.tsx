"use client";

import React from "react";
import {
  EdgeProps,
  EdgeLabelRenderer,
  getSmoothStepPath,
  BaseEdge,
} from "reactflow";

export const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style = {},
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: "all",
          }}
          className="px-2 py-1 rounded-full bg-white border border-slate-200 shadow-sm"
        >
          {data?.label || ""}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
