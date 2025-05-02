import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Input, MenuProps, Modal, Typography, Upload } from 'antd';
import { useState } from 'react';
import useFamilyStore from '../store/familyStore';
import { NodeData } from '../types/family';

const { Text } = Typography;

interface NodeContentProps {
  data: NodeData;
  borderColor: string;
}

export function NodeContent({ data, borderColor }: NodeContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(data.name);
  const [isUrlModalVisible, setIsUrlModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(data.imageUrl || '');
  const { updateNode } = useFamilyStore();

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleNameSubmit = () => {
    updateNode(data.id, { ...data, name });
    setIsEditing(false);
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newImageUrl = e.target?.result as string;
      updateNode(data.id, { ...data, imageUrl: newImageUrl });
    };
    reader.readAsDataURL(file);
    return false; // Prevent default upload behavior
  };

  const handleUrlSubmit = () => {
    updateNode(data.id, { ...data, imageUrl });
    setIsUrlModalVisible(false);
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'upload',
      label: (
        <Upload accept="image/*" showUploadList={false} beforeUpload={handleImageUpload}>
          Upload Image
        </Upload>
      ),
    },
    {
      key: 'url',
      label: 'Update Image URL',
      onClick: () => setIsUrlModalVisible(true),
    },
  ];

  return (
    <div
      style={{
        textAlign: 'center',
        width: '100%',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
        }}
      >
        <Dropdown menu={{ items: menuItems }} trigger={['click']}>
          <Avatar
            size={64}
            icon={<UserOutlined />}
            src={data.imageUrl || 'https://avatar.iran.liara.run/public/19'}
            style={{
              border: `2px solid ${borderColor}`,
              cursor: 'pointer',
            }}
          />
        </Dropdown>
      </div>
      <div
        style={{
          marginTop: 8,
          maxWidth: '100%',
          minHeight: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isEditing ? (
          <Input
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            onPressEnter={handleNameSubmit}
            onBlur={handleNameSubmit}
            autoFocus
            bordered={false}
            style={{
              textAlign: 'center',
              maxWidth: '100%',
              fontSize: '12px',
              height: '24px',
              padding: '2px 8px',
              backgroundColor: 'transparent',
              cursor: 'text',
              border: 'none',
              boxShadow: 'none',
              outline: 'none',
              borderRadius: '4px',
              color: 'inherit',
            }}
          />
        ) : (
          <Text
            style={{
              fontSize: '12px',
              cursor: 'pointer',
              padding: '2px 8px',
              borderRadius: '4px',
              display: 'inline-block',
              maxWidth: '100%',
              wordBreak: 'break-word',
              whiteSpace: 'normal',
              lineHeight: '1.2',
              textAlign: 'center',
            }}
            onClick={() => setIsEditing(true)}
          >
            {name}
          </Text>
        )}
      </div>
      <Modal
        title="Update Image URL"
        open={isUrlModalVisible}
        onOk={handleUrlSubmit}
        onCancel={() => setIsUrlModalVisible(false)}
      >
        <Input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter image URL"
        />
      </Modal>
    </div>
  );
}
