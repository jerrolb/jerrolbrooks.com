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

    const headerItem = (screen, route, icon, text) => (
        <Menu.Item key={ screen } onClick={ resetMenus }>
            <NavLink to={ route }>
                <Icon type={ icon } />
                { text }
            </NavLink>
        </Menu.Item>
    );

    return (
        <Layout.Header style={ headerStyle }>
            <Menu id="headerMenu" style={ menuStyle }>
                { headerItem(SCREENS.CHESS, ROUTES.CHESS, 'play-square', 'Chess')}
                { headerItem(SCREENS.DICEROLLER, ROUTES.DICEROLLER, 'dot-chart', 'Dice Roller')}
                { headerItem(SCREENS.TICTACTOE, ROUTES.TICTACTOE, 'close-square', 'Tic-Tac-Toe')}
                { headerItem(SCREENS.CUBE, ROUTES.CUBE, 'table', 'Rubik\'s Cube')}
            </Menu>
        </Layout.Header>
    );
};

export default Header;
