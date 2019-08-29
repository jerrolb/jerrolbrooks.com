import React from 'react';
import { Layout, Menu } from 'antd';
import { LINKS } from '../config/constants';

const Footer = () => {
    return (
        <Layout.Footer>
            <Menu>
                <Menu.Item key={ 'GITHUB' }>
                    <a href={ LINKS.GITHUB } target={ '_blank' }>View source on GitHub</a>
                </Menu.Item>
            </Menu>
        </Layout.Footer>
    );
};

export default Footer;
