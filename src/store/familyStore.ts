import { Edge } from '@xyflow/react';
import { create } from 'zustand';
import { FamilyNode, FamilyStoreState } from '../types/family';
import { defaultFamilyData } from '../data/defaultFamilyData';

const useFamilyStore = create<FamilyStoreState>((set) => ({
  nodes: defaultFamilyData.nodes,
  edges: defaultFamilyData.edges,
  // nodes: [],
  // edges: [],

  setNodes: (nodes) =>
    set((state) => {
      const newNodes = typeof nodes === 'function' ? nodes(state.nodes) : nodes;
      return { nodes: newNodes };
    }),

  setEdges: (edges) =>
    set((state) => {
      const newEdges = typeof edges === 'function' ? edges(state.edges) : edges;
      return { edges: newEdges };
    }),

  addNode: (node) =>
    set((state) => {
      // If adding a root node and there are existing nodes, clear the state first
      if (node.type === 'parent' && state.nodes.length > 0) {
        return { nodes: [node], edges: [] };
      }

      const newNodes = [...state.nodes, node];
      return { nodes: newNodes };
    }),

  updateNode: (nodeId, data) =>
    set((state) => {
      const newNodes = state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      );
      return { nodes: newNodes };
    }),

  deleteNode: (nodeId) =>
    set((state) => {
      // Find the node by id or data.id
      const nodeToDelete = state.nodes.find(
        node => node.id === nodeId || node.data.id === nodeId
      );

      if (!nodeToDelete) {
        return state;
      }

      // Remove only the selected node
      const newNodes = state.nodes.filter(
        node => node.id !== nodeToDelete.id
      );

      // Remove any edges connected to this node
      const newEdges = state.edges.filter(
        edge => edge.source !== nodeToDelete.id && edge.target !== nodeToDelete.id
      );

      return { nodes: newNodes, edges: newEdges };
    }),

  addEdge: (edge) =>
    set((state) => {
      const newEdges = [...state.edges, edge];
      return { edges: newEdges };
    }),

  deleteEdge: (edgeId) =>
    set((state) => {
      const newEdges = state.edges.filter((edge) => edge.id !== edgeId);
      return { edges: newEdges };
    }),

  importJson: (jsonData: string | { nodes: FamilyNode[]; edges: Edge[] }) =>
    set((state) => {
      try {
        const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
        if (!data.nodes || !data.edges) {
          throw new Error('Invalid JSON format: missing nodes or edges');
        }
        return { nodes: data.nodes, edges: data.edges };
      } catch (error) {
        console.error('Error importing JSON:', error);
        return state;
      }
    }),
}));

export default useFamilyStore;
