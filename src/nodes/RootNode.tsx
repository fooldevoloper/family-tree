import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Handle, Position } from '@xyflow/react';
import { Button, Card, Tooltip } from 'antd';
import { useState } from 'react';
import { NodeContent } from '../components/NodeContent';
import useFamilyStore from '../store/familyStore';
import { sharedStyles } from '../styles/sharedStyles';
import { NodeData } from '../types/family';

interface RootNodeProps {
  data: NodeData;
  isConnectable?: boolean;
  children?: React.ReactNode;
  borderColor?: string;
  showSpouseButton?: boolean;
  showChildButton?: boolean;
  isSpouse?: boolean;
}

interface NodeActionButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  position: 'top' | 'right' | 'bottom' | 'left';
  tooltip: string;
  color?: string;
  loading?: boolean;
}

const NodeActionButton: React.FC<NodeActionButtonProps> = ({
  icon,
  onClick,
  position,
  tooltip,
  color = '#1890ff',
  loading = false,
}) => {
  const getPositionStyle = () => {
    switch (position) {
      case 'top':
        return { top: '-12px', left: '50%', transform: 'translateX(-50%)' };
      case 'right':
        return { right: '-12px', top: '50%', transform: 'translateY(-50%)' };
      case 'bottom':
        return { bottom: '-12px', left: '50%', transform: 'translateX(-50%)' };
      case 'left':
        return { left: '-12px', top: '50%', transform: 'translateY(-50%)' };
      default:
        return {};
    }
  };

  return (
    <Tooltip title={loading ? 'Processing...' : tooltip}>
      <Button
        type="primary"
        shape="circle"
        icon={icon}
        size="small"
        onClick={onClick}
        loading={loading}
        disabled={loading}
        style={{
          position: 'absolute',
          ...getPositionStyle(),
          zIndex: 1,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          background: color,
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
        }}
      />
    </Tooltip>
  );
};

export const RootNode: React.FC<RootNodeProps> = ({
  data,
  isConnectable,
  children,
  borderColor = '#1890ff',
  showSpouseButton = true,
  showChildButton = false,
  isSpouse = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addNode, addEdge, nodes, deleteNode } = useFamilyStore();

  const handleDelete = async () => {
    try {
      console.log('Deleting node:', data);
      setIsLoading(true);
      await deleteNode(data.id);
    } catch (error) {
      console.error('Error deleting node:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSpouse = async () => {
    try {
      setIsLoading(true);
      const newNode = {
        id: `node-${Date.now()}`,
        type: 'spouse' as const,
        position: {
          x: data.position.x + 300,
          y: data.position.y,
        },
        data: {
          id: `node-${Date.now()}`,
          name: 'Spouse',
          position: {
            x: data.position.x + 300,
            y: data.position.y,
          },
          label: '',
          canAddChildren: true,
          canAddSpouse: true,
        },
      };

      await addNode(newNode);
      await addEdge({
        id: `edge-${Date.now()}`,
        source: data.id,
        target: newNode.id,
        type: 'straight',
        sourceHandle: isSpouse ? 'left' : 'right',
        targetHandle: isSpouse ? 'right' : 'left',
      });
    } catch (error) {
      console.error('Error adding spouse:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddChild = async () => {
    try {
      setIsLoading(true);
      const spouseNode = nodes.find(
        (node) => node.type === 'spouse' && node.data.parentId === data.id
      );
      const existingChildren = nodes.filter(
        (node) => node.type === 'child' && node.data.parentId === data.id
      );

      const childCount = existingChildren.length;

      let baseX = data.position.x;
      const baseY = data.position.y + 200;

      if (spouseNode) {
        baseX = (data.position.x + spouseNode.position.x) / 2;
      }

      const spacing = 250;
      const totalWidth = spacing * (childCount + 1);
      const startX = baseX - totalWidth / 2;

      const newNode = {
        id: `node-${Date.now()}`,
        type: 'child' as const,
        position: {
          x: startX + childCount * spacing,
          y: baseY,
        },
        data: {
          id: `node-${Date.now()}`,
          name: 'Child',
          position: {
            x: startX + childCount * spacing,
            y: baseY,
          },
          label: '',
          parentId: data.id,
          canAddChildren: true,
          canAddSpouse: true,
        },
      };

      await addNode(newNode);

      if (childCount === 0) {
        if (spouseNode) {
          await addEdge({
            id: `edge-${data.id}-${newNode.id}`,
            source: data.id,
            target: newNode.id,
            type: 'smoothstep',
          });
          await addEdge({
            id: `edge-${spouseNode.id}-${newNode.id}`,
            source: spouseNode.id,
            target: newNode.id,
            type: 'smoothstep',
          });
        } else {
          await addEdge({
            id: `edge-${Date.now()}`,
            source: data.id,
            target: newNode.id,
            type: 'smoothstep',
          });
        }
      } else {
        if (spouseNode) {
          await addEdge({
            id: `edge-${data.id}-${newNode.id}`,
            source: data.id,
            target: newNode.id,
            type: 'smoothstep',
          });
          await addEdge({
            id: `edge-${spouseNode.id}-${newNode.id}`,
            source: spouseNode.id,
            target: newNode.id,
            type: 'smoothstep',
          });
        } else {
          await addEdge({
            id: `edge-${Date.now()}`,
            source: data.id,
            target: newNode.id,
            type: 'smoothstep',
          });
        }
      }
    } catch (error) {
      console.error('Error adding child:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className="family-node"
      style={{
        ...sharedStyles.familyMember,
        border: `2px solid ${borderColor}`,
        padding: '8px',
        width: '180px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'relative',
        transition: 'all 0.3s ease',
      }}
      styles={{ body: { padding: '8px' } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="treeitem"
      aria-label={`Family member: ${data.name}`}
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
      {isHovered && (
        <>
          {showSpouseButton && (
            <NodeActionButton
              icon={<PlusOutlined />}
              onClick={handleAddSpouse}
              position={isSpouse ? 'left' : 'right'}
              tooltip="Add Spouse"
              color={borderColor}
              loading={isLoading}
            />
          )}
          <NodeActionButton
            icon={<CloseOutlined />}
            onClick={handleDelete}
            position="top"
            tooltip="Delete"
            color="#ff4d4f"
            loading={isLoading}
          />
        </>
      )}
      {isHovered && showChildButton && (
        <NodeActionButton
          icon={<PlusOutlined />}
          onClick={handleAddChild}
          position="bottom"
          tooltip="Add Child"
          color={borderColor}
          loading={isLoading}
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
