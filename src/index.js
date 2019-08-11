import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';
import kitty from './img/kitty.jpeg';
import puppy from './img/puppy.jpeg';

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

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }

  resetState() {
    this.setState(() => {
      return {
        squares: Array(9).fill(null),
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true
      };
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    let winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      winner = winner === 'X' ? 'X' : 'O';
      status = 'Winner: ' + winner;
    } else {
      status = history.length === 10 ? 'It\'s a draw!' : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="game-info">
          <div style={ { textAlign: 'center' } }>
            <p style={ { fontSize: '100px', lineHeight: '.3' } }><b>VS</b></p>
            <p style={ { fontSize: '25px' } }><b>{status}</b></p>
            <br />
          </div>
        </div>
        <div className="game" style={ { textAlign: 'center' } }>
          <div className="game-board">
            <Board
              squares={ current.squares }
              onClick={ (i) => this.handleClick(i) }
            />
            <button style={ { marginTop: '25px' } }onClick={ () => this.resetState() }>Start Over</button>
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

ReactDOM.render(
  <div id="main">
    <div id="k">
      <p style={ { float:'right', fontSize: '30px' } }><b>Jane</b></p>
      <br />
      <img id="kitty" src={ kitty } width={ 300 } height={ 300 } alt="kitty" ></img>
    </div>
    <div id="janeLauren">
      <Game />
    </div>
    <div id="p">
      <p style={ { float:'left', fontSize: '30px' } }><b>Lauren</b></p>
      <br />
      <img id="puppy" src={ puppy } width={ 300 } height={ 300 } alt="puppy"></img>
    </div>
  </div>,
  document.getElementById('root')
);
