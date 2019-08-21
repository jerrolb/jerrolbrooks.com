import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ROUTES } from './config/constants';
import { Header, LeftSider, RightSider, Footer } from './components';
import { Game } from './games/tictactoe/tictactoe.js';
import { Dice } from './games/diceroller/dice.js';
import './App.css';
import { Layout } from 'antd';
const { Content } = Layout;

class App extends React.Component {
    ticTacToe = () => {
        return <Game />;
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
                        <header className="App-header">
                            <Header />
                        </header>
                        <Layout style={ contentStyle }>
                            <LeftSider />
                            <Content>
                                {/* <Route path={ ROUTES.HOME } component={ this.home } /> */}
                                <Route path={ ROUTES.TICTACTOE } component={ this.ticTacToe } />
                                <Route path={ ROUTES.DICEROLLER } component={ this.diceRoller } />
                            </Content>
                            <RightSider />
                        </Layout>
                        <footer>
                            <Footer />
                        </footer>
                    </Layout>
                </Router>
            </div>
        );
    }
}

export default App;
