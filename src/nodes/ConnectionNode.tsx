import { PlusOutlined } from '@ant-design/icons';
import { Handle, Position } from '@xyflow/react';
import { Button } from 'antd';
import { useState } from 'react';

interface ConnectionNodeData {
  id: string;
  name: string;
  position: { x: number; y: number };
  label: string;
  parentIds?: string[];
  canAddChildren?: boolean;
  canAddSpouse?: boolean;
  onAddChild?: () => void;
}

export const ConnectionNode = ({
  data,
  isConnectable = true,
}: {
  data: ConnectionNodeData;
  isConnectable?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const borderColor = '#1890ff';

  const handleAddChild = () => {
    if (data.onAddChild) {
      data.onAddChild();
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '0',
        height: '0',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ background: borderColor }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{ background: borderColor }}
      />
      {isHovered && data.canAddChildren && (
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="small"
          onClick={handleAddChild}
          style={{
            position: 'absolute',
            bottom: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            background: borderColor,
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
          }}
        />
      )}
    </div>
  );
};
