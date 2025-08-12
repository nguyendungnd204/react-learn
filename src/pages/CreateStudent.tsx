import { Button, DatePicker, DatePickerProps, Form, Input, Modal, Radio, Select, Space } from 'antd'
import React, { useState } from 'react'

const CreateStudent = ({ isModalOpen, setIsModalOpen }: { isModalOpen: boolean, setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

    type LayoutType = Parameters<typeof Form>[0]['layout'];
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
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
                    <Form.Item label="Student Code">
                        <Input placeholder="Nhập mã code " />
                    </Form.Item>
                    <Form.Item label="First Name">
                        <Input placeholder="Nhập tên học sinh" />
                    </Form.Item>
                    <Form.Item label="Last Name">
                        <Input placeholder="Nhập tên học sinh" />
                    </Form.Item>
                    <Form.Item label="Gender">
                        <Select
                            defaultValue="lucy"
                            style={{ width: 120 }}
                            onChange={handleChange}
                            options={[
                                { value: 'male', label: 'Male' },
                                { value: 'female', label: 'Female' },
                                { value: 'other', label: 'Other' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label="Date of Birth">
                        <DatePicker onChange={onChange} />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input type='email' placeholder="Nhập email" />
                    </Form.Item>
                    <Form.Item label="Phone Number">
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>
                    <Form.Item label="Address">
                        <Input placeholder="Nhập địa chỉ" />
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}

export default CreateStudent