import { Button } from 'antd';
import { saveAs } from 'file-saver'; // Import file-saver for exporting files
import useFamilyStore from '../store/familyStore';
import { buttonStyle } from '../pages/FamilyTreePage';
import { ExportOutlined } from '@ant-design/icons';

interface ExportButtonProps {
  isFullscreen: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({ isFullscreen }) => {
  const { nodes, edges } = useFamilyStore();

  const handleExport = () => {
    const data = JSON.stringify({ nodes, edges }, null, 2); // Serialize nodes and edges
    const blob = new Blob([data], { type: 'application/json' });
    saveAs(blob, 'family-tree.json'); // Save the file as JSON
  };

  return (
    <Button type="primary" style={buttonStyle} size='large' icon={<ExportOutlined />} onClick={handleExport}>
                   {!isFullscreen  && "Export"}

    </Button>
  );
};

export default ExportButton;
