import { BOOL, RANKS, SQUARES, numOfBoardSquares, RanksBrd, noMove, pieceColor, CASTLEBIT, PIECES, captured, isSquareOffBoard, MFLAGPS, COLORS, MFLAGCA, MFLAGEP, PceDir, DirNum, LoopSlidePce, fromSquare, LoopNonSlideIndex, LoopNonSlidePce, MAXDEPTH, toSquare, pieceIndex, LoopSlideIndex } from './constants';
import { GameBoard, squareAttacked } from './board';
import { makeMove, takeMove } from './makemove';

const MvvLvaValue = [ 0, 100, 200, 300, 400, 500, 600, 100, 200, 300, 400, 500, 600 ];
const MvvLvaScores = new Array(14 * 14);

function initMvvLva() {
    let Attacker;
    let Victim;

    for (Attacker = PIECES.wP; Attacker <= PIECES.bK; ++Attacker) {
        for (Victim = PIECES.wP; Victim <= PIECES.bK; ++Victim) {
            MvvLvaScores[Victim * 14 + Attacker] = MvvLvaValue[Victim] + 6 - (MvvLvaValue[Attacker] / 100);
        }
    }
}

function moveExists(move) {

    generateMoves();

    let moveFound = noMove;
    for (let index = GameBoard.moveListStart[GameBoard.ply]; index < GameBoard.moveListStart[GameBoard.ply + 1]; ++index) {

        moveFound = GameBoard.moveList[index];
        if (makeMove(moveFound) === BOOL.FALSE) {
            continue;
        }
        takeMove();
        if (move === moveFound) {
            return BOOL.TRUE;
        }
    }
    return BOOL.FALSE;
}

function move(from, to, captured, promoted, flag) {
    return (from | (to << 7) | (captured << 14) | (promoted << 20) | flag);
}

function addCaptureMove(move) {
    GameBoard.moveList[GameBoard.moveListStart[GameBoard.ply + 1]] = move;
    GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply + 1]++] =
        MvvLvaScores[captured(move) * 14 + GameBoard.pieces[fromSquare(move)]] + 1000000;
}

function addQuietMove(move) {
    GameBoard.moveList[GameBoard.moveListStart[GameBoard.ply + 1]] = move;
    GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply + 1]] = 0;

    if (move === GameBoard.searchKillers[GameBoard.ply]) {
        GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply + 1]] = 900000;
    } else if (move === GameBoard.searchKillers[GameBoard.ply + MAXDEPTH]) {
        GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply + 1]] = 800000;
    } else {
        GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply + 1]] =
            GameBoard.searchHistory[GameBoard.pieces[fromSquare(move)] * numOfBoardSquares + toSquare(move)];
    }

    GameBoard.moveListStart[GameBoard.ply + 1]++;
}

function addEnPassantMove(move) {
    GameBoard.moveList[GameBoard.moveListStart[GameBoard.ply + 1]] = move;
    GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply + 1]++] = 105 + 1000000;
}

function addWhitePawnCaptureMove(from, to, cap) {
    if (RanksBrd[from] === RANKS.RANK_7) {
        addCaptureMove(move(from, to, cap, PIECES.wQ, 0));
        addCaptureMove(move(from, to, cap, PIECES.wR, 0));
        addCaptureMove(move(from, to, cap, PIECES.wB, 0));
        addCaptureMove(move(from, to, cap, PIECES.wN, 0));
    } else {
        addCaptureMove(move(from, to, cap, PIECES.EMPTY, 0));
    }
}

function addBlackPawnCaptureMove(from, to, cap) {
    if (RanksBrd[from] === RANKS.RANK_2) {
        addCaptureMove(move(from, to, cap, PIECES.bQ, 0));
        addCaptureMove(move(from, to, cap, PIECES.bR, 0));
        addCaptureMove(move(from, to, cap, PIECES.bB, 0));
        addCaptureMove(move(from, to, cap, PIECES.bN, 0));
    } else {
        addCaptureMove(move(from, to, cap, PIECES.EMPTY, 0));
    }
}

function addWhitePawnQuietMove(from, to) {
    if (RanksBrd[from] === RANKS.RANK_7) {
        addQuietMove(move(from,to,PIECES.EMPTY,PIECES.wQ,0));
        addQuietMove(move(from,to,PIECES.EMPTY,PIECES.wR,0));
        addQuietMove(move(from,to,PIECES.EMPTY,PIECES.wB,0));
        addQuietMove(move(from,to,PIECES.EMPTY,PIECES.wN,0));
    } else {
        addQuietMove(move(from,to,PIECES.EMPTY,PIECES.EMPTY,0));
    }
}

