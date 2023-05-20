import { GameBoard, pieceIndex, } from './board';
import { PIECES, COLORS, doMirror64, doSq64 } from './constants';

const PawnTable = [
  0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
  10 , 10 , 0 , -10 , -10 , 0 , 10 , 10 ,
  5 , 0 , 0 , 5 , 5 , 0 , 0 , 5 ,
  0 , 0 , 10 , 20 , 20 , 10 , 0 , 0 ,
  5 , 5 , 5 , 10 , 10 , 5 , 5 , 5 ,
  10 , 10 , 10 , 20 , 20 , 10 , 10 , 10 ,
  20 , 20 , 20 , 30 , 30 , 20 , 20 , 20 ,
  0 , 0 , 0 , 0 , 0 , 0 , 0 , 0
];

const KnightTable = [
  0 , -10 , 0 , 0 , 0 , 0 , -10 , 0 ,
  0 , 0 , 0 , 5 , 5 , 0 , 0 , 0 ,
  0 , 0 , 10 , 10 , 10 , 10 , 0 , 0 ,
  0 , 0 , 10 , 20 , 20 , 10 , 5 , 0 ,
  5 , 10 , 15 , 20 , 20 , 15 , 10 , 5 ,
  5 , 10 , 10 , 20 , 20 , 10 , 10 , 5 ,
  0 , 0 , 5 , 10 , 10 , 5 , 0 , 0 ,
  0 , 0 , 0 , 0 , 0 , 0 , 0 , 0
];

const BishopTable = [
  0 , 0 , -10 , 0 , 0 , -10 , 0 , 0 ,
  0 , 0 , 0 , 10 , 10 , 0 , 0 , 0 ,
  0 , 0 , 10 , 15 , 15 , 10 , 0 , 0 ,
  0 , 10 , 15 , 20 , 20 , 15 , 10 , 0 ,
  0 , 10 , 15 , 20 , 20 , 15 , 10 , 0 ,
  0 , 0 , 10 , 15 , 15 , 10 , 0 , 0 ,
  0 , 0 , 0 , 10 , 10 , 0 , 0 , 0 ,
  0 , 0 , 0 , 0 , 0 , 0 , 0 , 0
];

const RookTable = [
  0 , 0 , 5 , 10 , 10 , 5 , 0 , 0 ,
  0 , 0 , 5 , 10 , 10 , 5 , 0 , 0 ,
  0 , 0 , 5 , 10 , 10 , 5 , 0 , 0 ,
  0 , 0 , 5 , 10 , 10 , 5 , 0 , 0 ,
  0 , 0 , 5 , 10 , 10 , 5 , 0 , 0 ,
  0 , 0 , 5 , 10 , 10 , 5 , 0 , 0 ,
  25 , 25 , 25 , 25 , 25 , 25 , 25 , 25 ,
  0 , 0 , 5 , 10 , 10 , 5 , 0 , 0
];

const BishopPair = 40;

function evalPosition() {

  let score = GameBoard.material[COLORS.WHITE] - GameBoard.material[COLORS.BLACK];

  let pce;
  let sq;
  let pceNum;

  pce = PIECES.wP;
  for (pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
    sq = GameBoard.pList[pieceIndex(pce,pceNum)];
    score += PawnTable[doSq64(sq)];
  }

  pce = PIECES.bP;
  for (pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
    sq = GameBoard.pList[pieceIndex(pce,pceNum)];
    score -= PawnTable[doMirror64(doSq64(sq))];
  }

  pce = PIECES.wN;
  for (pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
    sq = GameBoard.pList[pieceIndex(pce,pceNum)];
    score += KnightTable[doSq64(sq)];
  }

  pce = PIECES.bN;
  for (pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
    sq = GameBoard.pList[pieceIndex(pce,pceNum)];
    score -= KnightTable[doMirror64(doSq64(sq))];
  }

  pce = PIECES.wB;
  for (pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
    sq = GameBoard.pList[pieceIndex(pce,pceNum)];
    score += BishopTable[doSq64(sq)];
  }

  pce = PIECES.bB;
  for (pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
    sq = GameBoard.pList[pieceIndex(pce,pceNum)];
    score -= BishopTable[doMirror64(doSq64(sq))];
  }

  pce = PIECES.wR;
  for (pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
    sq = GameBoard.pList[pieceIndex(pce,pceNum)];
    score += RookTable[doSq64(sq)];
  }

  pce = PIECES.bR;
  for (pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
    sq = GameBoard.pList[pieceIndex(pce,pceNum)];
    score -= RookTable[doMirror64(doSq64(sq))];
  }

  pce = PIECES.wQ;
  for (pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
    sq = GameBoard.pList[pieceIndex(pce,pceNum)];
    score += RookTable[doSq64(sq)];
  }

  pce = PIECES.bQ;
  for (pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
    sq = GameBoard.pList[pieceIndex(pce,pceNum)];
    score -= RookTable[doMirror64(doSq64(sq))];
  }

  if (GameBoard.pceNum[PIECES.wB] >= 2) {
    score += BishopPair;
  }

  if (GameBoard.pceNum[PIECES.bB] >= 2) {
    score -= BishopPair;
  }

  if (GameBoard.side === COLORS.WHITE) {
    return score;
  } else {
    return -score;
  }

}

export {
  PawnTable,
  KnightTable,
  BishopTable,
  RookTable,
  BishopPair,
  evalPosition
};
