import { Edge } from '@xyflow/react';
import { create } from 'zustand';
import { FamilyNode, FamilyStoreState } from '../types/family';

const useFamilyStore = create<FamilyStoreState>((set) => ({
  nodes: [],
  edges: [],

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
      // Function to recursively find all child node IDs
      const findChildNodeIds = (parentId: string): string[] => {
        const directChildren = state.nodes.filter((node) => node.data.parentId === parentId);
        const childIds = directChildren.map((child) => child.id);
        const grandChildIds = directChildren.flatMap((child) => findChildNodeIds(child.id));
        return [...childIds, ...grandChildIds];
      };

      // Find connected spouse nodes through edges
      const findSpouseNodeIds = (nodeId: string): string[] => {
        const spouseEdges = state.edges.filter(
          (edge) => (edge.source === nodeId || edge.target === nodeId) && edge.type === 'straight' // Assuming straight edges are spouse connections
        );
        return spouseEdges.map((edge) => (edge.source === nodeId ? edge.target : edge.source));
      };

      // Get all child node IDs to delete
      const childNodeIds = findChildNodeIds(nodeId);
      // Get all spouse node IDs to delete
      const spouseNodeIds = findSpouseNodeIds(nodeId);
      const allNodeIdsToDelete = [nodeId, ...childNodeIds, ...spouseNodeIds];

      // Filter out all nodes to be deleted
      const newNodes = state.nodes.filter((node) => !allNodeIdsToDelete.includes(node.id));

      // Filter out all edges connected to deleted nodes
      const newEdges = state.edges.filter(
        (edge) =>
          !allNodeIdsToDelete.includes(edge.source) && !allNodeIdsToDelete.includes(edge.target)
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
