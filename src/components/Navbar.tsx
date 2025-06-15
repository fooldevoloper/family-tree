import { Button, Space, Typography } from "antd";
import { HeartOutlined, MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <>
            <nav style={{
                width: "100%",
                background: "#fff",
                boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 40px",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1000,
            }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ width: 32, height: 32, background: "#ff4d4f", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
                        <HeartOutlined style={{ fontSize: 16, color: "#fff" }} />
                    </div>
                    <Title level={4} style={{ margin: 0, color: "#000", fontWeight: 600, fontSize: 18 }}>
                        FAMILYTREE
                    </Title>
                </div>
                <Space size="large" className="desktop-nav">
                    <Button type="text" style={{ color: "#666", fontWeight: 400 }}>Feature requests</Button>
                    <Button type="text" style={{ color: "#666", fontWeight: 400 }}>How it works</Button>
                    <Button type="text" style={{ color: "#666", fontWeight: 400 }}>Blog</Button>
                    <Button type="text" style={{ color: "#666", fontWeight: 400 }}>Pricing</Button>
                    <Button type="text" style={{ color: "#000", fontWeight: 500 }} onClick={() => navigate("/signin")}>Sign in</Button>
                </Space>
                <Button className="mobile-menu-btn" icon={<MenuOutlined />} style={{ display: "none" }} />
            </nav>
            <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: inline-flex !important;
          }
        }
        `}</style>
        </>
    );
}
