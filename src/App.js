import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ROUTES } from './config/constants';
import { Header, LeftSider, About } from './components';
import { Api } from './api';
import { TicTacToe, Dice, Chess } from './games';
import './App.css';
import { Layout } from 'antd';
const { Content } = Layout;

class App extends React.Component {

    componentDidMount () {
        if (
            !Object.values(ROUTES).includes(window.location.pathname)
            && window.location.pathname !== '/'
        ) {
            window.location.href = '/';
        }
    }

    ticTacToe = () => <TicTacToe />;
    diceRoller = () => <Dice />;
    chess = () => <Chess />;
    api = () => <Api />;
    about = () => <About />;

    render() {
        return (
            <Router>
                <Header />
                <Layout>
                    <LeftSider />
                    <Content>
                        <Route path={ ROUTES.TICTACTOE } component={ this.ticTacToe } />
                        <Route path={ ROUTES.DICEROLLER } component={ this.diceRoller } />
                        <Route path={ ROUTES.CHESS } component={ this.chess } />
                        <Route path={ ROUTES.API } component={ this.api } />
                        <Route path={ ROUTES.ABOUT } component={ this.about } />
                    </Content>
                </Layout>
            </Router>
        );
    }
}

export default App;
