import { HomeOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Layout as AntLayout, Menu, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { DownloadButton } from "./DownloadButton";

const { Header, Content, Footer } = AntLayout;
const { Title } = Typography;

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "family",
      icon: <TeamOutlined />,
      label: <Link to="/family">Family</Link>,
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: <Link to="/profile">Profile</Link>,
    },
  ];

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          background: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Title level={3} style={{ margin: 0, marginRight: "24px" }}>
            Family Tree
          </Title>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["home"]}
            items={menuItems}
          />
        </div>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <div
          style={{ padding: "24px", minHeight: "calc(100vh - 64px - 70px)" }}
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          background: "#fff",
          padding: "16px 50px",
          borderTop: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Space direction="vertical" size="small">
          <div style={{ color: "#666" }}>
            Family Tree ©{new Date().getFullYear()} Created with ❤️
          </div>
          <div>
            <a href="/privacy" style={{ color: "#1890ff" }}>
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="/terms" style={{ color: "#1890ff" }}>
              Terms of Service
            </a>
          </div>
        </Space>
        <DownloadButton containerId="family-tree-container" />
      </Footer>
    </AntLayout>
  );
}
