import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown, Layout, Menu, MenuProps, Space } from "antd";
import { DownOutlined, HomeOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;
const items: MenuProps['items'] = [
  {
    label: (
      <a href="https://www.antgroup.com" target="_blank" rel="noopener noreferrer">
        Thông tin cá nhân
      </a>
    ),
    key: '0',
  },
  {
    label: (
      <a href="https://www.aliyun.com" target="_blank" rel="noopener noreferrer">
        Cài đặt
      </a>
    ),
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: 'Đăng xuất',
    key: '3',
  },
];
const Header: React.FC = () => {
  const location = useLocation();
  return (
    <AntHeader style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", padding: '0' }}>
      <div style={{ display: "flex", alignItems: "center", height: "100%", maxWidth: 1200, margin: "0 auto", padding: '0 16px' }}>
        {/* Left: logo + primary nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flex: 1 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: 22, color: "#3b82f6", display: 'flex', alignItems: 'center' }}>
              <UserOutlined style={{ marginRight: 8 }} /> EduFit
            </div>
          </Link>

          <Link to="/student-management" style={{ fontWeight: 500, fontSize: 16, color: '#6366f1', display: 'flex', alignItems: 'center' }}>
            <TeamOutlined style={{ marginRight: 8 }} /> Quản lý học sinh
          </Link>
        </div>

        {/* Right: user actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Dropdown menu={{ items }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#111' }}>
              <Space>
                Nguyendung
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;
