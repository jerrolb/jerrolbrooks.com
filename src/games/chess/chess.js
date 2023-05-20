import React from 'react';
import { connect } from 'react-redux';
import { initFilesRanksBrd, initHashKeys, initSq120To64, initBoardVars, initBoardSquares } from './js/main';
import { newGame, clickedSquare, makeUserMove, preSearch } from './js/gui';
import { initMvvLva } from './js/movegen';
import { undoMove } from './js/makemove';
import { flipBoard } from './js/board';
import * as constants from './js/constants';
import $ from 'jquery';
import './styles.css';

class Chess extends React.Component {

  componentDidMount () {
    $(document).on('click','.Piece', function (e) {
      console.log('Piece Click');
      if (constants.UserMove.from === constants.SQUARES.NO_SQ) {
        constants.UserMove.from = clickedSquare(e.pageX, e.pageY);
      } else {
        constants.UserMove.to = clickedSquare(e.pageX, e.pageY);
      }
      makeUserMove();
    });

    $(document).on('click','.Square', function (e) {
      console.log('Square Click');
      if (constants.UserMove.from !== constants.SQUARES.NO_SQ) {
        constants.UserMove.to = clickedSquare(e.pageX, e.pageY);
        makeUserMove();
      }
    });

    initFilesRanksBrd();
    initHashKeys();
    initSq120To64();
    initBoardVars();
    initMvvLva();
    initBoardSquares();
    newGame(constants.START_FEN);
  }

  moveNow = () => {
    constants.GameController.PlayerSide = constants.GameController.side ^ 1;
    preSearch();
  };

  render() {
    return (
      <div>
        <div id="FenInDiv">
                    Fen:
          <br />
          <input
            id="fenIn"
            type="text"
            ref={ (elem) => this.fenIn = elem }
            defaultValue={ constants.START_FEN }
          />
          <button
            id="SetFen"
            type="button"
            onClick={ () => {
              newGame(this.fenIn.value);
            } }
          >
                        Set Position
          </button>
        </div>
        <div id="Board">
        </div>
        <div id="EngineOutput">Thinking Time: <br />
          <select id="ThinkTimeChoice">
            <option value="1">1s</option>
            <option value="2">2s</option>
            <option value="4">4s</option>
            <option value="6">6s</option>
            <option value="8">8s</option>
            <option value="10">10s</option>
          </select><br /><br /><br />
          <span id="BestOut">BestMove:</span><br />
          <span id="DepthOut">Depth:</span><br />
          <span id="ScoreOut">Score:</span><br />
          <span id="NodesOut">Nodes:</span><br />
          <span id="OrderingOut">Ordering:</span><br />
          <span id="TimeOut">Time:</span><br /><br />
          <button
            id="SearchButton"
            type="button"
            onClick={ this.moveNow }
          >
                        Move Now
          </button><br />
          <button
            id="newGameButton"
            type="button"
            onClick={ () => {
              newGame(constants.START_FEN);
            } }
          >
                        New Game
          </button><br />
          <button
            id="FlipButton"
            type="button"
            onClick={ flipBoard }
          >
                        Flip Board
          </button><br /><br />
          <button
            id="TakeButton"
            type="button"
            onClick={ undoMove }
          >
                        Take Back
          </button><br /><br /><br />
          <span id="GameStatus"></span>
        </div>
      </div>

    );
  }
}

function mapStateToProps () {
  return {};
}

function mapDispatchToProps () {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Chess);
