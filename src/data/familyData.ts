import { FamilyEdge, FamilyNode } from "../types";

export const defaultNodes: FamilyNode[] = [
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

export const defaultEdges: FamilyEdge[] = [
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

export const extendedNodes: FamilyNode[] = [
  ...defaultNodes,
  {
    id: "node-4",
    position: { x: 600, y: 200 },
    type: "spouseNode",
    data: {
      label: "ChildNode's Spouse",
    },
  },
  {
    id: "node-5",
    position: { x: 400, y: 400 },
    type: "childNode",
    data: {
      label: "Grandchild 1",
    },
  },
];

export const extendedEdges: FamilyEdge[] = [
  ...defaultEdges,
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
