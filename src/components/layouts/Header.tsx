import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Layout, MenuProps, Space } from "antd";
import { DownOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setProfile } from '../../store/profileSlice';

const { Header: AntHeader } = Layout;
const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile.profile);

  const isAuthenticated = Boolean(profile);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    dispatch(setProfile(null));
    navigate('/');
  };

  const items: MenuProps['items'] = React.useMemo(() => (
    isAuthenticated
      ? [
        { label: <Link to="/profile">Thông tin cá nhân</Link>, key: 'profile' },
        { type: 'divider' as const },
        { label: <a onClick={handleLogout}>Đăng xuất</a>, key: 'logout' },
      ]
      : [
        { label: <Link to="/login">Đăng nhập</Link>, key: 'login' },
        { label: <Link to="/register">Đăng ký</Link>, key: 'register' },
      ]
  ), [isAuthenticated]);

  return (
    <AntHeader style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", padding: '0' }}>
      <div style={{ display: "flex", alignItems: "center", height: "100%", maxWidth: 1200, margin: "0 auto", padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flex: 1 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: 22, color: "#3b82f6", display: 'flex', alignItems: 'center' }}>
              <UserOutlined style={{ marginRight: 8 }} /> EduFit
            </div>
          </Link>
          {
            isAuthenticated ? (
              <Link to="/student-management" style={{ fontWeight: 500, fontSize: 16, color: '#6366f1', display: 'flex', alignItems: 'center' }}>
                <TeamOutlined style={{ marginRight: 8 }} /> Quản lý học sinh
              </Link>
            ) : (
              <div style={{ display: 'flex', gap: 16 }}>
                <Link to="/register" style={{ fontWeight: 500, fontSize: 16, color: '#6366f1' }}>Đăng ký</Link>
                <Link to="/login" style={{ fontWeight: 500, fontSize: 16, color: '#6366f1' }}>Đăng nhập</Link>
              </div>
            )
          }

        </div>
        {
          isAuthenticated && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Dropdown menu={{ items }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#111' }}>
                  <Space>
                    {profile?.name || 'Người dùng'}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          )
        }


      </div>
    </AntHeader>
  );
};

export default Header;
