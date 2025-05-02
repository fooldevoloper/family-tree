import { Menu } from 'antd';
import { useCallback } from 'react';
import useFamilyStore from '../store/familyStore';
import { FamilyNode } from '../types/family';

interface NodeContextMenuProps {
  node: FamilyNode;
  onClose: () => void;
}

export function NodeContextMenu({ node, onClose }: NodeContextMenuProps) {
  const { addNode } = useFamilyStore();

  const handleAddMember = useCallback(
    (type: 'parent' | 'spouse' | 'child') => {
      const position = calculateNodePosition(type, node);
      const newNode: FamilyNode = {
        id: `node-${Date.now()}`,
        type,
        position,
        data: {
          id: `node-${Date.now()}`,
          name: '',
          position,
          label: '',
        },
      };

      addNode(newNode);
      onClose();
    },
    [node, onClose, addNode]
  );

  const calculateNodePosition = (type: string, selectedNode: FamilyNode) => {
    const basePosition = selectedNode.position;
    switch (type) {
      case 'spouse':
        return { x: basePosition.x + 200, y: basePosition.y };
      case 'child':
        return { x: basePosition.x, y: basePosition.y + 150 };
      case 'parent':
        return { x: basePosition.x, y: basePosition.y - 150 };
      default:
        return basePosition;
    }
  };

  return (
    <Menu>
      <Menu.Item key="add-parent" onClick={() => handleAddMember('parent')}>
        Add Parent
      </Menu.Item>
      <Menu.Item key="add-spouse" onClick={() => handleAddMember('spouse')}>
        Add Spouse
      </Menu.Item>
      <Menu.Item key="add-child" onClick={() => handleAddMember('child')}>
        Add Child
      </Menu.Item>
    </Menu>
  );
}
