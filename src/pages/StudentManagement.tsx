import { Button, Modal, Table, TableProps } from 'antd';
import React, { useEffect, useState } from 'react'
import { getStudents } from '../api/student.api';
import CreateStudent from './CreateStudent';
import { useDispatch, useSelector } from 'react-redux';
import { setStudents } from '../store/studentSlice';
import type { RootState } from '../store';
import type { StudentList } from '../types/studentList';

const StudentManagement = () => {

    const columns: TableProps<StudentList>['columns'] = [
        {
            title: 'Student Code',
            dataIndex: 'student_code',
            key: 'student_code',
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Gender',
            key: 'gender',
            dataIndex: 'gender',
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Phone Number',
            key: 'phone',
            dataIndex: 'phone',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dob',
            key: 'dob',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },

        {
            title: 'Action',
            key: 'action',
        },

    ];

    const dispatch = useDispatch();
    const students = useSelector((state: RootState) => state.students.students);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 5,
        total: 0,
    });

    useEffect(() => {
        setPagination(prev => ({
            ...prev,
            total: students.length
        }));
    }, [students]);

    useEffect(() => {
        fetchStudents();
    }, [dispatch]);



    const showModal = () => {
        setIsModalOpen(true);
    };

    const fetchStudents = async () => {
        try {
            const response = await getStudents();
            if (response && response.data) {
                dispatch(setStudents(response.data));
            }
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleStudentCreated = () => {
        fetchStudents(); 
    };


    const handleTableChange = (pag: any) => {
        setPagination({ ...pagination, ...pag });
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '16px', justifyContent: 'space-between', display: 'flex' }}>
                <h2>Quản lý học sinh</h2>
                <Button type='primary' size="large" onClick={showModal}>Thêm học sinh</Button>
            </div>
            <CreateStudent 
                isModalOpen={isModalOpen} 
                setIsModalOpen={setIsModalOpen}
                onStudentCreated={handleStudentCreated}
            />
            <Table<StudentList>
                columns={columns}
                dataSource={students}
                pagination={pagination}
                onChange={handleTableChange}
            />
        </div>
    )
}

export default StudentManagement