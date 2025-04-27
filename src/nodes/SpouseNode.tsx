import { Handle, Position } from "@xyflow/react";
import { Card } from "antd";
import { NodeContent } from "../components/NodeContent";
import { sharedStyles } from "../styles/sharedStyles";
import { NodeData } from "../types/family";

function SpouseNode({
  data,
  isConnectable,
}: {
  data: NodeData;
  isConnectable?: boolean;
}) {
  return (
    <Card
      className="family-node spouse-node"
      style={{
        ...sharedStyles.familyMember,
        border: "2px solid #722ed1",
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
        style={{ background: "#722ed1" }}
      />
      <NodeContent data={data} borderColor="#722ed1" />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{ background: "#722ed1" }}
      />
    </Card>
  );
}

export default SpouseNode;
