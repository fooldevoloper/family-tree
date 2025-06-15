import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ConfigProvider, theme, Typography, Button } from 'antd';
import { ResizeButton } from '../components/ResizeButton';
import { Background, ReactFlow } from '@xyflow/react';
import useFamilyStore from '../store/familyStore';
import ChildNode from '../nodes/ChildNode';
import ParentNode from '../nodes/ParentNode';
import SpouseNode from '../nodes/SpouseNode';
import { useCallback, useEffect, useRef } from 'react';
import { FamilyNode } from '../types/family';
import { Edge, NodeTypes, OnConnect, OnEdgesChange, OnNodesChange, ReactFlowInstance, addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import { DownloadButton } from '../components/DownloadButton';
import { ImportButton } from '../components/ImportButton';
import ExportButton from '../components/ExportButton';

const { Title, Paragraph } = Typography;

const nodeTypes: NodeTypes = {
    parent: ParentNode,
    child: ChildNode,
    spouse: SpouseNode,
};

export default function FamilyTreePage() {
    const { nodes, edges, setNodes, setEdges, addNode } = useFamilyStore();
    const reactFlowInstance = useRef<ReactFlowInstance<FamilyNode, Edge> | null>(null);

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
    }, []);

    // Add handler for root node
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

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
            <Navbar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 64, background: '#f8f9fa' }}>
                <div style={{
                    width: '100%',
                    maxWidth: 1200,
                    minHeight: 600,
                    background: '#fff',
                    borderRadius: 16,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                    padding: 32,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}>
                    <Title level={2} style={{ color: '#000', fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>Family Tree Builder</Title>
                    <Paragraph style={{ color: '#666', fontSize: '1.1rem', marginBottom: 32, textAlign: 'center' }}>
                        Build, visualize, and explore your family connections interactively.
                    </Paragraph>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                        <ResizeButton reactFlowInstance={reactFlowInstance} />
                    </div>
                    <div style={{ width: '100%', height: 500, position: 'relative', background: '#f8f9fa', borderRadius: 12, border: '1px solid #e9ecef', overflow: 'hidden' }}>
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
                                fitView
                            >
                                <Background />
                            </ReactFlow>
                        </ConfigProvider>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: 16, marginTop: 24 }}>
                        {nodes.length === 0 && (
                            <Button type="primary" onClick={handleAddRootNode}>
                                Add Root Node
                            </Button>
                        )}
                        <DownloadButton containerId="family-tree-container" />
                        <ImportButton />
                        <ExportButton />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
