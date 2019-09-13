import { BOOL, COLORS, PIECES, pieceColor, SQUARES, pieceValue, hashPiece, fromSquare, toSquare, hashCastle, hashEnPassant, hashSide, MFLAGEP, MFLAGCA, CastlePerm, captured, isPawn, MFLAGPS, promoted, Kings } from './constants';
import { GameBoard, pieceIndex, squareAttacked } from './board';
import { setInitialBoardPieces } from './gui';

function clearPiece(sq) {
    const pce = GameBoard.pieces[sq];
    const col = pieceColor[pce];
    let index;
    let tPieceNum = -1;

    hashPiece(pce, sq);

    GameBoard.pieces[sq] = PIECES.EMPTY;
    GameBoard.material[col] -= pieceValue[pce];

    for (index = 0; index < GameBoard.pceNum[pce]; ++index) {
        if (GameBoard.pList[pieceIndex(pce,index)] === sq) {
            tPieceNum = index;
            break;
        }
    }

    GameBoard.pceNum[pce]--;
    GameBoard.pList[pieceIndex(pce, tPieceNum)] = GameBoard.pList[pieceIndex(pce, GameBoard.pceNum[pce])];
}

function addPiece(sq, pce) {
    const col = pieceColor[pce];

    hashPiece(pce, sq);

    GameBoard.pieces[sq] = pce;
    GameBoard.material[col] += pieceValue[pce];
    GameBoard.pList[pieceIndex(pce, GameBoard.pceNum[pce])] = sq;
    GameBoard.pceNum[pce]++;
}

function movePiece(from, to) {
    let index = 0;
    const pce = GameBoard.pieces[from];

    hashPiece(pce, from);
    GameBoard.pieces[from] = PIECES.EMPTY;

    hashPiece(pce,to);
    GameBoard.pieces[to] = pce;

    for (index = 0; index < GameBoard.pceNum[pce]; ++index) {
        if (GameBoard.pList[pieceIndex(pce,index)] === from) {
            GameBoard.pList[pieceIndex(pce,index)] = to;
            break;
        }
    }
}

function makeMove(move) {
    const from = fromSquare(move);
    const to = toSquare(move);
    const side = GameBoard.side;

    GameBoard.history[GameBoard.hisPly].posKey = GameBoard.posKey;

    if ((move & MFLAGEP) !== 0) {
        if (side === COLORS.WHITE) {
            clearPiece(to - 10);
        } else {
            clearPiece(to + 10);
        }
    } else if ((move & MFLAGCA) !== 0) {
        switch (to) {
        case SQUARES.C1:
            movePiece(SQUARES.A1, SQUARES.D1);
            break;
        case SQUARES.C8:
            movePiece(SQUARES.A8, SQUARES.D8);
            break;
        case SQUARES.G1:
            movePiece(SQUARES.H1, SQUARES.F1);
            break;
        case SQUARES.G8:
            movePiece(SQUARES.H8, SQUARES.F8);
            break;
        default: break;
        }
    }

    if (GameBoard.enPas !== SQUARES.NO_SQ) hashEnPassant();
    hashCastle();

    GameBoard.history[GameBoard.hisPly].move = move;
    GameBoard.history[GameBoard.hisPly].fiftyMove = GameBoard.fiftyMove;
    GameBoard.history[GameBoard.hisPly].enPas = GameBoard.enPas;
    GameBoard.history[GameBoard.hisPly].castlePerm = GameBoard.castlePerm;

    GameBoard.castlePerm &= CastlePerm[from];
    GameBoard.castlePerm &= CastlePerm[to];
    GameBoard.enPas = SQUARES.NO_SQ;

    hashCastle();

    const isCaptured = captured(move);
    GameBoard.fiftyMove++;

    if (isCaptured !== PIECES.EMPTY) {
        clearPiece(to);
        GameBoard.fiftyMove = 0;
    }

    GameBoard.hisPly++;
    GameBoard.ply++;

    if (isPawn[GameBoard.pieces[from]] === BOOL.TRUE) {
        GameBoard.fiftyMove = 0;
        if ((move & MFLAGPS) !== 0) {
            if (side === COLORS.WHITE) {
                GameBoard.enPas = from + 10;
            } else {
                GameBoard.enPas = from - 10;
            }
            hashEnPassant();
        }
    }

    movePiece(from, to);

    const prPce = promoted(move);
    if (prPce !== PIECES.EMPTY) {
        clearPiece(to);
        addPiece(to, prPce);
    }

    GameBoard.side ^= 1;
    hashSide();

    if (squareAttacked(GameBoard.pList[pieceIndex(Kings[side],0)], GameBoard.side)) {
        takeMove();
        return BOOL.FALSE;
    }

    return BOOL.TRUE;
}

function takeMove() {
    GameBoard.hisPly--;
    GameBoard.ply--;

    const move = GameBoard.history[GameBoard.hisPly].move;
    const from = fromSquare(move);
    const to = toSquare(move);

    if (GameBoard.enPas !== SQUARES.NO_SQ) hashEnPassant();
    hashCastle();

    GameBoard.castlePerm = GameBoard.history[GameBoard.hisPly].castlePerm;
    GameBoard.fiftyMove = GameBoard.history[GameBoard.hisPly].fiftyMove;
    GameBoard.enPas = GameBoard.history[GameBoard.hisPly].enPas;

    if (GameBoard.enPas !== SQUARES.NO_SQ) hashEnPassant();
    hashCastle();

    GameBoard.side ^= 1;
    hashSide();

    if ((MFLAGEP & move) !== 0) {
        if (GameBoard.side === COLORS.WHITE) {
            addPiece(to - 10, PIECES.bP);
        } else {
            addPiece(to + 10, PIECES.wP);
        }
    } else if ((MFLAGCA & move) !== 0) {
        switch (to) {
        case SQUARES.C1: movePiece(SQUARES.D1, SQUARES.A1); break;
        case SQUARES.C8: movePiece(SQUARES.D8, SQUARES.A8); break;
        case SQUARES.G1: movePiece(SQUARES.F1, SQUARES.H1); break;
        case SQUARES.G8: movePiece(SQUARES.F8, SQUARES.H8); break;
        default: break;
        }
    }

    movePiece(to, from);

    const isCaptured = captured(move);
    if (isCaptured !== PIECES.EMPTY) {
        addPiece(to, isCaptured);
    }

    if (promoted(move) !== PIECES.EMPTY) {
        clearPiece(from);
        addPiece(from, (pieceColor[promoted(move)] === COLORS.WHITE ? PIECES.wP : PIECES.bP));
    }
}

function undoMove () {
    if (GameBoard.hisPly > 0) {
        takeMove();
        GameBoard.ply = 0;
        setInitialBoardPieces();
    }
}

export {
    clearPiece,
    addPiece,
    movePiece,
    makeMove,
    takeMove,
    undoMove
};
