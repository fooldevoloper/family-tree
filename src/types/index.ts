import { Node } from '@xyflow/react';

export interface NodeData {
  label: string;
  imageUrl?: string;
  [key: string]: unknown;
}

export interface FamilyNode extends Node {
  id: string;
  position: { x: number; y: number };
  type: string;
  data: NodeData;
}

export interface FamilyEdge {
  id: string;
  source: string;
  target: string;
  type: string;
}

export interface SharedStyles {
  familyMember: React.CSSProperties;
  photoFrame: React.CSSProperties;
  photo: React.CSSProperties;
  name: React.CSSProperties;
}
