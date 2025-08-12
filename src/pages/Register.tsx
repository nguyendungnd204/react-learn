import React, { useEffect, useState } from 'react';
import { getStudents } from '../api/student.api';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { login } from '../api/auth.pai';

const Register: React.FC = () => {
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
          width: 380,
          background: 'white',
          borderRadius: 18,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: 32, fontWeight: 700, color: '#3b82f6', letterSpacing: 1 }}>Đăng ký</h2>
        <Form.Item
          name="email"
          rules={[{ type:'email', required: true, message: 'Please input your Email!' }]}
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
        name=""
      >

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
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <span style={{ color: '#6b7280' }}>hoặc </span>
            <a href="" style={{ color: '#6366f1', fontWeight: 500 }}>Đăng nhập ngay!</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
