import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ROUTES } from './config/constants';
import { Header, LeftSider, About } from './components';
import { Api } from './api';
import { Chess, Cube, Dice, TicTacToe } from './games';
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

    about = () => <About />;
    api = () => <Api />;
    chess = () => <Chess />;
    cube = () => <Cube />;
    diceRoller = () => <Dice />;
    ticTacToe = () => <TicTacToe />;

    render() {
        return (
            <Router>
                <Header />
                <Layout>
                    <LeftSider />
                    <Content>
                        <Route path={ ROUTES.API } component={ this.api } />
                        <Route path={ ROUTES.ABOUT } component={ this.about } />
                        <Route path={ ROUTES.CHESS } component={ this.chess } />
                        <Route path={ ROUTES.CUBE } component={ this.cube } />
                        <Route path={ ROUTES.DICEROLLER } component={ this.diceRoller } />
                        <Route path={ ROUTES.TICTACTOE } component={ this.ticTacToe } />
                    </Content>
                </Layout>
            </Router>
        );
    }
}

export default App;
