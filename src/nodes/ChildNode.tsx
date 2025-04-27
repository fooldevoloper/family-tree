import { Handle, Position } from "@xyflow/react";
import { Card } from "antd";
import { NodeContent } from "../components/NodeContent";
import { sharedStyles } from "../styles/sharedStyles";
import { NodeData } from "../types/family";

function ChildNode({
  data,
  isConnectable,
}: {
  data: NodeData;
  isConnectable?: boolean;
}) {
  return (
    <Card
      className="family-node child-node"
      style={{
        ...sharedStyles.familyMember,
        border: "2px solid #52c41a",
        padding: "8px",
        width: "180px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
      bodyStyle={{ padding: "8px" }}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ background: "#52c41a" }}
      />
      <NodeContent data={data} borderColor="#52c41a" />
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
