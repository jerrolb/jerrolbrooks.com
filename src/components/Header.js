import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { ROUTES, SCREENS } from '../config/constants';

export class Header extends React.Component {
    render () {
        const headerStyle = {
            display: 'flex-box',
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            backgroundColor: 'darkGray',
        };
        const menuStyle = {
            display: 'flex',
            justifyContent: 'center',
        };
        const menuItemStyle = {
            marginLeft: '20px',
        };

        return (
            <Layout.Header style={ headerStyle }>
                <Menu
                    style={ menuStyle }
                >
                    <Menu.Item key={ SCREENS.HOME }>
                        <NavLink to={ ROUTES.HOME } className="nav-text">Home</NavLink>
                    </Menu.Item>
                    <Menu.Item style={ menuItemStyle } key={ SCREENS.TICTACTOE }>
                        <NavLink to={ ROUTES.TICTACTOE } className="nav-text">Tic-Tac-Toe</NavLink>
                    </Menu.Item>
                    <Menu.Item style={ menuItemStyle } key={ SCREENS.DICEROLLER }>
                        <NavLink to={ ROUTES.DICEROLLER } className="nav-text">Dice Roller</NavLink>
                    </Menu.Item>
                </Menu>
            </Layout.Header>
        );
    }
}

export default Header;
