import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ROUTES } from './config/constants';
import { Header, LeftSider } from './components';
import { TicTacToe, Dice } from './games';
import { Api } from './api';
import './App.css';
import { Layout } from 'antd';
const { Content } = Layout;

class App extends React.Component {
    ticTacToe = () => {
        return <TicTacToe />;
    }

    diceRoller = () => {
        return <Dice />;
    }

    api = () => {
        return <Api />;
    }

    render () {
        return (
            <Router>
                <Header />
                <Layout>
                    <LeftSider />
                    <Content>
                        <Route path={ ROUTES.TICTACTOE } component={ this.ticTacToe } />
                        <Route path={ ROUTES.DICEROLLER } component={ this.diceRoller } />
                        <Route path={ ROUTES.API } component={ this.api } />
                    </Content>
                </Layout>
            </Router>
        );
    }
}

function mapStateToProps (state) {
    return {
    };
}

function mapDispatchToProps (dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
