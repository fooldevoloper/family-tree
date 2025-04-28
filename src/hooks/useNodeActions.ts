import { useState } from "react";
import { FamilyTree } from "../services/FamilyTree";
import { NodeData } from "../types/family";

export const useNodeActions = (
  data: NodeData,
  familyTree?: FamilyTree,
  onAddSpouse?: () => void,
  onAddChild?: () => void
) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddSpouse = () => {
    if (onAddSpouse) {
      onAddSpouse();
      return;
    }

    if (familyTree) {
      familyTree.addSpouse(data.id);
    }
  };

  const handleAddChild = () => {
    if (onAddChild) {
      onAddChild();
      return;
    }

    if (familyTree) {
      familyTree.addChild(data.id);
    }
  };

  return {
    isHovered,
    setIsHovered,
    handleAddSpouse,
    handleAddChild,
  };
};