function addBlackPawnQuietMove(from, to) {
    if (RanksBrd[from] === RANKS.RANK_2) {
        addQuietMove(move(from,to,PIECES.EMPTY,PIECES.bQ,0));
        addQuietMove(move(from,to,PIECES.EMPTY,PIECES.bR,0));
        addQuietMove(move(from,to,PIECES.EMPTY,PIECES.bB,0));
        addQuietMove(move(from,to,PIECES.EMPTY,PIECES.bN,0));
    } else {
        addQuietMove(move(from,to,PIECES.EMPTY,PIECES.EMPTY,0));
    }
}

function generateMoves() {
    GameBoard.moveListStart[GameBoard.ply + 1] = GameBoard.moveListStart[GameBoard.ply];

    let pceType;
    let pceNum;
    let sq;
    let pceIndex;
    let pce;
    let tSquare;
    let dir;

    if (GameBoard.side === COLORS.WHITE) {
        pceType = PIECES.wP;

        for (pceNum = 0; pceNum < GameBoard.pceNum[pceType]; ++pceNum) {
            sq = GameBoard.pList[pieceIndex(pceType, pceNum)];
            if (GameBoard.pieces[sq + 10] === PIECES.EMPTY) {
                addWhitePawnQuietMove(sq, sq + 10);
                if (RanksBrd[sq] === RANKS.RANK_2 && GameBoard.pieces[sq + 20] === PIECES.EMPTY) {
                    addQuietMove(move(sq, sq + 20, PIECES.EMPTY, PIECES.EMPTY, MFLAGPS));
                }
            }

            if (isSquareOffBoard(sq + 9) === BOOL.FALSE && pieceColor[GameBoard.pieces[sq + 9]] === COLORS.BLACK) {
                addWhitePawnCaptureMove(sq, sq + 9, GameBoard.pieces[sq + 9]);
            }

            if (isSquareOffBoard(sq + 11) === BOOL.FALSE && pieceColor[GameBoard.pieces[sq + 11]] === COLORS.BLACK) {
                addWhitePawnCaptureMove(sq, sq + 11, GameBoard.pieces[sq + 11]);
            }

            if (GameBoard.enPas !== SQUARES.NO_SQ) {
                if (sq + 9 === GameBoard.enPas) {
                    addEnPassantMove(move(sq, sq + 9, PIECES.EMPTY, PIECES.EMPTY, MFLAGEP));
                }

                if (sq + 11 === GameBoard.enPas) {
                    addEnPassantMove(move(sq, sq + 11, PIECES.EMPTY, PIECES.EMPTY, MFLAGEP));
                }
            }

        }

        if (GameBoard.castlePerm & CASTLEBIT.WKCA) {
            if (GameBoard.pieces[SQUARES.F1] === PIECES.EMPTY && GameBoard.pieces[SQUARES.G1] === PIECES.EMPTY) {
                if (squareAttacked(SQUARES.F1, COLORS.BLACK) === BOOL.FALSE && squareAttacked(SQUARES.E1, COLORS.BLACK) === BOOL.FALSE) {
                    addQuietMove(move(SQUARES.E1, SQUARES.G1, PIECES.EMPTY, PIECES.EMPTY, MFLAGCA));
                }
            }
        }

        if (GameBoard.castlePerm & CASTLEBIT.WQCA) {
            if (GameBoard.pieces[SQUARES.D1] === PIECES.EMPTY && GameBoard.pieces[SQUARES.C1] === PIECES.EMPTY && GameBoard.pieces[SQUARES.B1] === PIECES.EMPTY) {
                if (squareAttacked(SQUARES.D1, COLORS.BLACK) === BOOL.FALSE && squareAttacked(SQUARES.E1, COLORS.BLACK) === BOOL.FALSE) {
                    addQuietMove(move(SQUARES.E1, SQUARES.C1, PIECES.EMPTY, PIECES.EMPTY, MFLAGCA));
                }
            }
        }

    } else {
        pceType = PIECES.bP;

        for (pceNum = 0; pceNum < GameBoard.pceNum[pceType]; ++pceNum) {
            sq = GameBoard.pList[pieceIndex(pceType, pceNum)];
            if (GameBoard.pieces[sq - 10] === PIECES.EMPTY) {
                addBlackPawnQuietMove(sq, sq - 10);
                if (RanksBrd[sq] === RANKS.RANK_7 && GameBoard.pieces[sq - 20] === PIECES.EMPTY) {
                    addQuietMove(move(sq, sq - 20, PIECES.EMPTY, PIECES.EMPTY, MFLAGPS));
                }
            }

            if (isSquareOffBoard(sq - 9) === BOOL.FALSE && pieceColor[GameBoard.pieces[sq - 9]] === COLORS.WHITE) {
                addBlackPawnCaptureMove(sq, sq - 9, GameBoard.pieces[sq - 9]);
            }

            if (isSquareOffBoard(sq - 11) === BOOL.FALSE && pieceColor[GameBoard.pieces[sq - 11]] === COLORS.WHITE) {
                addBlackPawnCaptureMove(sq, sq - 11, GameBoard.pieces[sq - 11]);
            }

            if (GameBoard.enPas !== SQUARES.NO_SQ) {
                if (sq - 9 === GameBoard.enPas) {
                    addEnPassantMove(move(sq, sq - 9, PIECES.EMPTY, PIECES.EMPTY, MFLAGEP));
                }

                if (sq - 11 === GameBoard.enPas) {
                    addEnPassantMove(move(sq, sq - 11, PIECES.EMPTY, PIECES.EMPTY, MFLAGEP));
                }
            }
        }
        if (GameBoard.castlePerm & CASTLEBIT.BKCA) {
            if (GameBoard.pieces[SQUARES.F8] === PIECES.EMPTY && GameBoard.pieces[SQUARES.G8] === PIECES.EMPTY) {
                if (squareAttacked(SQUARES.F8, COLORS.WHITE) === BOOL.FALSE && squareAttacked(SQUARES.E8, COLORS.WHITE) === BOOL.FALSE) {
                    addQuietMove(move(SQUARES.E8, SQUARES.G8, PIECES.EMPTY, PIECES.EMPTY, MFLAGCA));
                }
            }
        }

        if (GameBoard.castlePerm & CASTLEBIT.BQCA) {
            if (GameBoard.pieces[SQUARES.D8] === PIECES.EMPTY && GameBoard.pieces[SQUARES.C8] === PIECES.EMPTY && GameBoard.pieces[SQUARES.B8] === PIECES.EMPTY) {
                if (squareAttacked(SQUARES.D8, COLORS.WHITE) === BOOL.FALSE && squareAttacked(SQUARES.E8, COLORS.WHITE) === BOOL.FALSE) {
                    addQuietMove(move(SQUARES.E8, SQUARES.C8, PIECES.EMPTY, PIECES.EMPTY, MFLAGCA));
                }
            }
        }
    }

    pceIndex = LoopNonSlideIndex[GameBoard.side];
    pce = LoopNonSlidePce[pceIndex++];

    while (pce !== 0) {
        for (pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
            sq = GameBoard.pList[pieceIndex(pce, pceNum)];

            for (let index = 0; index < DirNum[pce]; index++) {
                dir = PceDir[pce][index];
                tSquare = sq + dir;

                if (isSquareOffBoard(tSquare) === BOOL.TRUE) {
                    continue;
                }

                if (GameBoard.pieces[tSquare] !== PIECES.EMPTY) {
                    if (pieceColor[GameBoard.pieces[tSquare]] !== GameBoard.side) {
                        addCaptureMove(move(sq, tSquare, GameBoard.pieces[tSquare], PIECES.EMPTY, 0));
                    }
                } else {
                    addQuietMove(move(sq, tSquare, PIECES.EMPTY, PIECES.EMPTY, 0));
                }
            }
        }
        pce = LoopNonSlidePce[pceIndex++];
    }

    pceIndex = LoopSlideIndex[GameBoard.side];
    pce = LoopSlidePce[pceIndex++];

    while (pce !== 0) {
        for (pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
            sq = GameBoard.pList[pieceIndex(pce, pceNum)];

            for (let index = 0; index < DirNum[pce]; index++) {
                dir = PceDir[pce][index];
                tSquare = sq + dir;

                while (isSquareOffBoard(tSquare) === BOOL.FALSE) {

                    if (GameBoard.pieces[tSquare] !== PIECES.EMPTY) {
                        if (pieceColor[GameBoard.pieces[tSquare]] !== GameBoard.side) {
                            addCaptureMove(move(sq, tSquare, GameBoard.pieces[tSquare], PIECES.EMPTY, 0));
                        }
                        break;
                    }
                    addQuietMove(move(sq, tSquare, PIECES.EMPTY, PIECES.EMPTY, 0));
                    tSquare += dir;
                }
            }
        }
        pce = LoopSlidePce[pceIndex++];
    }
}

