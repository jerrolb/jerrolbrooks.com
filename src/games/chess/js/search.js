import { pieceIndex, GameBoard, squareAttacked } from './board';
import { BOOL, numOfBoardSquares } from './constants';
import { noMove, PVENTRIES, fromSquare, toSquare, Kings, MAXDEPTH, MFLAGCAP, MATE, INFINITE } from './constants';
import { prMove } from './io';
import { makeMove, takeMove } from './makemove';
import { generateMoves, generateCaptures } from './movegen';
import { evalPosition } from './evaluate';
import { getPvLine, probePvTable, storePvMove } from './pvtable';
import $ from 'jquery';

const SearchController = {
  nodes: undefined,
  fh: undefined,
  fhf: undefined,
  depth: undefined,
  time: undefined,
  start: undefined,
  stop: undefined,
  best: undefined,
  thinking: undefined
};

function pickNextMove(MoveNum) {

  let index = 0;
  let bestScore = -1;
  let bestNum = MoveNum;

  for (index = MoveNum; index < GameBoard.moveListStart[GameBoard.ply + 1]; ++index) {
    if (GameBoard.moveScores[index] > bestScore) {
      bestScore = GameBoard.moveScores[index];
      bestNum = index;
    }
  }

  if (bestNum !== MoveNum) {
    let temp = 0;
    temp = GameBoard.moveScores[MoveNum];
    GameBoard.moveScores[MoveNum] = GameBoard.moveScores[bestNum];
    GameBoard.moveScores[bestNum] = temp;

    temp = GameBoard.moveList[MoveNum];
    GameBoard.moveList[MoveNum] = GameBoard.moveList[bestNum];
    GameBoard.moveList[bestNum] = temp;
  }

}

function clearPvTable() {

  for (let index = 0; index < PVENTRIES; index++) {
    GameBoard.PvTable[index].move = noMove;
    GameBoard.PvTable[index].posKey = 0;
  }
}

function checkUp() {
  if (($.now() - SearchController.start) > SearchController.time) {
    SearchController.stop = BOOL.TRUE;
  }
}

function isRepetition() {
  let index = 0;

  for (index = GameBoard.hisPly - GameBoard.fiftyMove; index < GameBoard.hisPly - 1; ++index) {
    if (GameBoard.posKey === GameBoard.history[index].posKey) {
      return BOOL.TRUE;
    }
  }

  return BOOL.FALSE;
}

function quiescence(alpha, beta) {

  if ((SearchController.nodes & 2047) === 0) {
    checkUp();
  }

  SearchController.nodes++;

  if ((isRepetition() || GameBoard.fiftyMove >= 100) && GameBoard.ply !== 0) {
    return 0;
  }

  if (GameBoard.ply > MAXDEPTH - 1) {
    return evalPosition();
  }

  let Score = evalPosition();

  if (Score >= beta) {
    return beta;
  }

  if (Score > alpha) {
    alpha = Score;
  }

  generateCaptures();

  let MoveNum = 0;
  let Legal = 0;
  const OldAlpha = alpha;
  let BestMove = noMove;
  let Move = noMove;

  for (MoveNum = GameBoard.moveListStart[GameBoard.ply]; MoveNum < GameBoard.moveListStart[GameBoard.ply + 1]; ++MoveNum) {

    pickNextMove(MoveNum);

    Move = GameBoard.moveList[MoveNum];

    if (makeMove(Move) === BOOL.FALSE) {
      continue;
    }
    Legal++;
    Score = -quiescence(-beta, -alpha);

    takeMove();

    if (SearchController.stop === BOOL.TRUE) {
      return 0;
    }

    if (Score > alpha) {
      if (Score >= beta) {
        if (Legal === 1) {
          SearchController.fhf++;
        }
        SearchController.fh++;
        return beta;
      }
      alpha = Score;
      BestMove = Move;
    }
  }

  if (alpha !== OldAlpha) {
    storePvMove(BestMove);
  }

  return alpha;

}

