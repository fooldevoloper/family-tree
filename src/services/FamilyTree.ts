import { Edge } from "@xyflow/react";
import { FamilyNode, NodeData } from "../types/family";
import { NodeService } from "./nodeService";

export class FamilyTree {
  private rootNode: FamilyNode;
  private nodes: FamilyNode[] = [];
  private edges: Edge[] = [];
  private nodeService: NodeService;

  constructor(rootData: Partial<NodeData> = {}) {
    this.nodeService = NodeService.getInstance();
    this.rootNode = this.createRootNode(rootData);
    this.nodes = [this.rootNode];
  }

  private createRootNode(data: Partial<NodeData>): FamilyNode {
    return {
      id: data.id || "root-parent",
      type: "parent",
      position: data.position || { x: 0, y: 0 },
      data: {
        id: data.id || "root-parent",
        name: data.name || "Root Parent",
        position: data.position || { x: 0, y: 0 },
        label: data.label || "Root",
        canAddChildren: true,
        canAddSpouse: true,
      },
    };
  }

  public getTree(): { nodes: FamilyNode[]; edges: Edge[] } {
    return {
      nodes: this.nodes,
      edges: this.edges,
    };
  }

  public addSpouse(parentId: string, spouseData: Partial<NodeData> = {}): void {
    const parentNode = this.nodes.find((node) => node.id === parentId);
    if (!parentNode) return;

    const spouseNodeData = this.nodeService.createSpouseNode(
      parentId,
      parentNode.position
    );

    // Update spouse data if provided
    if (spouseData.name) spouseNodeData.name = spouseData.name;
    if (spouseData.label) spouseNodeData.label = spouseData.label;

    const spouseNode: FamilyNode = {
      id: spouseNodeData.id,
      type: "spouse",
      position: spouseNodeData.position,
      data: {
        ...spouseNodeData,
        parentId,
        canAddChildren: false,
        canAddSpouse: false,
      },
    };

    this.nodes.push(spouseNode);
    this.edges.push({
      id: `edge-${parentId}-${spouseNode.id}`,
      source: parentId,
      target: spouseNode.id,
      type: "straight",
    });
  }

  public addChild(parentId: string, childData: Partial<NodeData> = {}): void {
    const parentNode = this.nodes.find((node) => node.id === parentId);
    if (!parentNode) return;

    const childCount = this.nodeService.getExistingChildrenCount(parentId);
    const childNodeData = this.nodeService.createChildNode(
      parentId,
      parentNode.position,
      childCount
    );

    // Update child data if provided
    if (childData.name) childNodeData.name = childData.name;
    if (childData.label) childNodeData.label = childData.label;

    const childNode: FamilyNode = {
      id: childNodeData.id,
      type: "child",
      position: childNodeData.position,
      data: {
        ...childNodeData,
        parentId,
        canAddChildren: true,
        canAddSpouse: true,
      },
    };

    this.nodes.push(childNode);
    this.edges.push({
      id: `edge-${parentId}-${childNode.id}`,
      source: parentId,
      target: childNode.id,
      type: "straight",
    });
  }

  public updateNode(nodeId: string, data: Partial<NodeData>): void {
    const nodeIndex = this.nodes.findIndex((node) => node.id === nodeId);
    if (nodeIndex === -1) return;

    this.nodes[nodeIndex] = {
      ...this.nodes[nodeIndex],
      data: {
        ...this.nodes[nodeIndex].data,
        ...data,
      },
    };
  }

  public removeNode(nodeId: string): void {
    // Find all nodes to remove (including children)
    const nodesToRemove = new Set<string>();
    const findNodesToRemove = (id: string) => {
      nodesToRemove.add(id);
      const children = this.nodes.filter((node) => node.data.parentId === id);
      children.forEach((child) => findNodesToRemove(child.id));
    };
    findNodesToRemove(nodeId);

    // Remove all nodes and their edges in a single operation
    this.nodes = this.nodes.filter((node) => !nodesToRemove.has(node.id));
    this.edges = this.edges.filter(
      (edge) =>
        !nodesToRemove.has(edge.source) && !nodesToRemove.has(edge.target)
    );
  }

  public getNode(nodeId: string): FamilyNode | undefined {
    return this.nodes.find((node) => node.id === nodeId);
  }

  public getChildren(parentId: string): FamilyNode[] {
    return this.nodes.filter((node) => node.data.parentId === parentId);
  }

  public getSpouse(nodeId: string): FamilyNode | undefined {
    const spouseEdge = this.edges.find(
      (edge) =>
        (edge.source === nodeId || edge.target === nodeId) &&
        edge.type === "straight"
    );
    if (!spouseEdge) return undefined;

    const spouseId =
      spouseEdge.source === nodeId ? spouseEdge.target : spouseEdge.source;
    return this.nodes.find((node) => node.id === spouseId);
  }
}
