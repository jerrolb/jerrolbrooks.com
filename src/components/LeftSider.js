import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { ROUTES, LINKS, SCREENS, KEYS } from '../config/constants';
import { resetMenus } from '../config/helpers';

const LeftSider = () => {
    return (
        <Layout.Sider
            breakpoint="md"
            collapsedWidth="0"
            width={ 130 }
            style={ { borderRight: '1px solid' } }
        >
            <Menu id="siderMenu">
                <Menu.Item
                    key={ SCREENS.HOME }
                    onClick={ resetMenus }
                >
                    <NavLink to={ ROUTES.HOME } className="nav-text">
                        <Icon type="home" />
                        Home
                    </NavLink>
                </Menu.Item>
                <Menu.Item
                    key={ SCREENS.ABOUT }
                    onClick={ resetMenus }
                >
                    <NavLink to={ ROUTES.ABOUT } className="nav-text">
                        <Icon type="info" />
                        About
                    </NavLink>
                </Menu.Item>
                <Menu.Item
                    key={ KEYS.GITHUB }
                    onClick={ resetMenus }
                >
                    <a href={ LINKS.GITHUB } target={ '_blank' } rel="noopener noreferrer">
                        <Icon type="github" />
                        GitHub
                    </a>
                </Menu.Item>
                <Menu.Item
                    key={ KEYS.LINKEDIN }
                    onClick={ resetMenus }
                >
                    <a href={ LINKS.LINKEDIN } target={ '_blank' } rel="noopener noreferrer">
                        <Icon type="linkedin" />
                        LinkedIn
                    </a>
                </Menu.Item>
                <Menu.Item
                    key={ KEYS.FREELANCER }
                    onClick={ resetMenus }
                >
                    <a href={ LINKS.FREELANCER } target={ '_blank' } rel="noopener noreferrer">
                        <Icon type="code" />
                        Freelancer
                    </a>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
};

export default LeftSider;
