import { CompressOutlined } from '@ant-design/icons';
import { Edge, ReactFlowInstance } from '@xyflow/react';
import { Button, message } from 'antd';
import { useCallback } from 'react';
import { FamilyNode } from '../types/family';

interface ResizeButtonProps {
  reactFlowInstance: React.MutableRefObject<ReactFlowInstance<FamilyNode, Edge> | null>;
}

export function ResizeButton({ reactFlowInstance }: ResizeButtonProps) {
  const [messageApi, contextHolder] = message.useMessage();

  const handleResize = useCallback(() => {
    if (reactFlowInstance.current) {
      messageApi.loading({ content: 'Resizing view...', key: 'resize' });
      
      // Add a small delay to ensure the nodes are rendered
      setTimeout(() => {
        reactFlowInstance.current?.fitView({
          padding: 0.2,
          duration: 800,
        });
        messageApi.success({ content: 'View resized!', key: 'resize', duration: 2 });
      }, 100);
    }
  }, [reactFlowInstance, messageApi]);

  return (
    <>
      {contextHolder}
      <Button 
        type="primary" 
        icon={<CompressOutlined />} 
        onClick={handleResize}
        title="Resize view to fit all nodes"
      >
        Resize
      </Button>
    </>
  );
} 