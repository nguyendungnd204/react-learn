import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';
import Error401 from './errors/error-401';

const ProtectedRoute: React.FC<{children: React.ReactElement}> = ({children}) => {
    const profile = useSelector((state: any) => state.profile);
    const location = useLocation();

    if(!profile) {
        return <Error401 />;
    }

    return children;
}

export default ProtectedRoute