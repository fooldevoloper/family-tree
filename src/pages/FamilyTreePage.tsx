import {
  DownloadOutlined,
  ExportOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  ImportOutlined,
  PlusOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Edge,
  NodeTypes,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlow,
  ReactFlowInstance,
  SelectionMode,
} from '@xyflow/react';
import { Button, ConfigProvider, theme, Typography } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import screenfull from 'screenfull'; // Import screenfull library
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ResizeButton from '../components/ResizeButton';
import ChildNode from '../nodes/ChildNode';
import ParentNode from '../nodes/ParentNode';
import SpouseNode from '../nodes/SpouseNode';
import useFamilyStore from '../store/familyStore';
import { FamilyNode } from '../types/family';

const { Title, Paragraph } = Typography;

const nodeTypes: NodeTypes = {
  parent: ParentNode,
  child: ChildNode,
  spouse: SpouseNode,
};

export default function FamilyTreePage() {
  const { nodes, edges, setNodes, setEdges, addNode } = useFamilyStore();
  const reactFlowInstance = useRef<ReactFlowInstance<FamilyNode, Edge> | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const resizeRef = useRef<{ resize: () => void } | null>(null);

  useEffect(() => {
    if (nodes.length === 1) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const centeredX = viewportWidth / 2 - 100;
      const centeredY = viewportHeight / 2 - 100;
      setNodes((nds) =>
        nds.map((node) =>
          node.id === 'root-parent'
            ? {
                ...node,
                position: { x: centeredX, y: centeredY },
                data: {
                  ...node.data,
                  position: { x: centeredX, y: centeredY },
                },
              }
            : node
        )
      );
    }
  }, [nodes.length, setNodes]);

  useEffect(() => {
    if (resizeRef.current) {
      resizeRef.current.resize();
    }
  }, [nodes.length, edges.length]);

  const onNodesChange = useCallback<OnNodesChange>(
    (changes) => {
      setNodes((nds: FamilyNode[]) => applyNodeChanges(changes, nds) as FamilyNode[]);
    },
    [setNodes]
  );

  const onEdgesChange = useCallback<OnEdgesChange>(
    (changes) => {
      setEdges((eds: Edge[]) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  const onConnect = useCallback<OnConnect>(
    (connection) => {
      setEdges((eds: Edge[]) => addEdge(connection, eds));
    },
    [setEdges]
  );

  const onInit = useCallback((instance: ReactFlowInstance<FamilyNode, Edge>) => {
    reactFlowInstance.current = instance;
    instance.fitView({ padding: 0.1 });
  }, []);

  const handleAddRootNode = () => {
    addNode({
      id: 'root-parent',
      type: 'parent',
      position: { x: 0, y: 0 },
      data: {
        id: 'root-parent',
        name: 'Root Person',
        label: 'Root',
        position: { x: 0, y: 0 },
      },
    });
  };

  const handleResetCanvas = () => {
    setNodes([]);
    setEdges([]);
  };

  const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      setIsFullscreen((prev) => !prev);

      setTimeout(() => {
        if (resizeRef.current) {
          resizeRef.current.resize();
        }
      }, 300);
    }
  };

  const buttonStyle = { fontSize: '1rem', padding: '8px 16px' };

  return (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}
    >
      <Navbar />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: isFullscreen ? 0 : 64,
          background: '#f8f9fa',
          position: isFullscreen ? 'fixed' : 'relative',
          top: 0,
          left: 0,
          width: isFullscreen ? '100%' : 'auto',
          height: isFullscreen ? '100%' : 'auto',
          zIndex: isFullscreen ? 1000 : 'auto',
        }}
      >
        <div
          style={{
            width: isFullscreen ? '100%' : '100%',
            maxWidth: isFullscreen ? '100%' : 1200,
            minHeight: isFullscreen ? '100%' : 600,
            background: '#fff',
            borderRadius: isFullscreen ? 0 : 16,
            boxShadow: isFullscreen ? 'none' : '0 4px 24px rgba(0,0,0,0.08)',
            padding: isFullscreen ? 0 : 32,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {!isFullscreen && (
            <>
              <Title
                level={2}
                style={{ color: '#000', fontWeight: 700, marginBottom: 8, textAlign: 'center' }}
              >
                Family Tree Builder
              </Title>
              <Paragraph
                style={{ color: '#666', fontSize: '1.1rem', marginBottom: 32, textAlign: 'center' }}
              >
                Build, visualize, and explore your family connections interactively.
              </Paragraph>
            </>
          )}
          <div
            style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}
          >
            <ResizeButton ref={resizeRef} reactFlowInstance={reactFlowInstance} />
          </div>
          <div
            style={{
              width: '100%',
              height: isFullscreen ? 'calc(100% - 80px)' : 500,
              position: 'relative',
              background: '#f8f9fa',
              borderRadius: isFullscreen ? 0 : 12,
              border: isFullscreen ? 'none' : '1px solid #e9ecef',
              overflow: 'hidden',
            }}
          >
            <ConfigProvider
              theme={{
                algorithm: theme.defaultAlgorithm,
                token: {
                  colorPrimary: '#1890ff',
                  borderRadius: 8,
                },
              }}
            >
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                onInit={onInit}
                defaultEdgeOptions={{
                  style: { stroke: '#52c41a' },
                  animated: true,
                }}
                zoomOnScroll={false}
                zoomActivationKeyCode={'Ctrl'}
                fitView
                selectionMode={SelectionMode.Partial}
              >
                <Background />
              </ReactFlow>
            </ConfigProvider>
          </div>
        </div>
        {!isFullscreen && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              gap: 16,
              marginTop: 16,
              padding: '16px 0',
              background: '#fff',
              borderTop: '1px solid #e9ecef',
            }}
          >
            {nodes.length === 0 && (
              <Button
                type="primary"
                size="large"
                onClick={handleAddRootNode}
                style={buttonStyle}
                icon={<PlusOutlined />}
              >
                Add Root Node
              </Button>
            )}
            <Button
              type="primary"
              size="large"
              onClick={handleResetCanvas}
              style={buttonStyle}
              icon={<RedoOutlined />}
            >
              Reset Canvas
            </Button>
            <Button
              type="primary"
              size="large"
              style={buttonStyle}
              icon={<DownloadOutlined />}
              onClick={() => console.log('Download triggered')}
            >
              Download
            </Button>
            <Button
              type="primary"
              size="large"
              style={buttonStyle}
              icon={<ImportOutlined />}
              onClick={() => console.log('Import triggered')}
            >
              Import
            </Button>
            <Button
              type="primary"
              size="large"
              style={buttonStyle}
              icon={<ExportOutlined />}
              onClick={() => console.log('Export triggered')}
            >
              Export
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={toggleFullscreen}
              style={buttonStyle}
              icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
            >
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </Button>
          </div>
        )}
        {isFullscreen && (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              right: 16,
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              background: '#fff',
              padding: '16px',
              borderRadius: 8,
              boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
              zIndex: 1001,
            }}
          >
            {nodes.length === 0 && (
              <Button
                type="primary"
                size="large"
                onClick={handleAddRootNode}
                style={buttonStyle}
                icon={<PlusOutlined />}
              />
            )}
            <Button
              type="primary"
              size="large"
              onClick={handleResetCanvas}
              style={buttonStyle}
              icon={<RedoOutlined />}
            />
            <Button
              type="primary"
              size="large"
              style={buttonStyle}
              icon={<DownloadOutlined />}
              onClick={() => console.log('Download triggered')}
            />
            <Button
              type="primary"
              size="large"
              style={buttonStyle}
              icon={<ImportOutlined />}
              onClick={() => console.log('Import triggered')}
            />
            <Button
              type="primary"
              size="large"
              style={buttonStyle}
              icon={<ExportOutlined />}
              onClick={() => console.log('Export triggered')}
            />
            <Button
              type="primary"
              size="large"
              onClick={toggleFullscreen}
              style={buttonStyle}
              icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
            />
          </div>
        )}
      </div>
      {!isFullscreen && <Footer />}
    </div>
  );
}
