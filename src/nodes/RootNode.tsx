import { PlusOutlined } from "@ant-design/icons";
import { Handle, Position } from "@xyflow/react";
import { Button, Card } from "antd";
import { useState } from "react";
import { NodeContent } from "../components/NodeContent";
import useFamilyStore from "../store/familyStore";
import { sharedStyles } from "../styles/sharedStyles";
import { NodeData } from "../types/family";

interface RootNodeProps {
  data: NodeData;
  isConnectable?: boolean;
  children?: React.ReactNode;
  borderColor?: string;
  onAddSpouse?: () => void;
  onAddChild?: () => void;
  showSpouseButton?: boolean;
  showChildButton?: boolean;
  isSpouse?: boolean;
}

export const RootNode: React.FC<RootNodeProps> = ({
  data,
  isConnectable,
  children,
  borderColor = "#1890ff",
  onAddSpouse,
  onAddChild,
  showSpouseButton = true,
  showChildButton = false,
  isSpouse = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addNode, addEdge, nodes } = useFamilyStore();

  const handleAddSpouse = () => {
    if (onAddSpouse) {
      onAddSpouse();
      return;
    }

    const newNode = {
      id: `node-${Date.now()}`,
      type: "spouse" as const,
      position: {
        x: data.position.x + 300,
        y: data.position.y,
      },
      data: {
        id: `node-${Date.now()}`,
        name: "Spouse",
        position: {
          x: data.position.x + 300,
          y: data.position.y,
        },
        label: "",
        canAddChildren: true,
        canAddSpouse: true,
      },
    };

    addNode(newNode);
    addEdge({
      id: `edge-${Date.now()}`,
      source: data.id,
      target: newNode.id,
      type: "straight",
      sourceHandle: isSpouse ? "left" : "right",
      targetHandle: isSpouse ? "right" : "left",
    });
  };

  const handleAddChild = () => {
    if (onAddChild) {
      onAddChild();
      return;
    }

    // Find the spouse node if it exists
    const spouseNode = nodes.find(
      (node) => node.type === "spouse" && node.data.parentId === data.id
    );

    // Count existing children
    const existingChildren = nodes.filter(
      (node) => node.type === "child" && node.data.parentId === data.id
    );
    const childCount = existingChildren.length;

    // Calculate base position
    let baseX = data.position.x;
    const baseY = data.position.y + 200; // Increased vertical distance from parent

    // If there's a spouse, calculate the middle point between parents
    if (spouseNode) {
      baseX = (data.position.x + spouseNode.position.x) / 2;
    }

    // Calculate spacing and offset for multiple children
    const spacing = 250; // Increased horizontal spacing between children
    const totalWidth = spacing * (childCount + 1); // Include new child in total width
    const startX = baseX - totalWidth / 2;

    const newNode = {
      id: `node-${Date.now()}`,
      type: "child" as const,
      position: {
        x: startX + childCount * spacing,
        y: baseY,
      },
      data: {
        id: `node-${Date.now()}`,
        name: "Child",
        position: {
          x: startX + childCount * spacing,
          y: baseY,
        },
        label: "",
        parentId: data.id,
        canAddChildren: true,
        canAddSpouse: true,
      },
    };

    addNode(newNode);

    if (childCount === 0) {
      // First child - connect to both parents if spouse exists
      if (spouseNode) {
        // Connect to first parent
        addEdge({
          id: `edge-${data.id}-${newNode.id}`,
          source: data.id,
          target: newNode.id,
          type: "smoothstep",
        });
        // Connect to spouse
        addEdge({
          id: `edge-${spouseNode.id}-${newNode.id}`,
          source: spouseNode.id,
          target: newNode.id,
          type: "smoothstep",
        });
      } else {
        // Only one parent - direct connection
        addEdge({
          id: `edge-${Date.now()}`,
          source: data.id,
          target: newNode.id,
          type: "smoothstep",
        });
      }
    } else {
      // For additional children, connect directly to parents
      if (spouseNode) {
        // Connect to first parent
        addEdge({
          id: `edge-${data.id}-${newNode.id}`,
          source: data.id,
          target: newNode.id,
          type: "smoothstep",
        });
        // Connect to spouse
        addEdge({
          id: `edge-${spouseNode.id}-${newNode.id}`,
          source: spouseNode.id,
          target: newNode.id,
          type: "smoothstep",
        });
      } else {
        // Only one parent - direct connection
        addEdge({
          id: `edge-${Date.now()}`,
          source: data.id,
          target: newNode.id,
          type: "smoothstep",
        });
      }
    }
  };

  return (
    <Card
      className="family-node"
      style={{
        ...sharedStyles.familyMember,
        border: `2px solid ${borderColor}`,
        padding: "8px",
        width: "180px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        position: "relative",
      }}
      bodyStyle={{ padding: "8px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ background: borderColor }}
      />
      {!isSpouse && (
        <Handle
          type="source"
          position={Position.Right}
          id="right"
          isConnectable={isConnectable}
          style={{ background: borderColor }}
        />
      )}
      {isSpouse && (
        <Handle
          type="target"
          position={Position.Left}
          id="left"
          isConnectable={isConnectable}
          style={{ background: borderColor }}
        />
      )}
      <NodeContent data={data} borderColor={borderColor} />
      {isHovered && showSpouseButton && (
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="small"
          onClick={handleAddSpouse}
          style={{
            position: "absolute",
            right: isSpouse ? "auto" : "-12px",
            left: isSpouse ? "-12px" : "auto",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            background: borderColor,
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "24px",
            height: "24px",
          }}
        />
      )}
      {isHovered && showChildButton && (
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="small"
          onClick={handleAddChild}
          style={{
            position: "absolute",
            bottom: "-12px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            background: borderColor,
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "24px",
            height: "24px",
          }}
        />
      )}
      {children}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{ background: borderColor }}
      />
    </Card>
  );
};
