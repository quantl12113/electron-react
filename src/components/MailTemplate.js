import React, { Component } from "react";
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default class MailPage extends Component {
  constructor(props) {
    super(props);
  }

  onFinish(values) {
    console.log('Success:', values);
  };

  render() {
    return (
      <div className="mail-page">
        <h1>Mail page</h1>
        <Form name="horizontal_login" layout="inline" onFinish={this.onFinish}>
					<Form.Item
						name="username"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
					</Form.Item>
					<Form.Item
						name="password"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Password"
						/>
					</Form.Item>
					<Form.Item shouldUpdate={true}>
						{() => (
							<Button
								type="primary"
								htmlType="submit"
							>
								Log in
							</Button>
						)}
					</Form.Item>
				</Form>
			</div>
    );
  }
}
