import { BOOL } from './constants';
import { GameBoard } from './board';
import { makeMove, takeMove } from './makemove';
import { generateMoves } from './movegen';
import { printBoard } from './gui';
import { prMove } from './pvtable';

let perftLeafNodes;

function perft(depth) {
  if (depth === 0) {
    perftLeafNodes++;
    return;
  }

  generateMoves();

  let index;
  let move;

  for (index = GameBoard.moveListStart[GameBoard.ply]; index < GameBoard.moveListStart[GameBoard.ply + 1]; ++index) {

    move = GameBoard.moveList[index];
    if (makeMove(move) === BOOL.FALSE) {
      continue;
    }
    perft(depth - 1);
    takeMove();
  }

  return;
}

function perftTest(depth) {
  printBoard();
  console.log('Starting Test To Depth:' + depth);
  perftLeafNodes = 0;

  let index;
  let move;
  let moveNum = 0;
  for (index = GameBoard.moveListStart[GameBoard.ply]; index < GameBoard.moveListStart[GameBoard.ply + 1]; ++index) {

    move = GameBoard.moveList[index];
    if (makeMove(move) === BOOL.FALSE) {
      continue;
    }
    moveNum++;
    const cumnodes = perftLeafNodes;
    perft(depth - 1);
    takeMove();
    const oldnodes = perftLeafNodes - cumnodes;
    console.log('move:' + moveNum + ' ' + prMove(move) + ' ' + oldnodes);
  }

  console.log('Test Complete : ' + perftLeafNodes + ' leaf nodes visited');
  return;
}

export {
  perft,
  perftTest
};
