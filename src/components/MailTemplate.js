import React, { Component } from "react";
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Mailer } from 'nodemailer-react';

export default class MailPage extends Component {
  constructor(props) {
		super(props);
		this.sendMail = this.sendMail.bind(this);
  }

  onFinish(values) {
    console.log('Success:', values);
	};

	sendMail(){
		const { sendMail } = window.require('electron').remote.require('../src/lib/sendMail');
		sendMail();
	}

  render() {
    return (
      <div className="mail-page">
        <h1>Mail page</h1>
        <Form name="horizontal_login" layout="inline" onFinish={this.onFinish}>
					<Form.Item
						name="username"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
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
								Test
							</Button>
						)}
					</Form.Item>
					<Form.Item shouldUpdate={true}>
						{() => (
							<Button
								type="primary"
								onClick={this.sendMail}
							>
								Send mail
							</Button>
						)}
					</Form.Item>
				</Form>
			</div>
    );
  }
}
