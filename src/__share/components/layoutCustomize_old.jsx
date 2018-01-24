import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

import urls from '../urls/urls';
import fetch from 'isomorphic-fetch';
import './layoutCustomize.css'

export default class LayoutCustomize extends React.Component {
    constructor() {
        super();
        this.state = {
            //顶部导航 数据
            navTopData: [],
            //侧边栏数据
            siderBarData: {},
            //选中的  顶部导航
            selectedKeysTop: [],

            //默认，展开的侧边栏类型
            openKeys: [],
            //选中的侧边栏
            selectedKeysSider: [],
            //面包屑
            breadcrumbData: [],



        }
        this.navDIC = {};
        this.clickHistory = {};
        this.BreadcrumbDIC = {};

    }

    componentWillMount() {
        this.getNavUrl();
    }
    getNavUrl() {
        fetch(urls.getNavUrl()).then(response => response.json()).then((data) => {
            this.initState(data);

        }).catch((e) => {
            console.log(e);
        })

    }
    initState(data) {
        let navTopData = [];
        data.map((item) => {
            if (this.navDIC[item.navTopName] == undefined) {
                this.navDIC[item.navTopName] = item;
            }
            let o = {
                path: item.path,
                navTopName: item.navTopName,
            };
            navTopData.push(o);//顶部导航
        });
        this.setState({
            navTopData: navTopData,
            selectedKeysTop: [navTopData[0].navTopName],
            siderBarData: data[0],
            openKeys: [],
            selectedKeysSider: [data[0].siderBar[0].children[0].name],
        })
    }
    //顶部导航
    showNavMenuItem(data) {
        let doms = [];
        data.forEach((item, index) => {
            doms.push(
                <Menu.Item key={item.navTopName}>
                    <Link to={item.path}>{item.navTopName}</Link>
                </Menu.Item>
            );
        })
        return doms;
    }
    //顶部导航 选中事件 
    navMenuItemChange(obj) {
        let openKeysData = this.state.openKeys;

        if (this.navDIC[obj.key] !== undefined) {
            this.setState({
                selectedKeysTop: [obj.key],
                siderBarData: this.navDIC[obj.key],
                openKeys: [this.navDIC[obj.key].siderBar[0].category],
                selectedKeysSider: [this.navDIC[obj.key].siderBar[0].children[0].name],
            })
        }
    }
    //侧边栏的类型
    showSiderSubMenu(data) {
        let doms = [];
        if (this.navDIC[data.navTopName] !== undefined) {
            data.siderBar.forEach((item, index) => {
                doms.push(
                    <SubMenu key={item.category} title={<span><Icon type="laptop" />{item.category}</span>}>
                        {this.showSiderMenu(item.children)}
                    </SubMenu>
                );
            })
        }
        return doms;
    }
    //showSiderSubMenu 展开事件
    onOpenChange(openKeys) {
        this.setState({
            openKeys: openKeys,
        })
    }
    //侧边栏menu 
    showSiderMenu(data) {
        let doms = [];
        data.forEach((item, index) => {
            doms.push(
                <Menu.Item key={item.name} >
                    <Link to={item.path}>{item.name}</Link>
                </Menu.Item>
            );
        })
        return doms;
    }
    //侧边栏menu 选中事件
    handlMenuSelect(obj) {
        this.setState({
            selectedKeysSider: obj.selectedKeys,
        })

    }
    //面包屑导航   
    showBreadcrumb() {
        let extraBreadcrumbItems = [];
        if (this.BreadcrumbDIC[location.pathname] !== undefined) {
            extraBreadcrumbItems = [(
                <Breadcrumb.Item key={location.pathname}>
                    <Link to={location.pathname}>
                        {this.BreadcrumbDIC[location.pathname].name}
                    </Link>
                </Breadcrumb.Item>
            )]
        }



        let breadcrumbItems = [(
            <Breadcrumb.Item key="home">
                <Link to="/">Home</Link>
            </Breadcrumb.Item>
        )].concat(extraBreadcrumbItems);
        return breadcrumbItems;
    }
    render() {
        const self = this;
        const {
            navTopData, siderBarData,
            selectedKeysTop, openKeys, selectedKeysSider,
            breadcrumbData
        } = this.state;
        return (
            <Layout>
                <Header className="header">
                    <div className="logo"></div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={selectedKeysTop}
                        onSelect={this.navMenuItemChange.bind(this)}
                        style={{ lineHeight: '64px' }}>
                        {this.showNavMenuItem(navTopData)}
                    </Menu>

                    <div className='login-info'>
                        用户信息框
                    </div>
                </Header>

                <Layout>
                    <Sider>
                        <Menu
                            mode="inline"
                            selectedKeys={selectedKeysSider}
                            onSelect={this.handlMenuSelect.bind(this)}
                            openKeys={openKeys}
                            onOpenChange={this.onOpenChange.bind(this)}
                            style={{ height: '100%', borderRight: 0 }}>
                            {/* {this.showSiderSubMenu(siderBarData)} */}
                            <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                                <Menu.Item key="1">Option 1</Menu.Item>
                                <Menu.Item key="2">Option 2</Menu.Item>
                                <Menu.Item key="3">Option 3</Menu.Item>
                                <Menu.Item key="4">Option 4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                                <Menu.Item key="5">Option 5</Menu.Item>
                                <Menu.Item key="6">Option 6</Menu.Item>
                                <SubMenu key="sub3" title="Submenu">
                                    <Menu.Item key="7">Option 7</Menu.Item>
                                    <Menu.Item key="8">Option 8</Menu.Item>
                                </SubMenu>
                            </SubMenu>
                            <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
                                <Menu.Item key="9">Option 9</Menu.Item>
                                <Menu.Item key="10">Option 10</Menu.Item>
                                <Menu.Item key="11">Option 11</Menu.Item>
                                <Menu.Item key="12">Option 12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>


                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280, padding: '0 24px 24px' }}>
                        {this.props.children}
                    </Content>

                </Layout>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2016 Created by Elijah He
    </Footer>
            </Layout>
        );
    }
}

//限定控件传入的属性类型
//Layout.propTypes={
//       index:PropTypes:number
//}

//设置默认属性
//Layout.defaultProps={
//  index:1,
//};

const a = withRouter(LayoutCustomize);