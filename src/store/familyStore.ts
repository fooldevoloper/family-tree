import { create } from "zustand";
import { FamilyNode, FamilyNodeType, FamilyStoreState } from "../types/family";

const defaultParentNode: FamilyNode = {
  id: "root-parent",
  type: "parent" as FamilyNodeType,
  position: { x: 0, y: 0 },
  data: {
    id: "root-parent",
    name: "Root Parent",
    position: { x: 0, y: 0 },
  },
};

const useFamilyStore = create<FamilyStoreState>((set) => ({
  nodes: [defaultParentNode],
  edges: [],

  setNodes: (nodes) =>
    set((state) => ({
      nodes: typeof nodes === "function" ? nodes(state.nodes) : nodes,
    })),

  setEdges: (edges) =>
    set((state) => ({
      edges: typeof edges === "function" ? edges(state.edges) : edges,
    })),

  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),

  updateNode: (nodeId, data) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      ),
    })),

  deleteNode: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      edges: state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
    })),

  addEdge: (edge) =>
    set((state) => ({
      edges: [...state.edges, edge],
    })),

  deleteEdge: (edgeId) =>
    set((state) => ({
      edges: state.edges.filter((edge) => edge.id !== edgeId),
    })),
}));

export default useFamilyStore;
