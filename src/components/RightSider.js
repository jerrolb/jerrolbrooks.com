import React from 'react';
import { Layout } from 'antd';

export class RightSider extends React.Component {
    render () {
        const rightSiderStyle = {
            position: 'fixed',
            right: '0',
            top: '0',
            height: '100%',
            textAlign: 'center',
            backgroundColor: 'lightGray'
        };

        return (
            <div className="RightSider">
                <Layout.Sider style={ rightSiderStyle }>
                </Layout.Sider>
            </div>
        );
    }
}

export default RightSider;
