import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  XYPosition,
} from "@xyflow/react";

export interface NodeData {
  id: string;
  name: string;
  position: XYPosition;
  imageUrl?: string | undefined;
  [key: string]: string | number | boolean | XYPosition | undefined;
}

export type FamilyNodeType = "parent" | "spouse" | "child";

export interface FamilyNode extends Node {
  type: FamilyNodeType;
  data: NodeData;
}

export interface FamilyStore {
  nodes: FamilyNode[];
  edges: Edge[];

  // Actions
  setNodes: (
    nodes: FamilyNode[] | ((nds: FamilyNode[]) => FamilyNode[])
  ) => void;
  setEdges: (edges: Edge[] | ((eds: Edge[]) => Edge[])) => void;

  // CRUD Operations
  addNode: (node: FamilyNode) => void;
  updateNode: (nodeId: string, data: NodeData) => void;
  deleteNode: (nodeId: string) => void;
  addEdge: (edge: Edge) => void;
  deleteEdge: (edgeId: string) => void;
}

export type FamilyStoreState = FamilyStore;

// Helper types for React Flow
export type OnNodesChange = (changes: NodeChange[]) => void;
export type OnEdgesChange = (changes: EdgeChange[]) => void;
export type OnConnect = (connection: Connection) => void;
