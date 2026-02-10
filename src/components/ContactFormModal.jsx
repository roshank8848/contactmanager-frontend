import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';

const ContactFormModal = ({ open, onCreate, onCancel, initialValues, loading }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            form.resetFields();
            if (initialValues) {
                form.setFieldsValue(initialValues);
            }
        }
    }, [open, initialValues, form]);

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                onCreate(values);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            open={open}
            title={initialValues ? "Edit Contact" : "Add New Contact"}
            okText={initialValues ? "Update" : "Create"}
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={handleOk}
            confirmLoading={loading}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={initialValues}
            >
                <Form.Item
                    name="first_name"
                    label="First Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the first name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="last_name"
                    label="Last Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the last name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input the email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone_number"
                    label="Phone Number"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Address"
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ContactFormModal;
