import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { ROUTES, LINKS, KEYS } from '../config/constants';
import { resetMenus } from '../config/helpers';

const menuLink = (key, link, icon) => (
    <Menu.Item key={ key } onClick={ resetMenus }>
        <a href={ link } target={ '_blank' } rel="noopener noreferrer">
            <Icon type={ icon } />
            { key }
        </a>
    </Menu.Item>
);

const navLink = (key, link, icon) => (
    <Menu.Item key={ key } onClick={ resetMenus } >
        <NavLink to={ link }>
            <Icon type={ icon } />
            { key }
        </NavLink>
    </Menu.Item>
);

const LeftSider = () => {
    return (
        <Layout.Sider
            breakpoint="md"
            collapsedWidth="0"
            width={ 130 }
            style={ { borderRight: '1px solid' } }
        >
            <Menu id="siderMenu">
                { navLink(KEYS.HOME, ROUTES.HOME, 'home') }
                { navLink(KEYS.ABOUT, ROUTES.ABOUT, 'info') }
                { menuLink(KEYS.GITHUB, LINKS.GITHUB, 'github') }
                { menuLink(KEYS.LINKEDIN, LINKS.LINKEDIN, 'linkedin') }
                { menuLink(KEYS.FREELANCER, LINKS.FREELANCER, 'code') }
                { menuLink(KEYS.LEETCODE, LINKS.LEETCODE, 'code') }
                { menuLink(KEYS.RESUME, LINKS.RESUME, 'snippets') }

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
