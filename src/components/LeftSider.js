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
            backgroundColor: 'darkGray',
            alignItems: 'center',
            justifyContent: 'center'
        };

        return (
            <div className="leftSider">
                <Layout.Sider style={ leftSiderStyle }>
                    <Menu>
                        <Menu.Item key={ 'FOO' }>
                            <p>FOO</p>
                        </Menu.Item>
                        <Menu.Item key={ 'BAR' }>
                            <p>BAR</p>
                        </Menu.Item>
                        <Menu.Item key={ 'BAZ' }>
                            <p>BAZ</p>
                        </Menu.Item>
                        <Menu.Item key={ 'QUX' }>
                            <p>QUX</p>
                        </Menu.Item>
                        <Menu.Item key={ 'TLDR' }>
                            <p>TLDR</p>
                        </Menu.Item>
                    </Menu>
                </Layout.Sider>
            </div>
        );
    }
}

export default LeftSider;
