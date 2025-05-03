'use client';
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
  ReactFlowInstance,
} from '@xyflow/react';
import { ConfigProvider, theme } from 'antd';
import { useCallback, useEffect, useRef } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ResizeButton } from './components/ResizeButton';
import ChildNode from './nodes/ChildNode';
import ParentNode from './nodes/ParentNode';
import SpouseNode from './nodes/SpouseNode';
import useFamilyStore from './store/familyStore';
import { FamilyNode } from './types/family';

const nodeTypes: NodeTypes = {
  parent: ParentNode,
  child: ChildNode,
  spouse: SpouseNode,
};

function FamilyTree() {
  const { nodes, edges, setNodes, setEdges } = useFamilyStore();
  const reactFlowInstance = useRef<ReactFlowInstance<FamilyNode, Edge> | null>(null);

  useEffect(() => {
    // Center the default parent node in the view
    if (nodes.length === 1) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const centeredX = viewportWidth / 2 - 100; // 100 is half of the node width
      const centeredY = viewportHeight / 2 - 100; // 100 is half of the node height

      setNodes((nds) =>
        nds.map((node) =>
          node.id === 'root-parent'
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
      setNodes((nds: FamilyNode[]) => applyNodeChanges(changes, nds) as FamilyNode[]);
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

  const onInit = useCallback((instance: ReactFlowInstance<FamilyNode, Edge>) => {
    reactFlowInstance.current = instance;
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
      }}
    >
      <Layout>
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          id="family-tree-container"
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onInit={onInit}
            defaultEdgeOptions={{
              style: { stroke: '#52c41a' },
              animated: true,
            }}
          >
            <Background />
          </ReactFlow>
          <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 5 }}>
            <ResizeButton reactFlowInstance={reactFlowInstance} />
          </div>
        </div>
      </Layout>
    </ConfigProvider>
  );
}

// Create router with future flags
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <FamilyTree />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
    } as any, // Type assertion to handle future flags
  }
);

export default function App() {
  return <RouterProvider router={router} />;
}
