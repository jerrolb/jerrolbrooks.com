import React from 'react';
import { Layout, Menu } from 'antd';
import { LINKS } from '../config/constants';

export class Footer extends React.Component {
    render () {
        const footerStyle = {
            display: 'flex-box',
            position: 'fixed',
            bottom: '0',
            left: '0',
            width: '100%',
            backgroundColor: 'darkGray'
        };
        const menuStyle = {
            display: 'flex',
            justifyContent: 'center',
        };

        return (
            <div className="footer">
                <Layout.Footer style={ footerStyle }>
                    <Menu style={ menuStyle }>
                        <Menu.Item key={ 'GITHUB' }>
                            <a href={ LINKS.GITHUB }>View source on GitHub</a>
                        </Menu.Item>
                    </Menu>
                </Layout.Footer>
            </div>
        );
    }
}

export default Footer;
