"use client";
import { Background, Handle, Position, ReactFlow } from "@xyflow/react";
import { useMemo } from "react";
const defaultNodes = [
  {
    id: "node-1",
    position: { x: 0, y: 0 },
    type: "parentNode",
    data: {
      label: "ParentNode",
    },
  },
  {
    id: "node-3",
    position: { x: 400, y: 0 },
    type: "spouseNode",
    data: {
      label: "SpouseNode",
    },
  },
  {
    id: "node-2",
    position: { x: 200, y: 200 },
    type: "childNode",
    data: {
      label: "ChildNode",
    },
  },
];

const defaultEdges = [
  // {
  //   id: "spouse-edge",
  //   source: "node-1",
  //   target: "node-3",
  //   // animated: true,
  //   type: "step",
  // },
  {
    id: "parenttochild-edge",
    source: "node-1",
    target: "node-2",
    type: "step",
  },
  {
    id: "spousetochild-edge",
    source: "node-3",
    target: "node-2",
    type: "step",
  },
];
const extendedNodes = [
  ...defaultNodes,
  // Spouse for ChildNode
  {
    id: "node-4",
    position: { x: 600, y: 200 }, // x = childNode.x + 400, y = childNode.y
    type: "spouseNode",
    data: {
      label: "ChildNode's Spouse",
    },
  },
  // Grandchildren
  {
    id: "node-5",
    position: { x: 400, y: 400 },
    type: "childNode",
    data: {
      label: "Grandchild 1",
    },
  },
];

const extendedEdges = [
  ...defaultEdges,
  // {
  //   id: "child-spouse-edge",
  //   source: "node-2",
  //   target: "node-4",
  //   type: "step",
  // },
  {
    id: "child-to-grandchild1-edge",
    source: "node-2",
    target: "node-5",
    type: "step",
  },
  {
    id: "child-spouse-to-grandchild1-edge",
    source: "node-4",
    target: "node-5",
    type: "step",
  },
];

const sharedStyles = {
  familyMember: {
    textAlign: "center",
    maxWidth: "150px",
  },
  photoFrame: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 10px auto",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  photo: {
    width: "90%",
    height: "90%",
    borderRadius: "50%",
    objectFit: "cover",
  },
  name: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
    margin: "0",
  },
};

function ParentNode({ data }: { data: { label: string; imageUrl?: string } }) {
  return (
    <>
      {/* <NodeToolbar isVisible={true} position={Position.Bottom}>
        <button>Add Child</button>
      </NodeToolbar>
      <NodeToolbar isVisible={true} position={Position.Left}>
        <button>Add Spouse</button>
      </NodeToolbar> */}
      <div style={{ textAlign: "center", maxWidth: "150px" }}>
        <Handle type="source" position={Position.Right} />
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 10px auto",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            border: "4px solid #2196F3",
          }}
        >
          <img
            src={"https://avatar.iran.liara.run/public/19"}
            alt={data.label}
            style={{
              width: "90%",
              height: "90%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>
        <p style={sharedStyles.name}>{data.label}</p>
        {/* <Handle type="target" position={Position.Top} /> */}
      </div>
    </>
  );
}

// **Child Node**
function ChildNode({ data }: { data: { label: string; imageUrl?: string } }) {
  return (
    <div style={{ textAlign: "center", maxWidth: "150px" }}>
      <Handle type="source" position={Position.Right} />
      <div
        style={{
          ...sharedStyles.photoFrame,
          border: "4px solid #4CAF50" /* Green Border */,
        }}
      >
        <img
          src={"https://avatar.iran.liara.run/public/19"}
          alt={data.label}
          style={{
            width: "90%",
            height: "90%",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>
      <p style={sharedStyles.name}>{data.label}</p>
      <Handle type="target" position={Position.Top} />
    </div>
  );
}

// **Spouse Node**
function SpouseNode({ data }: { data: { label: string } }) {
  return (
    <div style={{ textAlign: "center", maxWidth: "150px" }}>
      <Handle type="source" position={Position.Left} />
      <div
        style={{
          ...sharedStyles.photoFrame,
          border: "4px solid #FF5722" /* Orange Border */,
        }}
      >
        <img
          src={"https://avatar.iran.liara.run/public/19"}
          alt={data.label}
          style={{
            width: "90%",
            height: "90%",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>
      <p style={sharedStyles.name}>{data.label}</p>
      <Handle type="target" position={Position.Top} />
    </div>
  );
}

export default function Demo() {
  const nodeTypes = useMemo(
    () => ({
      parentNode: ParentNode,
      childNode: ChildNode,
      spouseNode: SpouseNode,
    }),
    []
  );
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        defaultNodes={extendedNodes}
        nodeTypes={nodeTypes}
        defaultEdges={extendedEdges}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
