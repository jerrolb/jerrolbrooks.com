import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    updateXIsNext,
    updateSquares,
    updateHistory
} from '../../redux/actions/ticTacToeActions';
import kitty from '../../img/kitty.jpeg';
import puppy from '../../img/puppy.jpeg';
import './tictactoe.css';

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

    renderBoard() {
        return (
            <div>
                <div>
                    { this.renderSquare(0) }
                    { this.renderSquare(1) }
                    { this.renderSquare(2) }
                </div>
                <div>
                    { this.renderSquare(3) }
                    { this.renderSquare(4) }
                    { this.renderSquare(5) }
                </div>
                <div>
                    { this.renderSquare(6) }
                    { this.renderSquare(7) }
                    { this.renderSquare(8) }
                </div>
            </div>
        );
    }

    renderSquare(i) {
        const squares = this.getCurrentSquares();

        return (
            <button
                className="square"
                onClick={ () => this.handleClick(i) }
            >
                { squares[i] }
            </button>
        );
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    }

    handleClick(i) {
        const squares = this.getCurrentSquares().slice();

        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.props.xIsNext ? 'X' : 'O';

        this.props.updateHistory(
            this.props.history.concat([{
                squares: squares,
            }])
        );

        this.props.updateXIsNext(!this.props.xIsNext);
    }

    undo() {
        if (this.props.history.length === 1) {
            return;
        }

        this.props.updateXIsNext(!this.props.xIsNext);

        this.props.squares.pop();
        this.props.updateSquares(this.props.squares);

        this.props.history.pop();
        this.props.updateHistory(this.props.history);
    }

    getCurrentSquares() {
        const history = this.props.history;
        const current = history[history.length - 1];
        return current.squares;
    }

    resetState() {
        this.props.updateXIsNext(true);
        this.props.updateSquares(Array(9).fill(null));
        this.props.updateHistory([{
            squares: Array(9).fill(null),
        }]);
    }

    render() {
        const squares = this.getCurrentSquares();
        const winner = this.calculateWinner(squares);
        let status;

        if (winner) {
            status = `Winner: ${ winner }`;
        } else if (this.props.history.length === 10) {
            status = 'It\'s a draw!';
        } else {
            status = `Next player: ${ this.props.xIsNext ? 'X' : 'O' }`;
        }

        return (
            <div id="container">
                <div id="playerAvatars">
                    <img src={ kitty } alt="kitty" ></img>
                    <p>VS</p>
                    <img src={ puppy } alt="puppy"></img>
                </div>
                <p id="status">{status}</p>

                <div id="board">
                    { this.renderBoard() }
                </div>

                <div id="actionButtons">
                    <button onClick={ () => this.resetState() }>Start Over</button>
                    <button onClick={ () => this.undo() }>Undo</button>
                </div>
            </div>
        );
    }
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
