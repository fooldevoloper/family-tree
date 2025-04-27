"use client";
import { Background, ReactFlow } from "@xyflow/react";
import { ConfigProvider, theme } from "antd";
import { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { extendedEdges, extendedNodes } from "./data/familyData";
import { ChildNode } from "./nodes/ChildNode";
import { ParentNode } from "./nodes/ParentNode";
import { SpouseNode } from "./nodes/SpouseNode";

function FamilyTree() {
  const nodeTypes = useMemo(
    () => ({
      parentNode: ParentNode,
      childNode: ChildNode,
      spouseNode: SpouseNode,
    }),
    []
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
        <div style={{ width: "100%", height: "calc(100vh - 64px - 70px)" }}>
          <ReactFlow
            defaultNodes={extendedNodes}
            nodeTypes={nodeTypes}
            defaultEdges={extendedEdges}
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
