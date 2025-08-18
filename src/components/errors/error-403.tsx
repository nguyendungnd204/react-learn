import React from 'react';
import { Result, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Error403: React.FC = () => (
  <Result
    icon={<LockOutlined style={{ color: '#fa541c', fontSize: 48 }} />}
    title="403"
    subTitle="Bạn không có quyền truy cập vào trang này."
    extra={<Link to="/"><Button type="primary">Về trang chủ</Button></Link>}
  />
);

export default Error403;
