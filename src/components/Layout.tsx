import {
  HomeOutlined,
  MenuOutlined,
  PlusOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout as AntLayout, Button, Drawer, Menu, Space, Typography } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFamilyStore from '../store/familyStore';
import { DownloadButton } from './DownloadButton';
import { ImportButton } from './ImportButton';

const { Header, Content, Footer } = AntLayout;
const { Title } = Typography;

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const { nodes, addNode } = useFamilyStore();

  const handleAddRootNode = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const centeredX = viewportWidth / 2 - 100;
    const centeredY = viewportHeight / 2 - 100;

    addNode({
      id: `node-${Date.now()}`,
      type: 'parent',
      position: { x: centeredX, y: centeredY },
      data: {
        id: `node-${Date.now()}`,
        name: 'Root Parent',
        position: { x: centeredX, y: centeredY },
        label: '',
        canAddChildren: true,
        canAddSpouse: true,
      },
    });
  };

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: (
        <Link to="/" onClick={() => setMobileMenuVisible(false)}>
          Home
        </Link>
      ),
    },
    {
      key: 'family',
      icon: <TeamOutlined />,
      label: (
        <Link to="/family" onClick={() => setMobileMenuVisible(false)}>
          Family
        </Link>
      ),
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: (
        <Link to="/profile" onClick={() => setMobileMenuVisible(false)}>
          Profile
        </Link>
      ),
    },
  ];

  return (
    <AntLayout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          background: '#fff',
          padding: '0 20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Title level={3} style={{ margin: 0 }}>
            Family Tree
          </Title>
          <div className="desktop-menu">
            <Menu mode="horizontal" defaultSelectedKeys={['home']} items={menuItems} />
          </div>
          <Button
            className="mobile-menu-button"
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setMobileMenuVisible(true)}
            style={{ display: 'none' }}
          />
        </div>
      </Header>
      <Content
        style={{
          padding: '0 20px',
          marginTop: 64,
          marginBottom: 70,
          flex: '1 0 auto',
          minHeight: 'calc(100vh - 64px - 70px)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div style={{ padding: '24px', height: '100%' }}>{children}</div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          background: '#fff',
          padding: '16px 20px',
          borderTop: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
          position: 'fixed',
          bottom: 0,
          width: '100%',
          zIndex: 1,
        }}
      >
        <Space direction="vertical" size="small">
          <div style={{ color: '#666' }}>Family Tree ©{new Date().getFullYear()}</div>
        </Space>
        <Space>
          {nodes.length === 0 && (
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddRootNode}>
              Add Root Node
            </Button>
          )}
          <ImportButton />
          <DownloadButton containerId="family-tree-container" />
        </Space>
        <div className="footer-links">
          <a href="/privacy" style={{ color: '#1890ff' }}>
            Privacy Policy
          </a>{' '}
          |{' '}
          <a href="/terms" style={{ color: '#1890ff' }}>
            Terms of Service
          </a>
        </div>
      </Footer>

      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        width={250}
      >
        <Menu
          mode="vertical"
          defaultSelectedKeys={['home']}
          items={menuItems}
          style={{ border: 'none' }}
        />
      </Drawer>

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none;
          }
          .mobile-menu-button {
            display: block !important;
          }
          .footer-links {
            display: none;
          }
          .ant-layout-header {
            padding: 0 16px !important;
          }
          .ant-layout-content {
            padding: 0 16px !important;
          }
          .ant-layout-footer {
            padding: 16px !important;
            flex-direction: column;
            gap: 16px;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .ant-layout-header {
            padding: 0 24px !important;
          }
          .ant-layout-content {
            padding: 0 24px !important;
          }
          .ant-layout-footer {
            padding: 16px 24px !important;
          }
        }
      `}</style>
    </AntLayout>
  );
}
