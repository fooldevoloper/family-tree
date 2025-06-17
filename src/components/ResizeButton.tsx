import { CompressOutlined } from '@ant-design/icons';
import { Edge, ReactFlowInstance } from '@xyflow/react';
import { Button, message } from 'antd';
import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { FamilyNode } from '../types/family';

interface ResizeButtonProps {
  reactFlowInstance: React.RefObject<ReactFlowInstance<FamilyNode, Edge> | null>;
}

const ResizeButton = forwardRef(({ reactFlowInstance }: ResizeButtonProps, ref) => {
  const [messageApi, contextHolder] = message.useMessage();

  useImperativeHandle(ref, () => ({
    resize: () => {
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
    },
  }));

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
});

export default ResizeButton;
