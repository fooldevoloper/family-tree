import { UserOutlined } from "@ant-design/icons";
import { Avatar, Input, Typography } from "antd";
import { useState } from "react";
import useFamilyStore from "../store/familyStore";
import { NodeData } from "../types/family";

const { Text } = Typography;

interface NodeContentProps {
  data: NodeData;
  borderColor: string;
}

export function NodeContent({ data, borderColor }: NodeContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(data.name);
  const { updateNode } = useFamilyStore();

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleNameSubmit = () => {
    updateNode(data.id, { ...data, name });
    setIsEditing(false);
  };

  return (
    <div
      style={{
        textAlign: "center",
        width: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        <Avatar
          size={64}
          icon={<UserOutlined />}
          src={data.imageUrl || "https://avatar.iran.liara.run/public/19"}
          style={{
            border: `2px solid ${borderColor}`,
          }}
        />
      </div>
      <div
        style={{
          marginTop: 8,
          maxWidth: "100%",
          minHeight: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isEditing ? (
          <Input
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            onPressEnter={handleNameSubmit}
            onBlur={handleNameSubmit}
            autoFocus
            bordered={false}
            style={{
              textAlign: "center",
              maxWidth: "100%",
              fontSize: "12px",
              height: "24px",
              padding: "2px 8px",
              backgroundColor: "transparent",
              cursor: "text",
              border: "none",
              boxShadow: "none",
              outline: "none",
              borderRadius: "4px",
              color: "inherit",
            }}
          />
        ) : (
          <Text
            style={{
              fontSize: "12px",
              cursor: "pointer",
              padding: "2px 8px",
              borderRadius: "4px",
              display: "inline-block",
              maxWidth: "100%",
              wordBreak: "break-word",
              whiteSpace: "normal",
              lineHeight: "1.2",
              textAlign: "center",
            }}
            onClick={() => setIsEditing(true)}
          >
            {name}
          </Text>
        )}
      </div>
    </div>
  );
}
