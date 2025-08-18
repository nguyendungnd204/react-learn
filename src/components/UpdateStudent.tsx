import { DatePicker, Form, Input, Modal, Select, Space, message } from 'antd'
import React, { useEffect } from 'react'
import { updateStudent } from '../api/student.api';
import { StudentList } from '../types/studentList';
import dayjs from 'dayjs';

const UpdateStudent = ({ 
    isModalOpen, 
    setIsModalOpen, 
    onStudentUpdated,
    student
}: { 
    isModalOpen: boolean, 
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    onStudentUpdated?: () => void,
    student: StudentList | null
}) => {

    type LayoutType = Parameters<typeof Form>[0]['layout'];
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = React.useState<LayoutType>('horizontal');

    useEffect(() => {
        if (student && isModalOpen) {
            form.setFieldsValue({
                student_code: student.student_code || '',
                first_name: student.first_name || '',
                last_name: student.last_name || '',
                email: student.email || '',
                dob: student.dob ? dayjs(student.dob) : null,
                gender: student.gender || '',
                phone: student.phone || '',
                address: student.address || '',
            });
        } else if (!student && isModalOpen) {
            form.resetFields();
        }
    }, [student, isModalOpen, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (!student) {
                message.error('Không có học sinh để cập nhật.');
                return;
            }
            await updateStudent(student.id, { ...values, dob: values.dob ? values.dob.format('YYYY-MM-DD') : '' });
            message.success('Cập nhật sinh viên thành công!');
            form.resetFields();
            setIsModalOpen(false);
            if (onStudentUpdated) {
                onStudentUpdated();
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Có lỗi xảy ra khi cập nhật sinh viên!';
            message.error(errorMessage);
            console.error('Error updating student:', error);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal
                title="Cập nhật học sinh"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Cập nhật"
                cancelText="Hủy"
            >
                <Form
                    layout={formLayout}
                    form={form}
                    initialValues={{ layout: formLayout }}
                    style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}
                >
                    <Form.Item label="Student Code" name="student_code" rules={[{ required: true, message: 'Please input your Student Code!' }]}>
                        <Input name="student_code" placeholder="Nhập mã code " />
                    </Form.Item>
                    <Form.Item label="First Name" name="first_name" rules={[{ required: true, message: 'Please input your First Name!' }]}>
                        <Input name="first_name" placeholder="Nhập tên học sinh" />
                    </Form.Item>
                    <Form.Item label="Last Name" name="last_name" rules={[{ required: true, message: 'Please input your Last Name!' }]}>
                        <Input name="last_name" placeholder="Nhập họ học sinh" />
                    </Form.Item>
                    <Space>
                    <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select your Gender!' }]}>
                        <Select
                            placeholder="Chọn giới tính"
                            style={{ width: 120 }}
                            options={[
                                { value: 'male', label: 'Male' },
                                { value: 'female', label: 'Female' },
                                { value: 'other', label: 'Other' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: 'Please select your Date of Birth!' }]}>
                        <DatePicker placeholder="Chọn ngày sinh" />
                    </Form.Item>
                    </Space>
                    <Form.Item label="Email" name="email" rules={[{ type: 'email', required: true, message: 'Please input your Email!' }]}>
                        <Input name="email" type='email' placeholder="Nhập email" />
                    </Form.Item>
                    <Form.Item label="Phone Number" name="phone" rules={[{ required: true, message: 'Please input your Phone Number!' }]}>
                        <Input name="phone" placeholder="Nhập số điện thoại" />
                    </Form.Item>
                    <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input your Address!' }]}>
                        <Input name="address" placeholder="Nhập địa chỉ" />
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}

export default UpdateStudent;