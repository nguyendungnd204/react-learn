import { Button, Typography } from 'antd';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';

const Home = () => {
    const { Text, Link } = Typography;

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <Text strong>Chào mừng bạn đến với hệ thống quản lý học sinh</Text>
      <br />
    </div>
  )
}

export default Home