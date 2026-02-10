import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Popconfirm, message, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { getContacts, createContact, updateContact, deleteContact } from '../services/api';
import ContactFormModal from '../components/ContactFormModal';

const { Title } = Typography;

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);

    const fetchData = async (search = '') => {
        setLoading(true);
        try {
            const data = await getContacts(0, 100, search);
            setContacts(data);
        } catch (error) {
            message.error('Failed to fetch contacts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (value) => {
        setSearchText(value);
        fetchData(value);
    };

    const handleAdd = () => {
        setEditingContact(null);
        setIsModalOpen(true);
    };

    const handleEdit = (record) => {
        setEditingContact(record);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteContact(id);
            message.success('Contact deleted successfully');
            fetchData(searchText);
        } catch (error) {
            message.error('Failed to delete contact');
        }
    };

    const handleCreateOrUpdate = async (values) => {
        setModalLoading(true);
        try {
            if (editingContact) {
                await updateContact(editingContact.id, values);
                message.success('Contact updated successfully');
            } else {
                await createContact(values);
                message.success('Contact created successfully');
            }
            setIsModalOpen(false);
            fetchData(searchText);
        } catch (error) {
            // Check if error response data detail exists (common in FastAPI)
            const errorMsg = error.response?.data?.detail || 'Operation failed';
            // If detail is an array (validation errors), join them
            const msg = Array.isArray(errorMsg)
                ? errorMsg.map(e => e.msg).join(', ')
                : errorMsg;
            message.error(msg);
        } finally {
            setModalLoading(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
            sorter: (a, b) => a.first_name.localeCompare(b.first_name),
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
            sorter: (a, b) => a.last_name.localeCompare(b.last_name),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    />
                    <Popconfirm
                        title="Delete the contact"
                        description="Are you sure to delete this contact?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="text" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={2} style={{ margin: 0 }}>Contacts</Title>
                <Space>
                    <Input.Search
                        placeholder="Search contacts"
                        allowClear
                        onSearch={handleSearch}
                        style={{ width: 250 }}
                    />
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                        Add Contact
                    </Button>
                </Space>
            </div>
            <Table
                columns={columns}
                dataSource={contacts}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 10 }}
            />

            <ContactFormModal
                open={isModalOpen}
                onCreate={handleCreateOrUpdate}
                onCancel={handleCancel}
                initialValues={editingContact}
                loading={modalLoading}
            />
        </div>
    );
};

export default ContactList;
