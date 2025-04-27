import { PlusOutlined } from "@ant-design/icons";
import { Handle, Position } from "@xyflow/react";
import { Button, Card } from "antd";
import { useState } from "react";
import { NodeContent } from "../components/NodeContent";
import useFamilyStore from "../store/familyStore";
import { sharedStyles } from "../styles/sharedStyles";
import { NodeData } from "../types/family";

function ParentNode({
  data,
  isConnectable,
}: {
  data: NodeData;
  isConnectable?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { addNode, addEdge } = useFamilyStore();

  const handleAddChild = () => {
    const newNode = {
      id: `node-${Date.now()}`,
      type: "child" as const,
      position: { x: data.position.x, y: data.position.y + 150 },
      data: {
        id: `node-${Date.now()}`,
        name: "",
        position: { x: data.position.x, y: data.position.y + 150 },
        label: "",
      },
    };

    addNode(newNode);
    addEdge({
      id: `edge-${Date.now()}`,
      source: data.id,
      target: newNode.id,
      type: "smoothstep",
    });
  };

  const handleAddSpouse = () => {
    const newNode = {
      id: `node-${Date.now()}`,
      type: "spouse" as const,
      position: { x: data.position.x + 200, y: data.position.y },
      data: {
        id: `node-${Date.now()}`,
        name: "",
        position: { x: data.position.x + 200, y: data.position.y },
        label: "",
      },
    };

    addNode(newNode);
    addEdge({
      id: `edge-${Date.now()}`,
      source: data.id,
      target: newNode.id,
      type: "smoothstep",
    });
  };

  return (
    <Card
      className="family-node parent-node"
      style={{
        ...sharedStyles.familyMember,
        border: "2px solid #1890ff",
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
        style={{ background: "#1890ff" }}
      />
      {isHovered && (
        <>
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            size="small"
            onClick={handleAddChild}
            style={{
              position: "absolute",
              top: "-12px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1,
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              background: "#1890ff",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "24px",
              height: "24px",
            }}
          />
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
              background: "#1890ff",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "24px",
              height: "24px",
            }}
          />
        </>
      )}
      <NodeContent data={data} borderColor="#1890ff" />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{ background: "#1890ff" }}
      />
    </Card>
  );
}

export default ParentNode;
