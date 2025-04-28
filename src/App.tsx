"use client";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Edge,
  NodeTypes,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlow,
} from "@xyflow/react";
import { ConfigProvider, theme } from "antd";
import { useCallback, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import ChildNode from "./nodes/ChildNode";
import ParentNode from "./nodes/ParentNode";
import SpouseNode from "./nodes/SpouseNode";
import useFamilyStore from "./store/familyStore";
import { FamilyNode } from "./types/family";

const nodeTypes: NodeTypes = {
  parent: ParentNode,
  child: ChildNode,
  spouse: SpouseNode,
};

function FamilyTree() {
  const { nodes, edges, setNodes, setEdges } = useFamilyStore();

  useEffect(() => {
    // Center the default parent node in the view
    if (nodes.length === 1) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const centeredX = viewportWidth / 2 - 100; // 100 is half of the node width
      const centeredY = viewportHeight / 2 - 100; // 100 is half of the node height

      setNodes((nds) =>
        nds.map((node) =>
          node.id === "root-parent"
            ? {
                ...node,
                position: { x: centeredX, y: centeredY },
                data: {
                  ...node.data,
                  position: { x: centeredX, y: centeredY },
                },
              }
            : node
        )
      );
    }
  }, [nodes.length, setNodes]);

  const onNodesChange = useCallback<OnNodesChange>(
    (changes) => {
      setNodes(
        (nds: FamilyNode[]) => applyNodeChanges(changes, nds) as FamilyNode[]
      );
    },
    [setNodes]
  );

  const onEdgesChange = useCallback<OnEdgesChange>(
    (changes) => {
      setEdges((eds: Edge[]) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  const onConnect = useCallback<OnConnect>(
    (connection) => {
      setEdges((eds: Edge[]) => addEdge(connection, eds));
    },
    [setEdges]
  );

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 8,
        },
      }}
    >
      <Layout>
        <div
          style={{ width: "100%", height: "calc(100vh - 64px - 70px)" }}
          id="family-tree-container"
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
          </ReactFlow>
        </div>
      </Layout>
    </ConfigProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <FamilyTree />
    </BrowserRouter>
  );
}
