import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { ROUTES, LINKS } from '../config/constants';

const LeftSider = () => {
    return (
        <Layout.Sider>
            <Menu>
                <Menu.Item key={ 'API' }>
                    <NavLink to={ ROUTES.API } className="nav-text">Api</NavLink>
                </Menu.Item>
                <Menu.Item key={ 'GITHUB' }>
                    <a href={ LINKS.GITHUB } target={ '_blank' }>GitHub</a>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
};

export default LeftSider;
