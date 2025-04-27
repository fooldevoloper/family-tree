import { UserOutlined } from "@ant-design/icons";
import { Handle, Position } from "@xyflow/react";
import { Avatar, Card, Typography } from "antd";
import { sharedStyles } from "../styles/sharedStyles";
import { NodeData } from "../types";

const { Text } = Typography;

interface ChildNodeProps {
  data: NodeData;
}

export function ChildNode({ data }: ChildNodeProps) {
  return (
    <Card
      style={{
        ...sharedStyles.familyMember,
        border: "2px solid #52c41a",
        padding: "12px",
      }}
    >
      <Handle type="source" position={Position.Right} />
      <Avatar
        size={80}
        icon={<UserOutlined />}
        src={data.imageUrl || "https://avatar.iran.liara.run/public/19"}
        style={{
          marginBottom: "8px",
          border: "3px solid #52c41a",
        }}
      />
      <Text strong style={sharedStyles.name}>
        {data.label}
      </Text>
      <Handle type="target" position={Position.Top} />
    </Card>
  );
}
