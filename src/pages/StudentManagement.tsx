import { Button, Modal, Table, TableProps } from 'antd';
import React, { useEffect, useState } from 'react'
import { getStudents } from '../api/student.api';
import CreateStudent from './CreateStudent';

const StudentManagement = () => {

    interface Student {
        id: string;
        student_code: string;
        first_name: string;
        last_name: string;
        email: string;
        dob: string;
        gender: string;
        phone: string;
        address: string;
    }

    const columns: TableProps<Student>['columns'] = [
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

    const [students, setStudents] = React.useState<Student[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await getStudents();
            console.log(response);
            setStudents(response.data);

        }
        fetchStudents();
    }, []);
    const [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 5,
        total: students.length,
    });



    const showModal = () => {
        setIsModalOpen(true);
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
            <CreateStudent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <Table<Student>
                columns={columns}
                dataSource={students}
                pagination={pagination}
                onChange={handleTableChange}
            />
        </div>
    )
}

export default StudentManagement