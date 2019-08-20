import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ROUTES } from './config/constants';
import { Header } from './components/Header.js';
import { Layout } from 'antd';
import { Game } from './games/tictactoe/tictactoe.js';
// import './App.css';
const { Sider, Content, Footer } = Layout;

class App extends React.Component {
    ticTacToe = () => {
        return <Game />;
    }

    diceRoller = () => {
        // return <DiceRoller />;
        return <p>Dice Roller Coming Soon</p>;
    }

    render () {
        return (
            <div className="App">
                <Router>
                    <Layout>
                        <header className="App-header">
                            <Header />
                        </header>
                        <Layout>
                            <Sider></Sider>
                            <Content>
                                {/* <Route path={ ROUTES.HOME } component={ this.home } /> */}
                                <Route path={ ROUTES.TICTACTOE } component={ this.ticTacToe } />
                                <Route path={ ROUTES.DICEROLLER } component={ this.diceRoller } />
                            </Content>
                        </Layout>
                        <footer>
                            <Footer></Footer>
                        </footer>
                    </Layout>
                </Router>
            </div>
        );
    }
}

export default App;
