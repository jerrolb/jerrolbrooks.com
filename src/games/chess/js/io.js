import { fileChar, FilesBrd, rankChar, RanksBrd, fromSquare, toSquare, promoted, isKnight } from './constants';
import { BOOL, COLORS, PIECES, noMove, isRookQueen, isBishopQueen } from './constants';
import { generateMoves } from './movegen';
import { GameBoard } from './board';
import { makeMove, takeMove } from './makemove';

function printSquare(sq) {
  return (fileChar[FilesBrd[sq]] + rankChar[RanksBrd[sq]]);
}

function prMove(move) {
  let MvStr;

  const ff = FilesBrd[fromSquare(move)];
  const rf = RanksBrd[fromSquare(move)];
  const ft = FilesBrd[toSquare(move)];
  const rt = RanksBrd[toSquare(move)];

  MvStr = fileChar[ff] + rankChar[rf] + fileChar[ft] + rankChar[rt];

  const isPromoted = promoted(move);

  if (isPromoted !== PIECES.EMPTY) {
    let pchar = 'q';
    if (isKnight[isPromoted] === BOOL.TRUE) {
      pchar = 'n';
    } else if (isRookQueen[isPromoted] === BOOL.TRUE && isBishopQueen[isPromoted] === BOOL.FALSE) {
      pchar = 'r';
    } else if (isRookQueen[isPromoted] === BOOL.FALSE && isBishopQueen[isPromoted] === BOOL.TRUE) {
      pchar = 'b';
    }
    MvStr += pchar;
  }
  return MvStr;
}

function PrintMoveList() {

  let index;
  let move;
  let num = 1;
  console.log('MoveList:');

  for (index = GameBoard.moveListStart[GameBoard.ply]; index < GameBoard.moveListStart[GameBoard.ply + 1]; ++index) {
    move = GameBoard.moveList[index];
    console.log('IMove:' + num + ':(' + index + '):' + prMove(move) + ' Score:' + GameBoard.moveScores[index]);
    num++;
  }
  console.log('End MoveList');
}

function parseMove(from, to) {

  generateMoves();

  let Move = noMove;
  let PromPce = PIECES.EMPTY;
  let found = BOOL.FALSE;

  for (let index = GameBoard.moveListStart[GameBoard.ply];
    index < GameBoard.moveListStart[GameBoard.ply + 1]; ++index) {
    Move = GameBoard.moveList[index];
    if (fromSquare(Move) === from && toSquare(Move) === to) {
      PromPce = promoted(Move);
      if (PromPce !== PIECES.EMPTY) {
        if ((PromPce === PIECES.wQ && GameBoard.side === COLORS.WHITE) ||
                    (PromPce === PIECES.bQ && GameBoard.side === COLORS.BLACK)) {
          found = BOOL.TRUE;
          break;
        }
        continue;
      }
      found = BOOL.TRUE;
      break;
    }
  }

  if (found !== BOOL.FALSE) {
    if (makeMove(Move) === BOOL.FALSE) {
      return noMove;
    }
    takeMove();
    return Move;
  }

  return noMove;
}

export {
  printSquare,
  prMove,
  PrintMoveList,
  parseMove
};
