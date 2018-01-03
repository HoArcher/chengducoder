
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Router, Route, Link, Switch, NavLink } from 'react-router-dom'
import './style/login.css';
import './style/app.css';

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
        this.setState({
            isLogin: true
        })
    }

    withoutLogin() {
        location.href = './context'
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
        const self = this;
        return (
            <div className='page-panel'>

                <Row className='login-panel' type="flex" justify="center">
                    <Col className='opration-box' xl={8} lg={14} md={18} sm={20} xs={24}>
                        <div className={isLogin ? 'loginPanel-show login login-form' : 'login-form login'}>
                            <div className='opration-box-bkg'></div>
                            <Form onSubmit={this.handleSubmit.bind(self)} className={'login-form'}>
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
                                        <Checkbox>自动登录</Checkbox>
                                        )}
                                    <a className="login-form-forgot" href="">Forgot password</a>
                                </FormItem>
                                <Button type="primary" size='large' htmlType="submit" className='login-form-button'>Log in </Button>

                                <div>
                                    Or <a href="">register now~!</a>
                                </div>
                            </Form>
                        </div>
                        <div className={isLogin ? 'login-form nav nav-hidden' : 'login-form nav'}>
                            <div className='opration-box-bkg'></div>
                            <div className={'login-form'} onClick={this.toLogin.bind(self)}>
                                <div className='devide-line'> </div>
                                <div className='option-box'>
                                    <ul>
                                        <li> <a href='javascript:;'>请登录...</a></li>
                                        <li> <Link to="/context">游客访问</Link> ></li>
                                    </ul></div>
                                <div className='devide-line'> </div>

                            </div>
                        </div>
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