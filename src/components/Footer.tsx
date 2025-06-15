import { Row, Col, Typography, Divider } from "antd";

const { Text } = Typography;

export default function Footer() {
    return (
        <footer style={{ background: "#fafbfc", marginTop: "auto", padding: "40px 0 0 0" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
                <Row gutter={[32, 32]}>
                    <Col xs={24} md={8}>
                        <Text style={{ color: "#000", fontWeight: 600, fontSize: "0.875rem" }}>ABOUT</Text>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
                            <a href="#" style={{ color: "#666", fontSize: "0.875rem", textDecoration: "none" }}>Our story</a>
                            <a href="#" style={{ color: "#666", fontSize: "0.875rem", textDecoration: "none" }}>Careers</a>
                            <a href="#" style={{ color: "#666", fontSize: "0.875rem", textDecoration: "none" }}>Press</a>
                        </div>
                    </Col>
                    <Col xs={24} md={8}>
                        <Text style={{ color: "#000", fontWeight: 600, fontSize: "0.875rem" }}>RESOURCES</Text>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
                            <a href="#" style={{ color: "#666", fontSize: "0.875rem", textDecoration: "none" }}>Blog</a>
                            <a href="#" style={{ color: "#666", fontSize: "0.875rem", textDecoration: "none" }}>Guides</a>
                            <a href="#" style={{ color: "#666", fontSize: "0.875rem", textDecoration: "none" }}>FAQ</a>
                        </div>
                    </Col>
                    <Col xs={24} md={8}>
                        <Text style={{ color: "#000", fontWeight: 600, fontSize: "0.875rem" }}>SUPPORT</Text>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
                            <a href="#" style={{ color: "#666", fontSize: "0.875rem", textDecoration: "none" }}>Help center</a>
                            <a href="#" style={{ color: "#666", fontSize: "0.875rem", textDecoration: "none" }}>Contact us</a>
                            <a href="#" style={{ color: "#666", fontSize: "0.875rem", textDecoration: "none" }}>Privacy policy</a>
                            <a href="#" style={{ color: "#666", fontSize: "0.875rem", textDecoration: "none" }}>Terms of service</a>
                        </div>
                    </Col>
                </Row>
                <Divider style={{ borderColor: "#e9ecef", margin: "40px 0 20px" }} />
                <Row justify="space-between" align="middle" gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                        <Text style={{ color: "#999", fontSize: "clamp(0.7rem, 2vw, 0.75rem)" }}>
                            © 2024 FamilyTree, Inc. All rights reserved.
                        </Text>
                    </Col>
                    <Col xs={24} sm={12} style={{ textAlign: "right" }}>
                        <Text style={{ color: "#999", fontSize: "clamp(0.7rem, 2vw, 0.75rem)" }}>
                            Support: hello@familytree.app
                        </Text>
                    </Col>
                </Row>
            </div>
        </footer>
    );
}
