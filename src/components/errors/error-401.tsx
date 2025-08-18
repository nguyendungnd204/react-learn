import React from 'react';
import { Result, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Error401: React.FC = () => (
  <Result
    icon={<LockOutlined style={{ color: '#fa541c', fontSize: 48 }} />}
    title="401"
    subTitle="Bạn cần đăng nhập để truy cập trang này."
    extra={<Link to="/"><Button type="primary">Về trang chủ</Button></Link>}
  />
);

export default Error401;
