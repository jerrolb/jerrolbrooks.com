import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { ROUTES, LINKS, KEYS } from '../config/constants';
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
                    key={ KEYS.HOME }
                    onClick={ resetMenus }
                >
                    <NavLink to={ ROUTES.HOME } className="nav-text">
                        <Icon type="home" />
                        { KEYS.HOME }
                    </NavLink>
                </Menu.Item>
                <Menu.Item
                    key={ KEYS.ABOUT }
                    onClick={ resetMenus }
                >
                    <NavLink to={ ROUTES.ABOUT } className="nav-text">
                        <Icon type="info" />
                        { KEYS.ABOUT }
                    </NavLink>
                </Menu.Item>
                <Menu.Item
                    key={ KEYS.GITHUB }
                    onClick={ resetMenus }
                >
                    <a href={ LINKS.GITHUB } target={ '_blank' } rel="noopener noreferrer">
                        <Icon type="github" />
                        { KEYS.GITHUB }
                    </a>
                </Menu.Item>
                <Menu.Item
                    key={ KEYS.LINKEDIN }
                    onClick={ resetMenus }
                >
                    <a href={ LINKS.LINKEDIN } target={ '_blank' } rel="noopener noreferrer">
                        <Icon type="linkedin" />
                        { KEYS.LINKEDIN }
                    </a>
                </Menu.Item>
                <Menu.Item
                    key={ KEYS.FREELANCER }
                    onClick={ resetMenus }
                >
                    <a href={ LINKS.FREELANCER } target={ '_blank' } rel="noopener noreferrer">
                        <Icon type="code" />
                        { KEYS.FREELANCER }
                    </a>
                </Menu.Item>
                <Menu.Item
                    key={ KEYS.LEETCODE }
                    onClick={ resetMenus }
                >
                    <a href={ LINKS.LEETCODE } target={ '_blank' } rel="noopener noreferrer">
                        <Icon type="code" />
                        { KEYS.LEETCODE }
                    </a>
                </Menu.Item>
                <Menu.Item
                    key={ KEYS.RESUME }
                    onClick={ resetMenus }
                >
                    <a href={ LINKS.RESUME } target={ '_blank' } rel="noopener noreferrer">
                        <Icon type="snippets" />
                        { KEYS.RESUME }
                    </a>
                </Menu.Item>
                <Menu.Item
                    key={ KEYS.EMAIL }
                    onClick={ resetMenus }
                >
                    <a href="mailto: jerrolb@gmail.com">
                        <Icon type="mail" />
                        { KEYS.EMAIL }
                    </a>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
};

export default LeftSider;
