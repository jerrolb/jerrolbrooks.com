import React from 'react';
import { Layout, Menu } from 'antd';
import { LINKS } from '../config/constants';

export class Footer extends React.Component {
    render () {
        const footerStyle = {
            position: 'fixed',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '5%',
            textAlign: 'center',
            backgroundColor: 'lightGray'
        };
        const menuStyle = {
            display: 'flex',
            listStyleType: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'inherit'
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
