import { ImportOutlined } from "@ant-design/icons";
import { Button, Input, Modal, message } from "antd";
import { useState } from "react";
import useFamilyStore from "../store/familyStore";

const { TextArea } = Input;

export function ImportButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const importJson = useFamilyStore((state) => state.importJson);
  const nodes = useFamilyStore((state) => state.nodes);
  const edges = useFamilyStore((state) => state.edges);

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

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        icon={<ImportOutlined />}
        onClick={showModal}
      >
        Import
      </Button>
      <Modal
        title="Import Family Tree"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        okText="Import"
        cancelText="Cancel"
      >
        <div style={{ marginBottom: 16 }}>
          <p>Paste your family tree JSON data below or edit the current tree structure:</p>
          <TextArea
            rows={20}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{"nodes": [...], "edges": [...]}'
          />
        </div>
      </Modal>
    </>
  );
} 