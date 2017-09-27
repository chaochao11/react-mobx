/***
 * Created by xiaosong 2017/09/15
 * **/

import React from 'react';
import { inject, observer } from 'mobx-react';
import { Layout, Menu, Icon } from 'antd';
import './pageLayout.css';

const { Header, Sider, Content } = Layout

@inject('menuStore')
@observer
export default class PageLayout extends React.Component {
    constructor(props) {
        super(props);

        setTimeout(() => {
            this.props.menuStore.setMenuList(
                [{
                    name: "Demo1",
                    icon: "user",
                    id: "demo1"
                }, {
                    name: "Demo2",
                    icon: "video-camera",
                    id: "demo2"
                }]
            )
        },500)
    };

    onSkip = (item) => {    // 默认路由跳转
        this.props.router.push({pathname:`report/${item.key}`});
    }


    render () {
        const {children} = this.props;
        return (
            <Layout>
                <Sider>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" onClick = { this.onSkip }>
                        {
                            this.props.menuStore.menuList.map((item) => {
                                return(
                                    <Menu.Item key={ item.id }>
                                        <Icon type={ item.icon } />
                                        <span>{ item.name }</span>
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                        />
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}