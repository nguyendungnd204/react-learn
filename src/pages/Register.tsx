import React, { useState } from 'react';
import { Badge, Button, Form, Input, Select, Space, Typography, notification } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { register } from '../api/auth.pai';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const { Text } = Typography;
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleRegister = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
        gender: values.gender,
      };
      console.log('Register payload:', payload);

      const data = await register({ data: payload });
      api.success({ message: 'Đăng ký thành công', description: 'Vui lòng đăng nhập để tiếp tục.' });
      form.resetFields();
    } catch (error: any) {
      console.error('Register error:', error);
      const msg = (error && (error.message || error.error || JSON.stringify(error))) || 'Đăng ký thất bại';
      api.error({ message: 'Đăng ký thất bại', description: msg });
    } finally {
      setLoading(false);
    }
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
        form={form}
        name="register"
        initialValues={{ remember: true }}
        onFinish={handleRegister}
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
              return Promise.reject(new Error('Passwords do not match!'));
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
            loading={loading}
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
