import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../store';
import { Spin } from 'antd';
import Error401 from './errors/error-401';

const ProtectedRoute: React.FC<{children: React.ReactElement}> = ({children}) => {
    const profile = useSelector((state: RootState) => state.profile.profile);
    const location = useLocation();

    if (profile) return children;

    const token = localStorage.getItem('access_token');
    if (token) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return <Error401 />;
}

export default ProtectedRoute