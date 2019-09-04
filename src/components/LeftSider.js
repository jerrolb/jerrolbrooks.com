import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { ROUTES, LINKS, SCREENS } from '../config/constants';

const LeftSider = () => {
    return (
        <Layout.Sider
            breakpoint="md"
            collapsedWidth="0"
            width={ 120 }
            style={ { borderRight: '1px solid' } }
        >
            <Menu>
                <Menu.Item key={ SCREENS.HOME }>
                    <NavLink to={ ROUTES.HOME } className="nav-text">
                        <Icon type="home" />
                        Home
                    </NavLink>
                </Menu.Item>
                <Menu.Item key={ 'GITHUB' }>
                    <a href={ LINKS.GITHUB } target={ '_blank' }>
                        <Icon type="github" />
                        GitHub
                    </a>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
};

export default LeftSider;
