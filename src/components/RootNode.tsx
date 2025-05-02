import useFamilyStore from "../store/familyStore";
import { FamilyNode } from "../types/family";

interface RootNodeProps {
  id: string;
  data: {
    name: string;
    label: string;
  };
}

const RootNode = ({ id, data }: RootNodeProps) => {
  const { addNode, addEdge } = useFamilyStore();

  const handleAddChild = () => {
    const childId = `child-${Date.now()}`;
    const childNode: FamilyNode = {
      id: childId,
      type: "child",
      position: { x: 0, y: 100 },
      data: {
        id: childId,
        name: "Child",
        position: { x: 0, y: 100 },
        parentId: id,
        label: "",
      },
    };

    const childEdge = {
      id: `edge-${id}-${childId}`,
      source: id,
      target: childId,
      type: "smoothstep",
      sourceHandle: "bottom",
      targetHandle: "top",
    };

    addNode(childNode);
    addEdge(childEdge);
  };

  const handleAddSpouse = () => {
    const spouseId = `spouse-${Date.now()}`;
    const spouseNode: FamilyNode = {
      id: spouseId,
      type: "spouse",
      position: { x: 100, y: 0 },
      data: {
        id: spouseId,
        name: "Spouse",
        position: { x: 100, y: 0 },
        parentId: id,
        label: "",
      },
    };

    const spouseEdge = {
      id: `edge-${id}-${spouseId}`,
      source: id,
      target: spouseId,
      type: "straight",
      sourceHandle: "right",
      targetHandle: "left",
    };

    addNode(spouseNode);
    addEdge(spouseEdge);
  };

  return (
    <div className="root-node">
      <div className="node-content">
        <div className="node-name">{data.name}</div>
        <div className="node-label">{data.label}</div>
      </div>
      <div className="node-actions">
        <button onClick={handleAddChild}>Add Child</button>
        <button onClick={handleAddSpouse}>Add Spouse</button>
      </div>
    </div>
  );
};

export default RootNode; 