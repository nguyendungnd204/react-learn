import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined, InfoCircleOutlined, UserOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const location = useLocation();
  return (
    <AntHeader style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", padding: 0 }}>
      <div style={{ display: "flex", alignItems: "center", height: "100%", maxWidth: 1200, margin: "0 auto" }}>
        <Link to="/"> 
        <div style={{ fontWeight: 700, fontSize: 22, color: "#3b82f6", marginRight: 32 }}>
          <UserOutlined style={{ marginRight: 8 }} /> EduFit
        </div>
        </Link>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[location.pathname]}
          style={{ flex: 1, minWidth: 0, borderBottom: "none", background: "transparent" }}
        />
        <Link to="/student-management">
          <InfoCircleOutlined style={{ marginRight: 8 }} /> Quản lý học sinh
        </Link>
      </div>
    </AntHeader>
  );
};

export default Header;