function alphaBeta(alpha, beta, depth) {

  if (depth <= 0) {
    return quiescence(alpha, beta);
  }

  if ((SearchController.nodes & 2047) === 0) {
    checkUp();
  }

  SearchController.nodes++;

  if ((isRepetition() || GameBoard.fiftyMove >= 100) && GameBoard.ply !== 0) {
    return 0;
  }

  if (GameBoard.ply > MAXDEPTH - 1) {
    return evalPosition();
  }

  const InCheck = squareAttacked(GameBoard.pList[pieceIndex(Kings[GameBoard.side],0)], GameBoard.side ^ 1);
  if (InCheck === BOOL.TRUE) {
    depth++;
  }

  let Score = -INFINITE;

  generateMoves();

  let MoveNum = 0;
  let Legal = 0;
  const OldAlpha = alpha;
  let BestMove = noMove;
  let Move = noMove;

  const PvMove = probePvTable();
  if (PvMove !== noMove) {
    for (MoveNum = GameBoard.moveListStart[GameBoard.ply]; MoveNum < GameBoard.moveListStart[GameBoard.ply + 1]; ++MoveNum) {
      if (GameBoard.moveList[MoveNum] === PvMove) {
        GameBoard.moveScores[MoveNum] = 2000000;
        break;
      }
    }
  }

  for (MoveNum = GameBoard.moveListStart[GameBoard.ply]; MoveNum < GameBoard.moveListStart[GameBoard.ply + 1]; ++MoveNum) {

    pickNextMove(MoveNum);

    Move = GameBoard.moveList[MoveNum];

    if (makeMove(Move) === BOOL.FALSE) {
      continue;
    }
    Legal++;
    Score = -alphaBeta(-beta, -alpha, depth - 1);

    takeMove();

    if (SearchController.stop === BOOL.TRUE) {
      return 0;
    }

    if (Score > alpha) {
      if (Score >= beta) {
        if (Legal === 1) {
          SearchController.fhf++;
        }
        SearchController.fh++;
        if ((Move & MFLAGCAP) === 0) {
          GameBoard.searchKillers[MAXDEPTH + GameBoard.ply] =
                        GameBoard.searchKillers[GameBoard.ply];
          GameBoard.searchKillers[GameBoard.ply] = Move;
        }
        return beta;
      }
      if ((Move & MFLAGCAP) === 0) {
        GameBoard.searchHistory[GameBoard.pieces[fromSquare(Move)] * numOfBoardSquares + toSquare(Move)]
                         += depth * depth;
      }
      alpha = Score;
      BestMove = Move;
    }
  }

  if (Legal === 0) {
    if (InCheck === BOOL.TRUE) {
      return -MATE + GameBoard.ply;
    } else {
      return 0;
    }
  }

  if (alpha !== OldAlpha) {
    storePvMove(BestMove);
  }

  return alpha;
}

function clearForSearch() {
  for (let index = 0; index < 14 * numOfBoardSquares; ++index) {
    GameBoard.searchHistory[index] = 0;
  }

  for (let index = 0; index < 3 * MAXDEPTH; ++index) {
    GameBoard.searchKillers[index] = 0;
  }

  clearPvTable();
  GameBoard.ply = 0;
  SearchController.nodes = 0;
  SearchController.fh = 0;
  SearchController.fhf = 0;
  SearchController.start = $.now();
  SearchController.stop = BOOL.FALSE;
}

function searchPosition() {

  let bestMove = noMove;
  let bestScore = -INFINITE;
  let Score = -INFINITE;
  let currentDepth = 0;
  let line;
  let PvNum;
  let c;
  clearForSearch();

  for (currentDepth = 1; currentDepth <= SearchController.depth; ++currentDepth) {

    Score = alphaBeta(-INFINITE, INFINITE, currentDepth);

    if (SearchController.stop === BOOL.TRUE) {
      break;
    }

    bestScore = Score;
    bestMove = probePvTable();
    line = 'D:' + currentDepth + ' Best:' + prMove(bestMove) + ' Score:' + bestScore +
                ' nodes:' + SearchController.nodes;

    PvNum = getPvLine(currentDepth);
    line += ' Pv:';
    for (c = 0; c < PvNum; ++c) {
      line += ' ' + prMove(GameBoard.PvArray[c]);
    }
    if (currentDepth !== 1) {
      line += (' Ordering:' + ((SearchController.fhf / SearchController.fh) * 100).toFixed(2) + '%');
    }
    console.log(line);

  }

  SearchController.best = bestMove;
  SearchController.thinking = BOOL.FALSE;
  updateDOMStats(bestScore, currentDepth);
}

function updateDOMStats(domScore, domDepth) {

  let scoreText = 'Score: ' + (domScore / 100).toFixed(2);
  if (Math.abs(domScore) > MATE - MAXDEPTH) {
    scoreText = 'Score: Mate In ' + (MATE - (Math.abs(domScore)) - 1) + ' moves';
  }

  $('#OrderingOut').text('Ordering: ' + ((SearchController.fhf / SearchController.fh) * 100).toFixed(2) + '%');
  $('#DepthOut').text('Depth: ' + domDepth);
  $('#ScoreOut').text(scoreText);
  $('#NodesOut').text('Nodes: ' + SearchController.nodes);
  $('#TimeOut').text('Time: ' + (($.now() - SearchController.start) / 1000).toFixed(1) + 's');
  $('#BestOut').text('BestMove: ' + prMove(SearchController.best));
}

export {
  pickNextMove,
  clearPvTable,
  checkUp,
  isRepetition,
  quiescence,
  alphaBeta,
  clearForSearch,
  updateDOMStats,
  searchPosition,
  SearchController
};
