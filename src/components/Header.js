import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { ROUTES, SCREENS } from '../config/constants';
import { resetMenus } from '../config/helpers';

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
            <Menu
                id="headerMenu"
                style={ menuStyle }
            >
                <Menu.Item
                    key={ 'API' }
                    onClick={ resetMenus }
                >
                    <NavLink to={ ROUTES.API } className="nav-text">
                        <Icon type="api" />
                        Api
                    </NavLink>
                </Menu.Item>
                <Menu.Item
                    key={ SCREENS.DICEROLLER }
                    onClick={ resetMenus }
                >
                    <NavLink to={ ROUTES.DICEROLLER } className="nav-text">
                        <Icon type="dot-chart" />
                        Dice Roller
                    </NavLink>
                </Menu.Item>
                <Menu.Item
                    key={ SCREENS.TICTACTOE }
                    onClick={ resetMenus }
                >
                    <NavLink to={ ROUTES.TICTACTOE } className="nav-text">
                        <Icon type="close-square" />
                        Tic-Tac-Toe
                    </NavLink>
                </Menu.Item>
                <Menu.Item
                    key={ SCREENS.CHESS }
                    onClick={ resetMenus }
                >
                    <NavLink to={ ROUTES.CHESS } className="nav-text">
                        <Icon type="play-square" />
                        Chess
                    </NavLink>
                </Menu.Item>
            </Menu>
        </Layout.Header>
    );
};

export default Header;
