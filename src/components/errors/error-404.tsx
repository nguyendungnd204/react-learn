import React from 'react';
import { Result, Button } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Error404: React.FC = () => (
  <Result
    icon={<FileOutlined style={{ color: '#1890ff', fontSize: 48 }} />}
    title="404"
    subTitle="Trang bạn yêu cầu không tồn tại."
    extra={<Link to="/"><Button type="primary">Về trang chủ</Button></Link>}
  />
);

export default Error404;
