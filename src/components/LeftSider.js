import React from 'react';
import { Layout, Menu } from 'antd';

export class LeftSider extends React.Component {
    render () {
        const leftSiderStyle = {
            display: 'flex',
            position: 'fixed',
            top: '0',
            left: '0',
            height: '100%',
            textAlign: 'center',
            backgroundColor: 'lightGray',
            alignItems: 'center',
            justifyContent: 'center'
        };
        const menuStyle = {
            display: 'flex',
            listStyleType: 'none',
        };

        return (
            <div className="leftSider">
                <Layout.Sider style={ leftSiderStyle }>
                    <Menu
                        mode="inline"
                    >
                        <Menu.Item style={ menuStyle } key={ 'FOO' }>
                            <p>FOO</p>
                        </Menu.Item>
                        <Menu.Item style={ menuStyle } key={ 'BAR' }>
                            <p>BAR</p>
                        </Menu.Item>
                        <Menu.Item style={ menuStyle } key={ 'BAZ' }>
                            <p>BAZ</p>
                        </Menu.Item>
                    </Menu>
                </Layout.Sider>
            </div>
        );
    }
}

export default LeftSider;
