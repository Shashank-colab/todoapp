import React, { useState } from 'react'
import { Table, Input, Modal, Form, Button,DatePicker, Select } from "antd";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";




const Todo = ({ todos, editTodo, deleteTodo }) => {
    const [isediting, setIsEditing] = useState(false)
    const [editingTodo,setEditingTodo] = useState(null)

    const onEditTodo = (todo) => {
        setIsEditing(true)
        setEditingTodo({...todo})
        
    }

    const columns = [
        {
            key: "1",
            title: "Created",
            dataIndex: "created",
            sorter: (todos1, todos2) => {
                return (todos1.created > todos2.created)
            }
        },
        {
            key: "2",
            title: "id",
            dataIndex: "id",
            sorter: (todos1, todos2) => {
                return (todos1.id > todos2.id)
            }
        },
        {
            key: "3",
            title: "title",
            dataIndex: "title",
            sorter: (todos1, todos2) => {
                return (todos1.title > todos2.title)
            },
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => {
                return (
                    <>
                        <Input
                            autoFocus
                            placeholder="Type text here"
                            value={selectedKeys[0]}
                            onChange={(e) => {
                                setSelectedKeys(e.target.value ? [e.target.value] : []);
                                confirm({ closeDropdown: false });
                            }}
                            onPressEnter={() => {
                                confirm();
                            }}
                            onBlur={() => {
                                confirm();
                            }}
                        ></Input>
                        <Button
                            onClick={() => {
                                confirm();
                            }}
                            type="primary"
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                clearFilters();
                            }}
                            type = "danger"
                        >
                            Reset
                        </Button>
                    </>
                );
            },
            filterIcon: () => {
                return <SearchOutlined />;
            },
            onFilter: (value, todos) => {
                return todos.title.toLowerCase().includes(value.toLowerCase());
            }
        },
        {
            key: "4",
            title: "description",
            dataIndex: "description",
            sorter: (todos1, todos2) => {
                return (todos1.description > todos2.description)
            }
        },
        {
            key: "5",
            title: "Due_date",
            dataIndex: "due_date",
            sorter: (todos1, todos2) => {
                return (todos1.due_date > todos2.due_date)
            }
        },
        {
            key: "6",
            title: "status",
            dataIndex: "status",
            filters: [
                { text: 'OPEN', value: 'OPEN' },
                { text: 'working', value: 'WORKING' },
                { text: 'due', value: 'DUE' },
                { text: 'completed', value: 'COMPLETED' }
            ],
            onFilter: (value, todos) => {
                return todos.status === value
            }
        },
        {
            key: "7",
            title: "Actions",
            render: (todo) => {
                return (
                    <>
                        <EditOutlined
                            onClick={() => {onEditTodo(todo)}}
                        />
                        <DeleteOutlined


                            onClick={() => { deleteTodo(todo) }}
                            style={{ color: "red", marginLeft: 12 }}
                        />
                    </>
                );
            },
        },
    ];
    const resetEditing = () =>{
        setIsEditing(false);
        setEditingTodo(null);
    }
   

    return (
        <>

            <Table columns={columns} dataSource={todos} pagination={true}></Table>
            <Modal
                title='Edit todo'
                visible={isediting}
                onCancel={() => {
                    resetEditing();
                }}
                onOk={() => {
                    editTodo(editingTodo)
                    resetEditing()
                }}
            >
                <Form
                    initialValues={{...editingTodo}}
                
                >
                    <Form.Item
                        label="Title"
                        name = "title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your title!',
                            },
                        ]}

                    >
                        <Input value = {editingTodo?.title} onChange={e => setEditingTodo(pre => {return {...pre,title:e.target.value}})}/>
                    </Form.Item>

                    <Form.Item
                        label="description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your description',
                            },
                        ]}

                    >
                        <Input value = {editingTodo?.description} onChange={e => setEditingTodo(pre => {return {...pre,description:e.target.value}})} />
                    </Form.Item>

                    <Form.Item label="Due Date" >
                        <DatePicker name='due_date' onChange={(date, dateString) => setEditingTodo(pre => {return {...pre,due_date:dateString}})} />
                    </Form.Item>

                    <Form.Item label="Status" name="status" >
                        <Select value = {editingTodo?.status} onSelect={e => setEditingTodo(pre => {return {...pre,status:e}})}>
                            <Select.Option value="OPEN">OPEN</Select.Option>
                            <Select.Option value="WORKING">WORKING</Select.Option>
                            <Select.Option value="DUE">DUE</Select.Option>
                            <Select.Option value="COMPLETED">COMPLETED</Select.Option>
                        </Select>
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default Todo;