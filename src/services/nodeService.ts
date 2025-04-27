import { NodeData } from "../types/family";
import { FamilyTree } from "./FamilyTree";

export class NodeService {
  private static instance: NodeService;
  private familyTree: FamilyTree;

  private constructor() {
    this.familyTree = new FamilyTree();
  }

  public static getInstance(): NodeService {
    if (!NodeService.instance) {
      NodeService.instance = new NodeService();
    }
    return NodeService.instance;
  }

  public createSpouseNode(
    parentId: string,
    parentPosition: { x: number; y: number }
  ): NodeData {
    const id = `spouse-${Date.now()}`;
    return {
      id,
      name: "New Spouse",
      position: {
        x: parentPosition.x + 200,
        y: parentPosition.y,
      },
      label: "Spouse",
      parentId,
    };
  }

  public createChildNode(
    parentId: string,
    parentPosition: { x: number; y: number },
    childCount: number
  ): NodeData {
    const id = `child-${Date.now()}`;
    return {
      id,
      name: "New Child",
      position: {
        x: parentPosition.x + childCount * 200,
        y: parentPosition.y + 200,
      },
      label: "Child",
      parentId,
    };
  }

  public getExistingChildrenCount(parentId: string): number {
    return this.familyTree.getChildren(parentId).length;
  }
}
