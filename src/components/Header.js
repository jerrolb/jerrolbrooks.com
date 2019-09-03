import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { ROUTES, SCREENS } from '../config/constants';

const Header = () => {
    const headerStyle = {
        height: '50px',
        padding: '0'
    };

    const menuStyle = {
        height: '49px',
        display: 'flex',
        justifyContent: 'center'
    };

    return (
        <Layout.Header style={ headerStyle }>
            <Menu style={ menuStyle }>
                <Menu.Item key={ 'API' }>
                    <NavLink to={ ROUTES.API } className="nav-text">Api</NavLink>
                </Menu.Item>
                <Menu.Item key={ SCREENS.TICTACTOE }>
                    <NavLink to={ ROUTES.TICTACTOE } className="nav-text">Tic-Tac-Toe</NavLink>
                </Menu.Item>
                <Menu.Item key={ SCREENS.CHESS }>
                    <NavLink to={ ROUTES.CHESS } className="nav-text">Chess</NavLink>
                </Menu.Item>
                <Menu.Item key={ SCREENS.DICEROLLER }>
                    <NavLink to={ ROUTES.DICEROLLER } className="nav-text">Dice Roller</NavLink>
                </Menu.Item>
            </Menu>
        </Layout.Header>
    );
};

export default Header;
