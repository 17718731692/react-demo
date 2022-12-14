import { Button, Form, Input, Modal, Select,message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="新增"
            okText="保存"
            cancelText="取消"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="horizontal"
                name="form_in_modal"
                labelCol={{span:4}}
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="id"
                    label="id"
                    style={{display:'none'}}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="drugCode"
                    label="药品代码"
                    rules={[
                        {
                            required: true,
                            message: '请输入药品代码!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="drugName"
                    label="药品名"
                    rules={[
                        {
                            required: true,
                            message: '请输入药品名!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="价格"
                    rules={[
                        {
                            required: true,
                            message: '请输入价格!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="business"
                    label="商家"
                    rules={[
                        {
                            required: true,
                            message: '请选择商家!',
                        },
                    ]}
                >
                <Select>
                    <Select.Option value="老百姓大药房">老百姓大药房</Select.Option>
                    <Select.Option value="怡心大药房">怡心大药房</Select.Option>
                </Select>
                </Form.Item>
                <Form.Item
                    name="type"
                    label="类别"
                    rules={[
                        {
                            required: true,
                            message: '请选择类别!',
                        },
                    ]}
                >
                <Select>
                    <Select.Option value="感冒药">感冒药</Select.Option>
                    <Select.Option value="儿童药">儿童药</Select.Option>
                    <Select.Option value="胃药">胃药</Select.Option>
                    <Select.Option value="西药">西药</Select.Option>
                    <Select.Option value="中成药">中成药</Select.Option>
                </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};
const App = (props) => {
    const [open, setOpen] = useState(false);
    const onCreate = (values) => {
        values.id = (props.data.length + 1).toString()
        axios.post('http://localhost:3004/list',values).then((res)=>{
            if(res.status === 201){
                setOpen(false)
                props.getData()
                message.success('保存成功')
            }
            
        })
    };
    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setOpen(true);
                }}
            >
                新增
            </Button>
            <CollectionCreateForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </div>
    );
};
export default App;