import { Button, Modal, Popconfirm, Space, Table, TableProps, Typography, notification } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import { deleteStudent, getStudents, searchStudent } from '../api/student.api';
import CreateStudent from '../components/CreateStudent';
import { useDispatch, useSelector } from 'react-redux';
import { setStudents } from '../store/studentSlice';
import type { RootState } from '../store';
import type { StudentList } from '../types/studentList';
import UpdateStudent from '../components/UpdateStudent';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import Search, { SearchProps } from 'antd/es/input/Search';

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

    const [searchLoading, setSearchLoading] = useState(false);

    // const onSearch: SearchProps['onSearch'] = useCallback(async (value: any) => {
    //     console.log('onSearch called with:', value); // debug: xem có gọi không
    //     try {
    //         setSearchLoading(true);
    //         if (!value || String(value).trim() === '') {
    //             await fetchStudents();
    //             return;
    //         }
    //         // gọi API search (POST body) - dùng searchStudent hoặc fetch nếu cần body
    //         const res = await searchStudent(value); // đảm bảo searchStudent gửi POST body như backend cần
    //         console.log('Search results:', res);
    //         const data = res.data ?? res;
    //         dispatch(setStudents(data));
    //         const total = res.meta?.total ?? (Array.isArray(data) ? data.length : 0);
    //         setPagination(prev => ({ ...prev, total, current: 1 }));
    //     } catch (err) {
    //         console.error('Error searching students:', err);
    //     } finally {
    //         setSearchLoading(false);
    //     }
    // }, [dispatch]);


    return (
        <div style={{ padding: '20px' }}>
            {contextHolder}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
                gap: 16,
                flexWrap: 'wrap'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0 }}>
                    <Text strong style={{ fontSize: 20, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Quản lý học sinh</Text>
                    <Search placeholder="Tìm kiếm học sinh" allowClear enterButton="Tìm" style={{ width: 320, minWidth: 160 }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type='primary' size="large" onClick={showModal}>Thêm học sinh</Button>
                </div>
            </div>
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