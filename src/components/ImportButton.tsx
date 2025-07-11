import { ImportOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, MenuProps, message, Modal, Space, Typography } from 'antd';
import { useRef, useState } from 'react';
import useFamilyStore from '../store/familyStore';
import { buttonStyle } from '../pages/FamilyTreePage';

const { TextArea } = Input;
const { Text } = Typography;

interface ImportButtonProps {
  isFullscreen: boolean;
}

export function ImportButton({ isFullscreen }: ImportButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const importJson = useFamilyStore((state) => state.importJson);
  const nodes = useFamilyStore((state) => state.nodes);
  const edges = useFamilyStore((state) => state.edges);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { setNodes, setEdges } = useFamilyStore();

  const showModal = () => {
    // Pre-fill the textarea with current tree data if available
    if (nodes.length > 0 || edges.length > 0) {
      setJsonInput(JSON.stringify({ nodes, edges }, null, 2));
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    try {
      importJson(jsonInput);
      messageApi.success('Family tree imported successfully!');
      setIsModalOpen(false);
    } catch (error) {
      messageApi.error('Failed to import family tree. Please check the JSON format.');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.nodes && data.edges) {
          setNodes(data.nodes);
          setEdges(data.edges);
          messageApi.success('Family tree imported successfully!');
        } else {
          console.error('Invalid file format.');
          messageApi.error('Invalid file format. Please upload a valid JSON file.');
        }
      } catch (error) {
        console.error('Error parsing file:', error);
        messageApi.error('Error parsing file. Please ensure the file is a valid JSON.');
      }
    };
    reader.readAsText(file);
  };

  const items: MenuProps['items'] = [
    {
      key: 'paste',
      label: 'Paste JSON',
      icon: <ImportOutlined />,
      onClick: showModal,
    },
    {
      key: 'upload',
      label: 'Upload File',
      icon: <UploadOutlined />,
      onClick: () => {
        // TODO: Implement file upload functionality
        messageApi.info('File upload feature coming soon!');
      },
    },
  ];

  return (
    <>
      {contextHolder}
      <Dropdown menu={{ items }} placement="topRight">
        <Button type="primary" style={buttonStyle}  size='large' icon={<ImportOutlined />}>
             {!isFullscreen  && "Import"}
        </Button>
      </Dropdown>
      <Modal
        title={
          <Space>
            <ImportOutlined />
            <Text strong>Import Family Tree</Text>
          </Space>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        okText="Import"
        cancelText="Cancel"
        okButtonProps={{ type: 'primary' }}
        styles={{ body: { padding: '24px' } }}
      >
        <div style={{ marginBottom: 16 }}>
          <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
            Paste your family tree JSON data below or edit the current tree structure:
          </Text>
          <TextArea
            rows={20}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{"nodes": [...], "edges": [...]}'
            style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              borderRadius: '8px',
              border: '1px solid #d9d9d9',
              padding: '12px',
            }}
          />
          <Text type="secondary" style={{ display: 'block', marginTop: 16 }}>
            The JSON should follow this structure:
          </Text>
          <pre
            style={{
              background: '#f5f5f5',
              padding: '12px',
              borderRadius: '8px',
              marginTop: '8px',
              fontSize: '12px',
              overflow: 'auto',
            }}
          >
            {`{
  "nodes": [
    {
      "id": "node-1",
      "type": "parent",
      "position": { "x": 0, "y": 0 },
      "data": {
        "id": "node-1",
        "name": "Name",
        "label": "Label",
        "position": { "x": 0, "y": 0 }
      }
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "node-1",
      "target": "node-2",
      "type": "step"
    }
  ]
}`}
          </pre>
        </div>
      </Modal>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="application/json"
        onChange={handleImport}
      />
    </>
  );
}
