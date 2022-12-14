import React from 'react';
import { Button, message, Form, Input } from 'antd';
import withHook from '../withHook'
import "../../asset/css/LoginHome.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
class Login extends React.Component {
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
        let username = values.username
        let password = values.password
        axios.get(`http://localhost:3004/loginData?username=${username}&passward=${password}`).then((res)=>{
          console.log(res);
          if(res.status === 200 && res.data.length > 0){
            this.setState({
              data: res.data,
              isLogin:true
            },()=>{
              this.toPath('/list')
              message.success('登录成功');
            })
          }else{
            message.warning('登录失败,账户未注册或用户名密码错误');
          }
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
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Link to='/register'>去注册账号</Link>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
          
        );
    }
}
const LoginHome= withHook(Login)
export default LoginHome;