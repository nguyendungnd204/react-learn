import React, { useEffect, useState } from 'react';
import { getStudents } from '../api/student.api';
import { Badge, Button, Checkbox, Flex, Form, Input, Select, Space, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { login } from '../api/auth.pai';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const { Text } = Typography;
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    name: '',
    gender: ''
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

  const handleGenderChange = (value: string) => {
    setInput((prev) => ({ ...prev, gender: value }));
  };


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
          width: 460,
          background: 'white',
          borderRadius: 18,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Text style={{ textAlign: 'center', marginBottom: 32, fontWeight: 700, color: '#3b82f6', letterSpacing: 1 }}>Đăng ký</Text>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your Name!' }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: '#3b82f6' }} />}
            placeholder="Name"
            size="large"
            style={{ borderRadius: 8, border: '1px solid #e5e7eb', background: '#f3f4f6' }}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ type: 'email', required: true, message: 'Please input your Email!' }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: '#3b82f6' }} />}
            placeholder="Email"
            size="large"
            style={{ borderRadius: 8, border: '1px solid #e5e7eb', background: '#f3f4f6' }}
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
          />
        </Form.Item>
        <Form.Item
          name="password_confirmation"
          rules={[{ required: true, message: 'Please confirm your Password!' }, ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
            },
          }),]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: '#3b82f6' }} />}
            placeholder="Confirm Password"
            size="large"
            style={{ borderRadius: 8, border: '1px solid #e5e7eb', background: '#f3f4f6' }}
          />
        </Form.Item>
        <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select your Gender!' }]}>
          <Select
            defaultValue=""
            placeholder="Chọn giới tính"
            style={{ width: 120 }}
            onChange={handleGenderChange}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
          />
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
            Đăng ký
          </Button>
          <Space style={{ textAlign: 'center', marginTop: 8, display: 'flex', justifyContent: 'center' }}>
            <Badge style={{ color: '#6b7280' }}>hoặc </Badge>
            <Link to="/" style={{ color: '#6366f1', fontWeight: 500 }}>Đăng nhập ngay!</Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
