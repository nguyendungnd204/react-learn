import React, { useEffect, useState } from 'react';
import { getStudents } from '../api/student.api';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const Home: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f5f7fa 100%)',
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
        onFinish={onFinish}
      >
        <h2 style={{ textAlign: 'center', marginBottom: 32, fontWeight: 700, color: '#3b82f6', letterSpacing: 1 }}>Sign In</h2>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: '#3b82f6' }} />}
            placeholder="Username"
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
        <Form.Item style={{ marginBottom: 8 }}>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ color: '#6366f1' }}>Remember me</Checkbox>
            </Form.Item>
            <a href="" style={{ color: '#6366f1', fontWeight: 500 }}>Forgot password?</a>
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
          >
            Log in
          </Button>
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <span style={{ color: '#6b7280' }}>or </span>
            <a href="" style={{ color: '#6366f1', fontWeight: 500 }}>Register now!</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Home;
