import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import useFamilyStore from '../store/familyStore';

const ExportButton = () => {
  const { nodes, edges } = useFamilyStore();

  const handleExport = () => {
    const data = {
      nodes,
      edges,
    };

    // Create a blob with the JSON data
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'family-tree.json';
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      type="primary"
      icon={<DownloadOutlined />}
      onClick={handleExport}
      style={{ marginRight: '8px' }}
    >
      Export JSON
    </Button>
  );
};

export default ExportButton; 