import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ROUTES } from './config/constants';
import { Header, LeftSider } from './components';
import { Api } from './api';
import { TicTacToe, Dice, Chess } from './games';
import './App.css';
import { Layout } from 'antd';
const { Content } = Layout;

const App = () => {
    const ticTacToe = () => {
        return <TicTacToe />;
    };

    const diceRoller = () => {
        return <Dice />;
    };

    const chess = () => {
        return <Chess />;
    };

    const api = () => {
        return <Api />;
    };

    return (
        <Router>
            <Header />
            <Layout>
                <LeftSider />
                <Content>
                    <Route path={ ROUTES.TICTACTOE } component={ ticTacToe } />
                    <Route path={ ROUTES.DICEROLLER } component={ diceRoller } />
                    <Route path={ ROUTES.CHESS } component={ chess } />
                    <Route path={ ROUTES.API } component={ api } />
                </Content>
            </Layout>
        </Router>
    );
};

export default App;
