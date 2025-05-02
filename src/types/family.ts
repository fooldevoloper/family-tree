import { Connection, Edge, EdgeChange, Node, NodeChange } from '@xyflow/react';

export type FamilyNodeType = 'parent' | 'spouse' | 'child' | 'thread';

export interface NodeData {
  id: string;
  name: string;
  position: { x: number; y: number };
  label: string;
  parentId?: string;
  imageUrl?: string;
  canAddChildren?: boolean;
  canAddSpouse?: boolean;
  [key: string]: unknown;
}

export interface FamilyNode extends Node {
  type: FamilyNodeType;
  data: NodeData;
}

export interface FamilyStore {
  nodes: FamilyNode[];
  edges: Edge[];

  // Actions
  setNodes: (nodes: FamilyNode[] | ((nds: FamilyNode[]) => FamilyNode[])) => void;
  setEdges: (edges: Edge[] | ((eds: Edge[]) => Edge[])) => void;

  // CRUD Operations
  addNode: (node: FamilyNode) => void;
  updateNode: (nodeId: string, data: Partial<NodeData>) => void;
  deleteNode: (nodeId: string) => void;
  addEdge: (edge: Edge) => void;
  deleteEdge: (edgeId: string) => void;

  // Import/Export Operations
  importJson: (jsonData: string | { nodes: FamilyNode[]; edges: Edge[] }) => void;
}

export type FamilyStoreState = FamilyStore;

// Helper types for React Flow
export type OnNodesChange = (changes: NodeChange[]) => void;
export type OnEdgesChange = (changes: EdgeChange[]) => void;
export type OnConnect = (connection: Connection) => void;
