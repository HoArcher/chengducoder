
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style/login.css'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
const FormItem = Form.Item;
class WelcomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            isLogin: false,
        }
    }
    componentWillMount() {
        localStorage.uuid

    }
    toLogin() {

    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isLogin } = this.state;
        return (
            <div className='page-panel'>

                <Row className='login-panel' type="flex" justify="center">
                    <Col className='option-box' xl={5} lg={8} md={12} sm={16} xs={20}>
                        {isLogin ?
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <FormItem>
                                    {getFieldDecorator('userName', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                        )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please input your Password!' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                        )}
                                </FormItem>
                                <FormItem style={{ marginBottom: 0.1 + 'rem' }}>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(
                                        <Checkbox>Remember me</Checkbox>
                                        )}
                                    <a className="login-form-forgot" href="">Forgot password</a>
                                </FormItem>
                                <Button type="primary" size='large' htmlType="submit" className='login-form-button'>Log in </Button>

                                <div>
                                    Or <a href="">register now~!</a>
                                </div>

                            </Form> : <div onClick={this.toLogin}>
                                请登录

                        </div>}
                    </Col>
                </Row>
                {/* <div className='login-panel'>
                    <div className='option-box'>
                      
                    </div>
                </div> */}
            </div>
        );
    }
}

const Welcome = Form.create()(WelcomePage);
module.exports = Welcome;