function generateCaptures() {
    GameBoard.moveListStart[GameBoard.ply + 1] = GameBoard.moveListStart[GameBoard.ply];

    let pceType;
    let pceNum;
    let sq;
    let pceIndex;
    let pce;
    let tSquare;
    let dir;

    if (GameBoard.side === COLORS.WHITE) {
        pceType = PIECES.wP;

        for (pceNum = 0; pceNum < GameBoard.pceNum[pceType]; ++pceNum) {
            sq = GameBoard.pList[pieceIndex(pceType, pceNum)];

            if (isSquareOffBoard(sq + 9) === BOOL.FALSE && pieceColor[GameBoard.pieces[sq + 9]] === COLORS.BLACK) {
                addWhitePawnCaptureMove(sq, sq + 9, GameBoard.pieces[sq + 9]);
            }

            if (isSquareOffBoard(sq + 11) === BOOL.FALSE && pieceColor[GameBoard.pieces[sq + 11]] === COLORS.BLACK) {
                addWhitePawnCaptureMove(sq, sq + 11, GameBoard.pieces[sq + 11]);
            }

            if (GameBoard.enPas !== SQUARES.NO_SQ) {
                if (sq + 9 === GameBoard.enPas) {
                    addEnPassantMove(move(sq, sq + 9, PIECES.EMPTY, PIECES.EMPTY, MFLAGEP));
                }

                if (sq + 11 === GameBoard.enPas) {
                    addEnPassantMove(move(sq, sq + 11, PIECES.EMPTY, PIECES.EMPTY, MFLAGEP));
                }
            }

        }

    } else {
        pceType = PIECES.bP;

        for (pceNum = 0; pceNum < GameBoard.pceNum[pceType]; ++pceNum) {
            sq = GameBoard.pList[pieceIndex(pceType, pceNum)];

            if (isSquareOffBoard(sq - 9) === BOOL.FALSE && pieceColor[GameBoard.pieces[sq - 9]] === COLORS.WHITE) {
                addBlackPawnCaptureMove(sq, sq - 9, GameBoard.pieces[sq - 9]);
            }

            if (isSquareOffBoard(sq - 11) === BOOL.FALSE && pieceColor[GameBoard.pieces[sq - 11]] === COLORS.WHITE) {
                addBlackPawnCaptureMove(sq, sq - 11, GameBoard.pieces[sq - 11]);
            }

            if (GameBoard.enPas !== SQUARES.NO_SQ) {
                if (sq - 9 === GameBoard.enPas) {
                    addEnPassantMove(move(sq, sq - 9, PIECES.EMPTY, PIECES.EMPTY, MFLAGEP));
                }

                if (sq - 11 === GameBoard.enPas) {
                    addEnPassantMove(move(sq, sq - 11, PIECES.EMPTY, PIECES.EMPTY, MFLAGEP));
                }
            }
        }
    }

    pceIndex = LoopNonSlideIndex[GameBoard.side];
    pce = LoopNonSlidePce[pceIndex++];

    while (pce !== 0) {
        for (pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
            sq = GameBoard.pList[pieceIndex(pce, pceNum)];

            for (let index = 0; index < DirNum[pce]; index++) {
                dir = PceDir[pce][index];
                tSquare = sq + dir;

                if (isSquareOffBoard(tSquare) === BOOL.TRUE) {
                    continue;
                }

                if (GameBoard.pieces[tSquare] !== PIECES.EMPTY) {
                    if (pieceColor[GameBoard.pieces[tSquare]] !== GameBoard.side) {
                        addCaptureMove(move(sq, tSquare, GameBoard.pieces[tSquare], PIECES.EMPTY, 0));
                    }
                }
            }
        }
        pce = LoopNonSlidePce[pceIndex++];
    }

    pceIndex = LoopSlideIndex[GameBoard.side];
    pce = LoopSlidePce[pceIndex++];

    while (pce !== 0) {
        for (pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
            sq = GameBoard.pList[pieceIndex(pce, pceNum)];

            for (let index = 0; index < DirNum[pce]; index++) {
                dir = PceDir[pce][index];
                tSquare = sq + dir;

                while (isSquareOffBoard(tSquare) === BOOL.FALSE) {

                    if (GameBoard.pieces[tSquare] !== PIECES.EMPTY) {
                        if (pieceColor[GameBoard.pieces[tSquare]] !== GameBoard.side) {
                            addCaptureMove(move(sq, tSquare, GameBoard.pieces[tSquare], PIECES.EMPTY, 0));
                        }
                        break;
                    }
                    tSquare += dir;
                }
            }
        }
        pce = LoopSlidePce[pceIndex++];
    }
}

export {
    initMvvLva,
    moveExists,
    addCaptureMove,
    addQuietMove,
    addEnPassantMove,
    addWhitePawnCaptureMove,
    addBlackPawnCaptureMove,
    addWhitePawnQuietMove,
    addBlackPawnQuietMove,
    generateMoves,
    generateCaptures
};
