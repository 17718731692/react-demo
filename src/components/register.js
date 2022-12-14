import React from 'react';
import { Button, message, Form, Input } from 'antd';
import withHook from './withHook'
import "../asset/css/LoginHome.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
class Register extends React.Component {
    constructor() {
      super();
      this.state = {
        data: [],
        isLogin:false,
      }
    }
    toPath = (path) => {
      this.props.to(path)
    }
    render(){
      const onFinish = (values) => {
        let params = {
            id:Math.random(),
            username: values.username,
            password: values.password
        }
        axios.post(`http://localhost:3004/loginData`,params).then((res)=>{
            message.success('注册成功')
            this.toPath('/')
        })
      };
      const onFinishFailed = (err) => {
        
      };
        return (
          <div className='login'>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="用户名"
                name="username"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Link to='/'>去登录</Link>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  注册
                </Button>
              </Form.Item>
            </Form>
          </div>
          
        );
    }
}
const RegisterHome= withHook(Register)
export default RegisterHome;