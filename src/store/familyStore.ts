import { create } from "zustand";
import { FamilyNode, FamilyNodeType, FamilyStoreState } from "../types/family";

const STORAGE_KEY = 'family-tree-data';

const defaultParentNode: FamilyNode = {
  id: "root-parent",
  type: "parent" as FamilyNodeType,
  position: { x: 0, y: 0 },
  data: {
    id: "root-parent",
    name: "Root Parent",
    position: { x: 0, y: 0 },
    label: "",
  },
};

// Load initial state from sessionStorage
const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return { nodes: [defaultParentNode], edges: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from sessionStorage:', err);
    return { nodes: [defaultParentNode], edges: [] };
  }
};

// Save state to sessionStorage
const saveState = (state: { nodes: FamilyNode[]; edges: any[] }) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error('Error saving state to sessionStorage:', err);
  }
};

const useFamilyStore = create<FamilyStoreState>((set) => ({
  nodes: loadState().nodes,
  edges: loadState().edges,

  setNodes: (nodes) =>
    set((state) => {
      const newNodes = typeof nodes === "function" ? nodes(state.nodes) : nodes;
      const newState = { ...state, nodes: newNodes };
      saveState(newState);
      return { nodes: newNodes };
    }),

  setEdges: (edges) =>
    set((state) => {
      const newEdges = typeof edges === "function" ? edges(state.edges) : edges;
      const newState = { ...state, edges: newEdges };
      saveState(newState);
      return { edges: newEdges };
    }),

  addNode: (node) =>
    set((state) => {
      const newNodes = [...state.nodes, node];
      const newState = { ...state, nodes: newNodes };
      saveState(newState);
      return { nodes: newNodes };
    }),

  updateNode: (nodeId, data) =>
    set((state) => {
      const newNodes = state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      );
      const newState = { ...state, nodes: newNodes };
      saveState(newState);
      return { nodes: newNodes };
    }),

  deleteNode: (nodeId) =>
    set((state) => {
      const newNodes = state.nodes.filter((node) => node.id !== nodeId);
      const newEdges = state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      );
      const newState = { ...state, nodes: newNodes, edges: newEdges };
      saveState(newState);
      return { nodes: newNodes, edges: newEdges };
    }),

  addEdge: (edge) =>
    set((state) => {
      const newEdges = [...state.edges, edge];
      const newState = { ...state, edges: newEdges };
      saveState(newState);
      return { edges: newEdges };
    }),

  deleteEdge: (edgeId) =>
    set((state) => {
      const newEdges = state.edges.filter((edge) => edge.id !== edgeId);
      const newState = { ...state, edges: newEdges };
      saveState(newState);
      return { edges: newEdges };
    }),
}));

export default useFamilyStore;
