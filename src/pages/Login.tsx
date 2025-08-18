import React, { useEffect, useState } from 'react';
import { getStudents } from '../api/student.api';
import { Badge, Button, Checkbox, Flex, Form, Input, notification, Space } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { login, LoginResponse, getProfile } from '../api/auth.pai';
import { Link, Route, useNavigate } from 'react-router-dom';
import { Typography } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setProfile } from '../store/profileSlice';

const Login: React.FC = () => {
    const { Text } = Typography;
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useDispatch();
    const profile = useSelector((state: RootState) => state.profile);

    const handleLogin = async (values: { email: string; password: string }) => {
        setLoading(true);
        try {
            const data: LoginResponse = await login(values.email, values.password);
            
            localStorage.setItem('access_token', data.data?.access_token || '');
            localStorage.setItem('refresh_token', data.data?.refresh_token || '');

            const profileData = await getProfile();
            console.log('Profile data:', profileData);
            dispatch(setProfile(profileData));
            navigate('/student-management', { state: { message: 'Đăng nhập thành công!', description: 'Chào mừng bạn trở lại.' } });
            
        } catch (error: any) {
            console.error('Login error:', error);
            
            api.error({
                message: 'Đăng nhập thất bại',
                description: error.message || 'Email hoặc mật khẩu không đúng',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getStudents();
                console.log(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
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
                form={form}
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
                onFinish={handleLogin}
                validateTrigger="onBlur"
            >
                <Text style={{ 
                    textAlign: 'center', 
                    marginBottom: 32, 
                    fontWeight: 700, 
                    color: '#3b82f6', 
                    letterSpacing: 1,
                    fontSize: 24 
                }}>
                    Đăng nhập
                </Text>
                
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ!' }
                    ]}
                >
                    <Input
                        prefix={<UserOutlined style={{ color: '#3b82f6' }} />}
                        placeholder="Email"
                        size="large"
                        style={{ 
                            borderRadius: 8, 
                            border: '1px solid #e5e7eb', 
                            background: '#f3f4f6' 
                        }}
                    />
                </Form.Item>
                
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu!' },
                        { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined style={{ color: '#3b82f6' }} />}
                        placeholder="Mật khẩu"
                        size="large"
                        style={{ 
                            borderRadius: 8, 
                            border: '1px solid #e5e7eb', 
                            background: '#f3f4f6' 
                        }}
                    />
                </Form.Item>
                
                <Form.Item style={{ marginBottom: 8 }}>
                    <Flex justify="space-between" align="center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox style={{ color: '#6366f1' }}>Ghi nhớ tôi</Checkbox>
                        </Form.Item>
                        <Link to="/" style={{ color: '#6366f1', fontWeight: 500 }}>
                            Quên mật khẩu?
                        </Link>
                    </Flex>
                </Form.Item>
                
                <Form.Item>
                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        size="large"
                        loading={loading}
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
                        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </Button>
                    
                    <Space style={{ 
                        textAlign: 'center', 
                        marginTop: 8, 
                        display: 'flex', 
                        justifyContent: 'center' 
                    }}>
                        <Badge style={{ color: '#6b7280' }}>hoặc</Badge>
                        <Link to="/register" style={{ color: '#6366f1', fontWeight: 500 }}>
                            Đăng ký ngay!
                        </Link>
                    </Space>
                </Form.Item>
                {contextHolder}
            </Form>
        </div>
    );
};

export default Login;
