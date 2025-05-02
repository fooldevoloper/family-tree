import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Handle, Position } from "@xyflow/react";
import { Button, Card } from "antd";
import { useState } from "react";
import { NodeContent } from "../components/NodeContent";
import useFamilyStore from "../store/familyStore";
import { sharedStyles } from "../styles/sharedStyles";
import { NodeData } from "../types/family";

function ChildNode({
  data,
  isConnectable,
}: {
  data: NodeData;
  isConnectable?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { addNode, addEdge, nodes, deleteNode } = useFamilyStore();

  const handleDelete = () => {
    deleteNode(data.id);
  };

  const handleAddSpouse = () => {
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
        parentId: data.id,
        canAddChildren: false,
        canAddSpouse: false,
      },
    };

    addNode(newNode);
    addEdge({
      id: `edge-${data.id}-${newNode.id}`,
      source: data.id,
      target: newNode.id,
      type: "straight",
      sourceHandle: "right",
      targetHandle: "left",
      style: { stroke: "#52c41a" },
    });
  };

  const handleAddChild = () => {
    // Count existing children
    const existingChildren = nodes.filter(
      (node) => node.type === "child" && node.data.parentId === data.id
    );
    const childCount = existingChildren.length;

    // Calculate position for new child
    const baseX = data.position.x;
    const baseY = data.position.y + 200;
    const nodeWidth = 180;
    const bufferSpace = 100;
    const spacing = nodeWidth + bufferSpace;

    let newX: number;
    if (childCount === 0) {
      // First child - place directly below parent
      newX = baseX;
    } else {
      // Subsequent children - space out from the first child
      const firstChild = nodes.find(
        (node) => node.type === "child" && node.data.parentId === data.id
      );
      if (firstChild) {
        // Place new child to the right of the first child with increased spacing
        newX = firstChild.position.x + childCount * spacing;
      } else {
        // Fallback if first child not found
        newX = baseX + childCount * spacing;
      }
    }

    const newNode = {
      id: `node-${Date.now()}`,
      type: "child" as const,
      position: {
        x: newX,
        y: baseY,
      },
      data: {
        id: `node-${Date.now()}`,
        name: "Child",
        position: {
          x: newX,
          y: baseY,
        },
        label: "",
        parentId: data.id,
        canAddChildren: true,
        canAddSpouse: true,
      },
    };

    addNode(newNode);
    addEdge({
      id: `edge-${data.id}-${newNode.id}`,
      source: data.id,
      target: newNode.id,
      type: "smoothstep",
    });
  };

  return (
    <Card
      className="family-node child-node"
      style={{
        ...sharedStyles.familyMember,
        border: "2px solid #52c41a",
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
        style={{ background: "#52c41a" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        isConnectable={isConnectable}
        style={{ background: "#52c41a" }}
      />
      <NodeContent data={data} borderColor="#52c41a" />
      {isHovered && (
        <Button
          type="primary"
          shape="circle"
          icon={<CloseOutlined />}
          size="small"
          onClick={handleDelete}
          style={{
            position: "absolute",
            right: "-12px",
            top: "-12px",
            zIndex: 1,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            background: "#ff4d4f",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "24px",
            height: "24px",
            cursor: "pointer",
          }}
        />
      )}
      {isHovered && data.canAddSpouse && (
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="small"
          onClick={handleAddSpouse}
          style={{
            position: "absolute",
            right: "-12px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            background: "#52c41a",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "24px",
            height: "24px",
            cursor: "pointer",
          }}
        />
      )}
      {isHovered && data.canAddChildren && (
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
            background: "#52c41a",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "24px",
            height: "24px",
            cursor: "pointer",
          }}
        />
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{ background: "#52c41a" }}
      />
    </Card>
  );
}

export default ChildNode;
