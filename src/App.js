import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ROUTES } from './config/constants';
import { Header, Footer } from './components';
import { TicTacToe, Dice } from './games';
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

function mapStateToProps (state) {
    return {
    };
}

function mapDispatchToProps (dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
