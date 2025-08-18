import { DatePicker, Form, Input, Modal, Select, Space, message } from 'antd'
import React, { useEffect } from 'react'
import dayjs from 'dayjs';
import type { UserProfile } from '../types/userProfile';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile } from '../store/profileSlice';

const MyProfile = ({
    isModalOpen,
    setIsModalOpen,
    onSaved,
}: {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSaved?: () => void;
}) => {
    const [form] = Form.useForm();
    const profile = useSelector((state: any) => state.profile.profile) as UserProfile | null;
    const dispatch = useDispatch();

    useEffect(() => {
        form.setFieldsValue({
            name: profile?.name || '',
            email: profile?.email || '',
            gender: profile?.gender || '',
            birth: profile?.birth ? dayjs(profile.birth) : null,
        });
    }, [profile, isModalOpen, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const payload: UserProfile = {
                ...(profile || { id: '' }),
                name: values.name,
                email: values.email,
                gender: values.gender,
                birth: values.birth ? values.birth.format('YYYY-MM-DD') : '',
            };
            dispatch(setProfile(payload));
            message.success('Cập nhật hồ sơ thành công!');
            setIsModalOpen(false);
            if (onSaved) onSaved();
        } catch (err) {
            message.error('Có lỗi khi lưu hồ sơ');
            console.error(err);
        }
    };

    const handleCancel = () => setIsModalOpen(false);

    return (
        <Modal
            title="Hồ sơ của tôi"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Lưu"
            cancelText="Hủy"
        >
            <Form form={form} layout="vertical">
                <Form.Item label="Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
                    <Input />
                </Form.Item>

                <Space>
                    <Form.Item label="Giới tính" name="gender" rules={[{ required: true, message: 'Chọn giới tính' }]}>
                        <Select
                            style={{ width: 140 }}
                            options={[
                                { value: 'male', label: 'Male' },
                                { value: 'female', label: 'Female' },
                                { value: 'other', label: 'Other' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item label="Ngày sinh" name="birth" rules={[{ required: true, message: 'Chọn ngày sinh' }]}>
                        <DatePicker />
                    </Form.Item>
                </Space>

                <Form.Item label="Email" name="email" rules={[{ type: 'email', required: true, message: 'Nhập email hợp lệ' }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default MyProfile;