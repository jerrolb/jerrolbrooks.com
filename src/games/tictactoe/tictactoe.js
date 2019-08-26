import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './tictactoe.css';
import kitty from '../../img/kitty.jpeg';
import puppy from '../../img/puppy.jpeg';
import {
    updateXIsNext,
    updateSquares,
    updateHistory
} from '../../redux/actions/ticTacToeActions';

function Square(props) {
    return (
        <button className="square" onClick={ props.onClick }>
            { props.value }
        </button>
    );
}

Square.propTypes = {
    onClick: PropTypes.func.isRequired,
    value: PropTypes.string
};

class Board extends React.Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        squares: PropTypes.array.isRequired,
    };

    renderSquare(i) {
        return (
            <Square
                value={ this.props.squares[i] }
                onClick={ () => this.props.onClick(i) }
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class TicTacToe extends React.Component {
    static defaultProps = {
        updateHistory: updateHistory,
        updateSquares: updateSquares,
        updateXIsNext: updateXIsNext,

    }
    static propTypes = {
        history: PropTypes.array.isRequired,
        squares: PropTypes.array.isRequired,
        updateHistory: PropTypes.func.isRequired,
        updateSquares: PropTypes.func.isRequired,
        updateXIsNext: PropTypes.func.isRequired,
        xIsNext: PropTypes.bool.isRequired,
    }

    handleClick(i) {
        const history = this.props.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.props.xIsNext ? 'X' : 'O';

        this.props.updateHistory(history.concat([{
            squares: squares,
        }]));

        this.props.updateXIsNext(!this.props.xIsNext);
    }

    resetState() {
        this.props.updateXIsNext(true);
        this.props.updateSquares(Array(9).fill(null));
        this.props.updateHistory([{
            squares: Array(9).fill(null),
        }]);
    }

    render() {
        const history = this.props.history;
        const current = history[history.length - 1];
        let winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            winner = winner === 'X' ? 'X' : 'O';
            status = 'Winner: ' + winner;
        } else {
            status = history.length === 10 ? 'It\'s a draw!' : 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div style={ { display: 'flex', alignItems: 'center', justifyContent: 'center' } }>
                    <img id="kitty" src={ kitty } width={ 75 } height={ 75 } alt="kitty" ></img>
                    <p style={ { fontSize: '45px', lineHeight: '.1' } }><b>VS</b></p>
                    <img id="puppy" src={ puppy } width={ 75 } height={ 75 } alt="puppy"></img>
                </div>
                <p style={ { fontSize: '15px' } }><b>{status}</b></p>

                <div className="game">
                    <div className="game-board">
                        <Board
                            squares={ current.squares }
                            onClick={ (i) => this.handleClick(i) }
                        />
                        <button style={ { marginTop: '10px' } }onClick={ () => this.resetState() }>Start Over</button>
                    </div>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function mapStateToProps (state) {
    return {
        xIsNext: state.ticTacToe.xIsNext,
        squares: state.ticTacToe.squares,
        history: state.ticTacToe.history
    };
}

function mapDispatchToProps (dispatch) {
    return {
        updateHistory: (history) => dispatch(updateHistory(history)),
        updateSquares: (squares) => dispatch(updateSquares(squares)),
        updateXIsNext: (xIsNext) => dispatch(updateXIsNext(xIsNext))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToe);
