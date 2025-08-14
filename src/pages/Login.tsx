import React, { useEffect, useState } from 'react';
import { getStudents } from '../api/student.api';
import { Badge, Button, Checkbox, Flex, Form, Input, Space } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { login } from '../api/auth.pai';
import { Link } from 'react-router-dom';
import { Typography } from "antd";

const Login: React.FC = () => {
    const { Text } = Typography;
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        email: '',
        password: ''
    });

    const handleLogin = async () => {
        setLoading(true);
        try {
            const data = await login(input.email, input.password);
            console.log(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
      const fetchStudents = async () => {
        const data = await getStudents();
        console.log(data);
      };
      fetchStudents();
    }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
       
      }}
    >
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{
          width: 500,
          background: 'white',
          borderRadius: 18,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Text style={{ textAlign: 'center', marginBottom: 32, fontWeight: 700, color: '#3b82f6', letterSpacing: 1 }}>Đăng nhập</Text>
        <Form.Item
          name="email"
          rules={[{ type:'email', required: true, message: 'Please input your Email!' }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: '#3b82f6' }} />}
            placeholder="Email"
            size="large"
            style={{ borderRadius: 8, border: '1px solid #e5e7eb', background: '#f3f4f6' }}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: '#3b82f6' }} />}
            placeholder="Password"
            size="large"
            style={{ borderRadius: 8, border: '1px solid #e5e7eb', background: '#f3f4f6' }}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 8 }}>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ color: '#6366f1' }}>Ghi nhớ tôi</Checkbox>
            </Form.Item>
            <Link to="/" style={{ color: '#6366f1', fontWeight: 500 }}>Quên mật khẩu?</Link>
          </Flex>
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            size="large"
            style={{
              borderRadius: 8,
              background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)',
              border: 'none',
              fontWeight: 600,
              fontSize: 16,
              boxShadow: '0 2px 8px rgba(99, 102, 241, 0.15)',
              marginBottom: 8,
            }}
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
          <Space style={{ textAlign: 'center', marginTop: 8, display: 'flex', justifyContent: 'center' }}>
            <Badge style={{ color: '#6b7280' }}>hoặc</Badge>
            <Link to="/register" style={{ color: '#6366f1', fontWeight: 500 }}>Đăng ký ngay!</Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
