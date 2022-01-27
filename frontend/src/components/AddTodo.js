import React, { useState } from 'react'
import "antd/dist/antd.css";
import { Form, Button, Input, DatePicker, Select } from 'antd'

const AddTodo = ({ addTodo }) => {
    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [due_date, setDueDate] = useState('')

    const addTodoHandler = e => {
        e.preventDefault()
        addTodo({
            title,
            description,
            status,
            due_date
        })
        
        
    }

    
    return (
       
        <Form>
            <Form.Item
                label="Title"
                name="title"
                rules={[
                    {
                        required: true,
                        message: 'Please input your title!',
                    },
                ]}

            >
                <Input placeholder="Title" onChange={e => setTitle(e.target.value)} />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[
                    {
                        required: true,
                        message: 'Please input your description',
                    },
                ]}
                
            >
                <Input onChange={e => setDescription(e.target.value)} />
            </Form.Item>

            <Form.Item label="Due Date" name="due_date"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Due Date',
                    },
                ]}
            >
                <DatePicker name = 'due_date' onChange={(date, dateString) => setDueDate(dateString)} />
            </Form.Item>

            <Form.Item label="Status" name = "status" 
                rules={[
                    {
                        required: true,
                        message: 'Please input Status',
                    },
                ]}
            >
                <Select onSelect={e => setStatus(e)}>
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
                <Button type="primary" htmlType="submit" onClick={addTodoHandler}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
export default AddTodo;