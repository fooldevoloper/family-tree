"use client"

import { Button, Col, Row, Typography, Space, Avatar, Rate, Input } from "antd"
import { useNavigate } from "react-router-dom"
import {
    TeamOutlined,
    SafetyOutlined,
    CloudSyncOutlined,
    PictureOutlined,
    ShareAltOutlined,
    UserAddOutlined,
    SearchOutlined,
    PlayCircleOutlined,
    ArrowRightOutlined,
} from "@ant-design/icons"
import Navbar from './Navbar';
import Footer from './Footer';

const { Title, Paragraph, Text } = Typography

export default function FamilyTreeLanding() {
    const navigate = useNavigate();
    const handleGetStarted = () => {
        navigate("/family-tree")
    }

    const features = [
        {
            icon: <TeamOutlined style={{ fontSize: "2rem", color: "#000" }} />,
            title: "Family Collaboration",
            description: "Invite family members to contribute stories, photos, and memories together in real-time.",
        },
        {
            icon: <PictureOutlined style={{ fontSize: "2rem", color: "#000" }} />,
            title: "Rich Media Support",
            description: "Upload photos, documents, and videos to bring your family history to life.",
        },
        {
            icon: <SafetyOutlined style={{ fontSize: "2rem", color: "#000" }} />,
            title: "Private & Secure",
            description: "Your family data is encrypted and protected with enterprise-grade security.",
        },
        {
            icon: <CloudSyncOutlined style={{ fontSize: "2rem", color: "#000" }} />,
            title: "Real-time Sync",
            description: "Access your family tree from any device with automatic synchronization.",
        },
        {
            icon: <SearchOutlined style={{ fontSize: "2rem", color: "#000" }} />,
            title: "Advanced Search",
            description: "Find ancestors and relatives quickly with powerful search and filtering tools.",
        },
        {
            icon: <ShareAltOutlined style={{ fontSize: "2rem", color: "#000" }} />,
            title: "Easy Sharing",
            description: "Share your family tree with relatives or create beautiful printed versions.",
        },
    ]

    const testimonials = [
        {
            name: "Sarah Johnson",
            avatar: "/placeholder.svg?height=60&width=60",
            rating: 5,
            text: "This app helped me connect with cousins I never knew existed! We discovered our great-grandmother's incredible story together.",
            location: "California, USA",
        },
        {
            name: "Michael Chen",
            avatar: "/placeholder.svg?height=60&width=60",
            rating: 5,
            text: "As a genealogy enthusiast, this is the most intuitive family tree builder I've used. The collaboration features are game-changing.",
            location: "Toronto, Canada",
        },
        {
            name: "Emma Rodriguez",
            avatar: "/placeholder.svg?height=60&width=60",
            rating: 5,
            text: "My kids love exploring their heritage through the interactive tree. It's brought our family closer together.",
            location: "Madrid, Spain",
        },
    ]

    const stats = [
        { title: "Active Users", value: "50,000+" },
        { title: "Family Trees Created", value: "25,000+" },
        { title: "Photos Uploaded", value: "1M+" },
        { title: "Countries", value: "120+" },
    ]

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fff" }}>
            <div style={{ flex: 1, marginTop: "64px", background: "#fff" }}>
                {/* Hero Section */}

                <div
                    style={{
                        padding: "80px 20px 60px",
                        textAlign: "center",
                        background: "#fff",
                        maxWidth: "1200px",
                        margin: "0 auto",
                    }}
                >
                    <Row justify="center">
                        <Col xs={24} md={20} lg={16}>
                            <Title
                                level={1}
                                style={{
                                    color: "#000",
                                    fontSize: "clamp(2rem, 8vw, 3.5rem)",
                                    marginBottom: "24px",
                                    fontWeight: "700",
                                    lineHeight: "1.1",
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                Build your family tree, fast.
                            </Title>
                            <Paragraph
                                style={{
                                    fontSize: "clamp(1rem, 4vw, 1.25rem)",
                                    color: "#666",
                                    marginBottom: "48px",
                                    lineHeight: "1.6",
                                    maxWidth: "600px",
                                    margin: "0 auto 48px",
                                    padding: "0 20px",
                                }}
                            >
                                The most intuitive way to discover your family history. Connect generations, preserve memories, and
                                build your legacy in minutes, not months.
                            </Paragraph>

                            {/* Video Demo Placeholder */}
                            <div
                                style={{
                                    background: "#f8f9fa",
                                    borderRadius: "12px",
                                    padding: "clamp(40px, 8vw, 60px) clamp(20px, 6vw, 40px)",
                                    marginBottom: "48px",
                                    border: "1px solid #e9ecef",
                                    margin: "0 20px 48px",
                                    cursor: "pointer",
                                }}
                                onClick={handleGetStarted}
                            >
                                <PlayCircleOutlined
                                    style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)", color: "#666", marginBottom: "16px" }}
                                />
                                <Paragraph style={{ color: "#666", fontSize: "clamp(0.875rem, 3vw, 1rem)", margin: 0 }}>
                                    Watch how easy it is to build your family tree
                                </Paragraph>
                            </div>

                            <Space size="large" direction="vertical">
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={handleGetStarted}
                                    style={{
                                        height: "clamp(44px, 8vw, 48px)",
                                        fontSize: "clamp(0.875rem, 3vw, 1rem)",
                                        background: "#000",
                                        borderColor: "#000",
                                        borderRadius: "6px",
                                        fontWeight: "500",
                                        padding: "0 clamp(24px, 6vw, 32px)",
                                        width: "auto",
                                        minWidth: "200px",
                                    }}
                                    icon={<UserAddOutlined />}
                                >
                                    Start building for free
                                </Button>
                                <Text style={{ color: "#999", fontSize: "clamp(0.75rem, 2.5vw, 0.875rem)" }}>
                                    No credit card required
                                </Text>
                            </Space>
                        </Col>
                    </Row>
                </div>

                {/* Stats Section */}
                <div
                    style={{
                        padding: "40px 20px",
                        background: "#f8f9fa",
                        borderTop: "1px solid #e9ecef",
                        borderBottom: "1px solid #e9ecef",
                    }}
                >
                    <Row gutter={[24, 24]} justify="center" style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        {stats.map((stat, index) => (
                            <Col xs={12} sm={6} key={index}>
                                <div style={{ textAlign: "center" }}>
                                    <div
                                        style={{
                                            fontSize: "clamp(1.5rem, 5vw, 2rem)",
                                            fontWeight: "700",
                                            color: "#000",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div
                                        style={{
                                            color: "#666",
                                            fontSize: "clamp(0.75rem, 2.5vw, 0.875rem)",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {stat.title}
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>

                {/* How It Works Section */}
                <div style={{ padding: "clamp(60px, 12vw, 100px) 20px", background: "#fff" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 10vw, 80px)" }}>
                            <Title
                                level={2}
                                style={{
                                    color: "#000",
                                    fontSize: "clamp(1.75rem, 6vw, 2.5rem)",
                                    fontWeight: "700",
                                    marginBottom: "16px",
                                }}
                            >
                                How it works
                            </Title>
                            <Paragraph
                                style={{
                                    fontSize: "clamp(1rem, 3vw, 1.125rem)",
                                    color: "#666",
                                    maxWidth: "600px",
                                    margin: "0 auto",
                                }}
                            >
                                Three simple steps to start building your family tree today
                            </Paragraph>
                        </div>

                        {/* Step 1 */}
                        <Row gutter={[32, 32]} align="middle" style={{ marginBottom: "clamp(40px, 10vw, 80px)" }}>
                            <Col xs={24} md={12}>
                                <div style={{ padding: "0 clamp(0px, 4vw, 40px)" }}>
                                    <div
                                        style={{
                                            width: "48px",
                                            height: "48px",
                                            background: "#000",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginBottom: "24px",
                                        }}
                                    >
                                        <Text style={{ color: "#fff", fontSize: "1.25rem", fontWeight: "600" }}>1</Text>
                                    </div>
                                    <Title
                                        level={3}
                                        style={{
                                            color: "#000",
                                            marginBottom: "16px",
                                            fontWeight: "600",
                                            fontSize: "clamp(1.25rem, 4vw, 1.5rem)",
                                        }}
                                    >
                                        Start with yourself
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: "#666",
                                            fontSize: "clamp(0.875rem, 3vw, 1rem)",
                                            lineHeight: "1.6",
                                        }}
                                    >
                                        Create your account and add your basic information. Upload a photo and start building from the
                                        center of your family tree.
                                    </Paragraph>
                                </div>
                            </Col>
                            <Col xs={24} md={12}>
                                <div
                                    style={{
                                        background: "#f8f9fa",
                                        borderRadius: "8px",
                                        padding: "clamp(30px, 8vw, 40px)",
                                        textAlign: "center",
                                        border: "1px solid #e9ecef",
                                    }}
                                >
                                    <UserAddOutlined style={{ fontSize: "clamp(2rem, 6vw, 3rem)", color: "#666" }} />
                                </div>
                            </Col>
                        </Row>

                        {/* Step 2 */}
                        <Row gutter={[32, 32]} align="middle" style={{ marginBottom: "clamp(40px, 10vw, 80px)" }}>
                            <Col xs={24} md={12} order={2}>
                                <div style={{ padding: "0 clamp(0px, 4vw, 40px)" }}>
                                    <div
                                        style={{
                                            width: "48px",
                                            height: "48px",
                                            background: "#000",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginBottom: "24px",
                                        }}
                                    >
                                        <Text style={{ color: "#fff", fontSize: "1.25rem", fontWeight: "600" }}>2</Text>
                                    </div>
                                    <Title
                                        level={3}
                                        style={{
                                            color: "#000",
                                            marginBottom: "16px",
                                            fontWeight: "600",
                                            fontSize: "clamp(1.25rem, 4vw, 1.5rem)",
                                        }}
                                    >
                                        Add your family
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: "#666",
                                            fontSize: "clamp(0.875rem, 3vw, 1rem)",
                                            lineHeight: "1.6",
                                        }}
                                    >
                                        Add parents, siblings, children, and extended family members. Include photos, dates, and stories to
                                        bring your tree to life.
                                    </Paragraph>
                                </div>
                            </Col>
                            <Col xs={24} md={12} order={1}>
                                <div
                                    style={{
                                        background: "#f8f9fa",
                                        borderRadius: "8px",
                                        padding: "clamp(30px, 8vw, 40px)",
                                        textAlign: "center",
                                        border: "1px solid #e9ecef",
                                    }}
                                >
                                    <TeamOutlined style={{ fontSize: "clamp(2rem, 6vw, 3rem)", color: "#666" }} />
                                </div>
                            </Col>
                        </Row>

                        {/* Step 3 */}
                        <Row gutter={[32, 32]} align="middle">
                            <Col xs={24} md={12}>
                                <div style={{ padding: "0 clamp(0px, 4vw, 40px)" }}>
                                    <div
                                        style={{
                                            width: "48px",
                                            height: "48px",
                                            background: "#000",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginBottom: "24px",
                                        }}
                                    >
                                        <Text style={{ color: "#fff", fontSize: "1.25rem", fontWeight: "600" }}>3</Text>
                                    </div>
                                    <Title
                                        level={3}
                                        style={{
                                            color: "#000",
                                            marginBottom: "16px",
                                            fontWeight: "600",
                                            fontSize: "clamp(1.25rem, 4vw, 1.5rem)",
                                        }}
                                    >
                                        Invite & collaborate
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: "#666",
                                            fontSize: "clamp(0.875rem, 3vw, 1rem)",
                                            lineHeight: "1.6",
                                        }}
                                    >
                                        Share your tree with family members and let them contribute their own memories, photos, and stories
                                        to complete the picture.
                                    </Paragraph>
                                </div>
                            </Col>
                            <Col xs={24} md={12}>
                                <div
                                    style={{
                                        background: "#f8f9fa",
                                        borderRadius: "8px",
                                        padding: "clamp(30px, 8vw, 40px)",
                                        textAlign: "center",
                                        border: "1px solid #e9ecef",
                                    }}
                                >
                                    <ShareAltOutlined style={{ fontSize: "clamp(2rem, 6vw, 3rem)", color: "#666" }} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

                {/* Features Section */}
                <div style={{ padding: "clamp(60px, 12vw, 100px) 20px", background: "#f8f9fa" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 10vw, 80px)" }}>
                            <Title
                                level={2}
                                style={{
                                    color: "#000",
                                    fontSize: "clamp(1.75rem, 6vw, 2.5rem)",
                                    fontWeight: "700",
                                    marginBottom: "16px",
                                }}
                            >
                                Everything you need
                            </Title>
                            <Paragraph
                                style={{
                                    fontSize: "clamp(1rem, 3vw, 1.125rem)",
                                    color: "#666",
                                    maxWidth: "600px",
                                    margin: "0 auto",
                                }}
                            >
                                Powerful features designed to make family tree building simple and enjoyable
                            </Paragraph>
                        </div>

                        <Row gutter={[24, 32]}>
                            {features.map((feature, index) => (
                                <Col xs={24} sm={12} lg={8} key={index}>
                                    <div style={{ textAlign: "left", padding: "clamp(20px, 6vw, 32px) 0" }}>
                                        <div style={{ marginBottom: "20px" }}>{feature.icon}</div>
                                        <Title
                                            level={4}
                                            style={{
                                                color: "#000",
                                                marginBottom: "12px",
                                                fontWeight: "600",
                                                fontSize: "clamp(1rem, 3vw, 1.25rem)",
                                            }}
                                        >
                                            {feature.title}
                                        </Title>
                                        <Paragraph
                                            style={{
                                                color: "#666",
                                                fontSize: "clamp(0.8rem, 2.5vw, 0.875rem)",
                                                lineHeight: "1.6",
                                                margin: 0,
                                            }}
                                        >
                                            {feature.description}
                                        </Paragraph>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>

                {/* Testimonials Section */}
                <div style={{ padding: "clamp(60px, 12vw, 100px) 20px", background: "#fff" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 10vw, 80px)" }}>
                            <Title
                                level={2}
                                style={{
                                    color: "#000",
                                    fontSize: "clamp(1.75rem, 6vw, 2.5rem)",
                                    fontWeight: "700",
                                    marginBottom: "16px",
                                }}
                            >
                                Loved by families worldwide
                            </Title>
                            <Paragraph
                                style={{
                                    fontSize: "clamp(1rem, 3vw, 1.125rem)",
                                    color: "#666",
                                    maxWidth: "600px",
                                    margin: "0 auto",
                                }}
                            >
                                Join thousands of families who have discovered their heritage
                            </Paragraph>
                        </div>

                        <Row gutter={[24, 32]}>
                            {testimonials.map((testimonial, index) => (
                                <Col xs={24} md={8} key={index}>
                                    <div
                                        style={{
                                            padding: "clamp(24px, 6vw, 32px)",
                                            background: "#fff",
                                            border: "1px solid #e9ecef",
                                            borderRadius: "8px",
                                            height: "100%",
                                        }}
                                    >
                                        <div style={{ marginBottom: "24px" }}>
                                            <Rate disabled defaultValue={testimonial.rating} style={{ fontSize: "14px", color: "#faad14" }} />
                                        </div>
                                        <Paragraph
                                            style={{
                                                color: "#000",
                                                fontSize: "clamp(0.875rem, 3vw, 1rem)",
                                                lineHeight: "1.6",
                                                marginBottom: "24px",
                                                fontWeight: "400",
                                            }}
                                        >
                                            "{testimonial.text}"
                                        </Paragraph>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <Avatar size={40} src={testimonial.avatar} style={{ marginRight: "12px" }} />
                                            <div>
                                                <div
                                                    style={{
                                                        color: "#000",
                                                        fontWeight: "500",
                                                        fontSize: "clamp(0.8rem, 2.5vw, 0.875rem)",
                                                    }}
                                                >
                                                    {testimonial.name}
                                                </div>
                                                <div
                                                    style={{
                                                        color: "#666",
                                                        fontSize: "clamp(0.7rem, 2vw, 0.75rem)",
                                                    }}
                                                >
                                                    {testimonial.location}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>

                {/* CTA Section */}
                <div style={{ padding: "clamp(60px, 12vw, 100px) 20px", background: "#000", textAlign: "center" }}>
                    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                        <Title
                            level={2}
                            style={{
                                color: "#fff",
                                marginBottom: "24px",
                                fontSize: "clamp(1.75rem, 6vw, 2.5rem)",
                                fontWeight: "700",
                            }}
                        >
                            Start building your family tree today
                        </Title>
                        <Paragraph
                            style={{
                                fontSize: "clamp(1rem, 4vw, 1.25rem)",
                                color: "#ccc",
                                marginBottom: "48px",
                                lineHeight: "1.6",
                            }}
                        >
                            Join thousands of families preserving their legacy. No credit card required.
                        </Paragraph>

                        {/* Mobile-first form layout */}
                        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
                            <Space.Compact size="large" style={{ width: "100%", display: "flex" }}>
                                <Input
                                    size="large"
                                    placeholder="Enter your email"
                                    style={{
                                        height: "clamp(44px, 8vw, 48px)",
                                        fontSize: "clamp(0.875rem, 3vw, 1rem)",
                                        borderRadius: "6px 0 0 6px",
                                        flex: 1,
                                    }}
                                />
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={handleGetStarted}
                                    style={{
                                        background: "#fff",
                                        borderColor: "#fff",
                                        color: "#000",
                                        borderRadius: "0 6px 6px 0",
                                        height: "clamp(44px, 8vw, 48px)",
                                        fontSize: "clamp(0.875rem, 3vw, 1rem)",
                                        fontWeight: "500",
                                        minWidth: "100px",
                                    }}
                                    icon={<ArrowRightOutlined />}
                                >
                                    <span className="desktop-text">Get started</span>
                                    <span className="mobile-text" style={{ display: "none" }}>
                                        Go
                                    </span>
                                </Button>
                            </Space.Compact>
                        </div>

                        <div style={{ marginTop: "24px" }}>
                            <Text style={{ color: "#999", fontSize: "clamp(0.75rem, 2.5vw, 0.875rem)" }}>
                                Free forever • No credit card required • Start in 30 seconds
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: block !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-text {
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
          .desktop-text {
            display: none !important;
          }
          .mobile-text {
            display: inline !important;
          }
        }
        
        @media (max-width: 480px) {
          .ant-col {
            padding-left: 8px !important;
            padding-right: 8px !important;
          }
        }
      `}</style>
        </div>
    )
}
