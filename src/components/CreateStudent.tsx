import { Button, DatePicker, DatePickerProps, Form, Input, Modal, Radio, Select, Space, message } from 'antd'
import React, { useState } from 'react'
import type { CreateStudent } from '../types/createStudent';
import { createStudent } from '../api/student.api';

const CreateStudent = ({ 
    isModalOpen, 
    setIsModalOpen, 
    onStudentCreated 
}: { 
    isModalOpen: boolean, 
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    onStudentCreated?: () => void
}) => {

    type LayoutType = Parameters<typeof Form>[0]['layout'];
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
    const [studentData, setStudentData] = useState<CreateStudent | null>({
        student_code: '',
        first_name: '',
        last_name: '',
        email: '',
        dob: '',
        gender: '',
        phone: '',
        address: '',
    });

    const handleOk = async () => {
        try {
            await form.validateFields();
            if (studentData) {
                await createStudent(studentData);
                message.success('Thêm sinh viên thành công!');
                form.resetFields();
                setStudentData({
                    student_code: '',
                    first_name: '',
                    last_name: '',
                    email: '',
                    dob: '',
                    gender: '',
                    phone: '',
                    address: '',
                });
                setIsModalOpen(false);
                if (onStudentCreated) {
                    onStudentCreated();
                }
            }
        } catch (error) {
            message.error('Có lỗi xảy ra khi thêm sinh viên!');
            console.error('Error creating student:', error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleGenderChange = (value: string) => {
        setStudentData((prev) => prev ? { ...prev, gender: value } : null);
    };

    const handleDateChange: DatePickerProps['onChange'] = (date, dateString) => {
        setStudentData((prev) => prev ? { ...prev, dob: typeof dateString === 'string' ? dateString : '' } : null);
    };

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStudentData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <Modal
                title="Thêm học sinh"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    layout={formLayout}
                    form={form}
                    initialValues={{ layout: formLayout }}
                    style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}
                >
                    <Form.Item label="Student Code" name="student_code" rules={[{ required: true, message: 'Please input your Student Code!' }]}>
                        <Input name="student_code" placeholder="Nhập mã code " onChange={inputChange} />
                    </Form.Item>
                    <Form.Item label="First Name" name="first_name" rules={[{ required: true, message: 'Please input your First Name!' }]}>
                        <Input name="first_name" placeholder="Nhập tên học sinh" onChange={inputChange} />
                    </Form.Item>
                    <Form.Item label="Last Name" name="last_name" rules={[{ required: true, message: 'Please input your Last Name!' }]}>
                        <Input name="last_name" placeholder="Nhập họ học sinh" onChange={inputChange} />
                    </Form.Item>
                    <Space>
                    <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select your Gender!' }]}>
                        <Select
                            defaultValue=""
                            placeholder="Chọn giới tính"
                            style={{ width: 120 }}
                            onChange={handleGenderChange}
                            options={[
                                { value: 'male', label: 'Male' },
                                { value: 'female', label: 'Female' },
                                { value: 'other', label: 'Other' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: 'Please select your Date of Birth!' }]}>
                        <DatePicker onChange={handleDateChange} placeholder="Chọn ngày sinh" />
                    </Form.Item>
                    </Space>
                    <Form.Item label="Email" name="email" rules={[{ type: 'email', required: true, message: 'Please input your Email!' }]}>
                        <Input name="email" type='email' placeholder="Nhập email" onChange={inputChange} />
                    </Form.Item>
                    <Form.Item label="Phone Number" name="phone" rules={[{ required: true, message: 'Please input your Phone Number!' }]}>
                        <Input name="phone" placeholder="Nhập số điện thoại" onChange={inputChange} />
                    </Form.Item>
                    <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input your Address!' }]}>
                        <Input name="address" placeholder="Nhập địa chỉ" onChange={inputChange} />
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}

export default CreateStudent