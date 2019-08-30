import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { ROUTES, LINKS, SCREENS } from '../config/constants';

const LeftSider = () => {
    return (
        <Layout.Sider
            breakpoint="lg"
            collapsedWidth="0"
        >
            <Menu>
                <Menu.Item key={ SCREENS.HOME }>
                    <NavLink to={ ROUTES.HOME } className="nav-text">Home</NavLink>
                </Menu.Item>
                <Menu.Item key={ 'GITHUB' }>
                    <a href={ LINKS.GITHUB } target={ '_blank' }>GitHub</a>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
};

export default LeftSider;
