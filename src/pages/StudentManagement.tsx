import { Button, Modal, Popconfirm, Space, Table, TableProps, Typography, notification } from 'antd';
import React, { useEffect, useState } from 'react'
import { deleteStudent, getStudents } from '../api/student.api';
import CreateStudent from '../components/CreateStudent';
import { useDispatch, useSelector } from 'react-redux';
import { setStudents } from '../store/studentSlice';
import type { RootState } from '../store';
import type { StudentList } from '../types/studentList';
import UpdateStudent from '../components/UpdateStudent';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

const StudentManagement = () => {
    const location = useLocation();
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        const state: any = location.state as any;
        if (state && state.message) {
            api.success({
                message: state.message,
                description: state.description,
                duration: 2,
            });
            window.history.replaceState({}, document.title);
        }
    }, [location, api]);

    const fetchdeleteStudent = async (id: string | number) => {
        try {
            await deleteStudent(id);
            api.success({
                message: 'Xóa học sinh thành công',
                description: 'Học sinh đã được xóa khỏi hệ thống.',
                duration: 2,
            });
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
            api.error({
                message: 'Xóa học sinh thất bại',
                description: 'Đã xảy ra lỗi khi xóa học sinh.',
                duration: 2,
            });
        }
    }

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
            render: (text, record) => (
                <Space size="small">
                    <Button onClick={() => {
                        setSelectedStudent(record);
                        setIsUpdateModalOpen(true);
                    }}>Sửa</Button>
                    <Popconfirm
                        title="Xác nhận xóa"
                        description="Bạn có chắc muốn xóa học sinh này không?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => fetchdeleteStudent(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },

    ];

    const { Text } = Typography;
    const dispatch = useDispatch();
    const students = useSelector((state: RootState) => state.students.students);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<StudentList | null>(null);

    const [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 10,
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

    useEffect(() => {
        if (!isUpdateModalOpen) {
            setSelectedStudent(null);
        }
    }, [isUpdateModalOpen]);



    const showModal = () => {
        setIsCreateModalOpen(true);
    };

    const fetchStudents = async () => {
        try {
            const response = await getStudents();
            console.log('Fetched students:', response);
            const data = response.data || response;
            dispatch(setStudents(data));
            const total = response.meta?.total || (Array.isArray(data) ? data.length : 0);
            setPagination(prev => ({ ...prev, total }));
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
            {contextHolder}
            <Space style={{ marginBottom: '16px', justifyContent: 'space-between', display: 'flex' }}>
                <Text strong style={{fontSize: '20px'}}>Quản lý học sinh</Text>
                <Button type='primary' size="large" onClick={showModal}>Thêm học sinh</Button>
            </Space>
            <CreateStudent
                isModalOpen={isCreateModalOpen}
                setIsModalOpen={setIsCreateModalOpen}
                onStudentCreated={handleStudentCreated}
            />
            <UpdateStudent
                isModalOpen={isUpdateModalOpen}
                setIsModalOpen={setIsUpdateModalOpen}
                onStudentUpdated={handleStudentCreated}
                student={selectedStudent}
            />
            <Table<StudentList>
                columns={columns}
                dataSource={students}
                rowKey="id"
                pagination={pagination}
                onChange={handleTableChange}
            />
        </div>
    )
}

export default StudentManagement