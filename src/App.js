import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ROUTES } from './config/constants';
import { Header, Footer } from './components';
import { TicTacToe } from './games/tictactoe/tictactoe.js';
import { Dice } from './games/diceroller/dice.js';
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

    render () {
        const contentStyle = {
            marginTop: '50px'
        };

        return (
            <div className="App">
                <Router>
                    <Layout>
                        <Header />
                        <Layout style={ contentStyle }>
                            <Content>
                                <Route path={ ROUTES.TICTACTOE } component={ this.ticTacToe } />
                                <Route path={ ROUTES.DICEROLLER } component={ this.diceRoller } />
                            </Content>
                        </Layout>
                        <Footer />
                    </Layout>
                </Router>
            </div>
        );
    }
}

export default App;
