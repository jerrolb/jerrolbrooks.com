import { GameBoard } from './board';
import { noMove, PVENTRIES, BOOL } from './constants';
import { moveExists } from './movegen';
import { makeMove, takeMove } from './makemove';

function getPvLine(depth) {

  let move = probePvTable();
  let count = 0;

  while (move !== noMove && count < depth) {

    if (moveExists(move) === BOOL.TRUE) {
      makeMove(move);
      GameBoard.PvArray[count++] = move;
    } else {
      break;
    }
    move = probePvTable();
  }

  while (GameBoard.ply > 0) {
    takeMove();
  }

  return count;

}

function probePvTable() {
  const index = GameBoard.posKey % PVENTRIES;

  if (GameBoard.PvTable[index].posKey === GameBoard.posKey) {
    return GameBoard.PvTable[index].move;
  }

  return noMove;
}

function storePvMove(move) {
  const index = GameBoard.posKey % PVENTRIES;
  GameBoard.PvTable[index].posKey = GameBoard.posKey;
  GameBoard.PvTable[index].move = move;
}

export {
  getPvLine,
  probePvTable,
  storePvMove
};
