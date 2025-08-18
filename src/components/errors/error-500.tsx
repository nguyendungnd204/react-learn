import React from 'react';
import { Result, Button } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Error500: React.FC = () => (
  <Result
    icon={<WarningOutlined style={{ color: '#faad14', fontSize: 48 }} />}
    title="500"
    subTitle="Đã có lỗi xảy ra trên máy chủ. Vui lòng thử lại sau."
    extra={<Link to="/"><Button type="primary">Về trang chủ</Button></Link>}
  />
);

export default Error500;
