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
  const { addNode, addEdge } = useFamilyStore();

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
          onClick={onAddChild}
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
