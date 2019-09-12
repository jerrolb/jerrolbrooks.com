import { MAXDEPTH, MAXPOSITIONMOVES, COLORS, PIECES, doSq120 } from './constants';
import { BOOL, FILES, RANKS, SQUARES, numOfBoardSquares, fileRankToSquare, PieceKeys, CastleKeys, sideKey, pieceColor, pieceValue, rankChar, pceChar, fileChar, sideChar, CASTLEBIT, KnDir, isKnight, isRookQueen, BiDir, RkDir, isBishopQueen, isKing, KiDir, } from './constants';
import { printSquare } from './io';

function pieceIndex(pce, pceNum) {
    return (pce * 10 + pceNum);
}

const GameBoard = {
    pieces: new Array(numOfBoardSquares),
    side: COLORS.WHITE,
    fiftyMove: 0,
    hisPly: 0,
    history: [],
    ply: 0,
    enPas: 0,
    castlePerm: 0,
    material: new Array(2), // WHITE,BLACK material of pieces
    pceNum: new Array(13), // indexed by Pce
    pList: new Array(14 * 10),
    posKey: 0,
    moveList: new Array(MAXDEPTH * MAXPOSITIONMOVES),
    moveScores: new Array(MAXDEPTH * MAXPOSITIONMOVES),
    moveListStart: new Array(MAXDEPTH),
    PvTable: [],
    PvArray: new Array(MAXDEPTH),
    searchHistory: new Array(14 * numOfBoardSquares),
    searchKillers: new Array(3 * MAXDEPTH)
};

function CheckBoard() {

    const tPieceNum = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const tMaterial = [ 0, 0];
    let sq64, tPiece, tPieceNumber, sq120;

    for (tPiece = PIECES.wP; tPiece <= PIECES.bK; ++tPiece) {
        for (tPieceNumber = 0; tPieceNumber < GameBoard.pceNum[tPiece]; ++tPieceNumber) {
            sq120 = GameBoard.pList[pieceIndex(tPiece,tPieceNumber)];
            if (GameBoard.pieces[sq120] !== tPiece) {
                console.log('Error Pce Lists');
                return BOOL.FALSE;
            }
        }
    }

    for (sq64 = 0; sq64 < 64; ++sq64) {
        sq120 = doSq120(sq64);
        tPiece = GameBoard.pieces[sq120];
        tPieceNum[tPiece]++;
        tMaterial[pieceColor[tPiece]] += pieceValue[tPiece];
    }

    for (tPiece = PIECES.wP; tPiece <= PIECES.bK; ++tPiece) {
        if (tPieceNum[tPiece] !== GameBoard.pceNum[tPiece]) {
            console.log('Error tPieceNum');
            return BOOL.FALSE;
        }
    }

    if (tMaterial[COLORS.WHITE] !== GameBoard.material[COLORS.WHITE] ||
             tMaterial[COLORS.BLACK] !== GameBoard.material[COLORS.BLACK]) {
        console.log('Error tMaterial');
        return BOOL.FALSE;
    }

    if (GameBoard.side !== COLORS.WHITE && GameBoard.side !== COLORS.BLACK) {
        console.log('Error GameBoard.side');
        return BOOL.FALSE;
    }

    if (generatePosKey() !== GameBoard.posKey) {
        console.log('Error GameBoard.posKey');
        return BOOL.FALSE;
    }
    return BOOL.TRUE;
}

function printBoard() {

    let sq,file,rank,piece;

    console.log('\nGame Board:\n');
    for (rank = RANKS.RANK_8; rank >= RANKS.RANK_1; rank--) {
        let line = (rankChar[rank] + '  ');
        for (file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
            sq = fileRankToSquare(file,rank);
            piece = GameBoard.pieces[sq];
            line += (' ' + pceChar[piece] + ' ');
        }
        console.log(line);
    }

    console.log('');
    let line = '   ';
    for (file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
        line += (' ' + fileChar[file] + ' ');
    }

    console.log(line);
    console.log('side:' + sideChar[GameBoard.side]);
    console.log('enPas:' + GameBoard.enPas);
    line = '';

    if (GameBoard.castlePerm & CASTLEBIT.WKCA) line += 'K';
    if (GameBoard.castlePerm & CASTLEBIT.WQCA) line += 'Q';
    if (GameBoard.castlePerm & CASTLEBIT.BKCA) line += 'k';
    if (GameBoard.castlePerm & CASTLEBIT.BQCA) line += 'q';
    console.log('castle:' + line);
    console.log('key:' + GameBoard.posKey.toString(16));
}

function generatePosKey() {

    let sq = 0;
    let finalKey = 0;
    let piece = PIECES.EMPTY;

    for (sq = 0; sq < numOfBoardSquares; ++sq) {
        piece = GameBoard.pieces[sq];
        if (piece !== PIECES.EMPTY && piece !== SQUARES.OFFBOARD) {
            finalKey ^= PieceKeys[(piece * 120) + sq];
        }
    }

    if (GameBoard.side === COLORS.WHITE) {
        finalKey ^= sideKey;
    }

    if (GameBoard.enPas !== SQUARES.NO_SQ) {
        finalKey ^= PieceKeys[GameBoard.enPas];
    }

    finalKey ^= CastleKeys[GameBoard.castlePerm];

    return finalKey;

}

function PrintPieceLists() {

    let piece, pceNum;

    for (piece = PIECES.wP; piece <= PIECES.bK; ++piece) {
        for (pceNum = 0; pceNum < GameBoard.pceNum[piece]; ++pceNum) {
            console.log('Piece ' + pceChar[piece] + ' on ' + printSquare(GameBoard.pList[pieceIndex(piece,pceNum)]));
        }
    }

}

function updateListsMaterial() {

    let piece,sq,index,color;

    for (index = 0; index < 14 * 120; ++index) {
        GameBoard.pList[index] = PIECES.EMPTY;
    }

    for (index = 0; index < 2; ++index) {
        GameBoard.material[index] = 0;
    }

    for (index = 0; index < 13; ++index) {
        GameBoard.pceNum[index] = 0;
    }

    for (index = 0; index < 64; ++index) {
        sq = doSq120(index);
        piece = GameBoard.pieces[sq];
        if (piece !== PIECES.EMPTY) {

            color = pieceColor[piece];

            GameBoard.material[color] += pieceValue[piece];

            GameBoard.pList[pieceIndex(piece,GameBoard.pceNum[piece])] = sq;
            GameBoard.pceNum[piece]++;
        }
    }

}

function resetBoard() {

    let index = 0;

    for (index = 0; index < numOfBoardSquares; ++index) {
        GameBoard.pieces[index] = SQUARES.OFFBOARD;
    }

    for (index = 0; index < 64; ++index) {
        GameBoard.pieces[doSq120(index)] = PIECES.EMPTY;
    }

    GameBoard.side = COLORS.BOTH;
    GameBoard.enPas = SQUARES.NO_SQ;
    GameBoard.fiftyMove = 0;
    GameBoard.ply = 0;
    GameBoard.hisPly = 0;
    GameBoard.castlePerm = 0;
    GameBoard.posKey = 0;
    GameBoard.moveListStart[GameBoard.ply] = 0;

}

// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1

function parseFen(fen) {

    resetBoard();

    let rank = RANKS.RANK_8;
    let file = FILES.FILE_A;
    let piece = 0;
    let count = 0;
    let i = 0;
    let sq120 = 0;
    let fenCnt = 0; // fen[fenCnt]

    while ((rank >= RANKS.RANK_1) && fenCnt < fen.length) {
        count = 1;
        switch (fen[fenCnt]) {
        case 'p': piece = PIECES.bP; break;
        case 'r': piece = PIECES.bR; break;
        case 'n': piece = PIECES.bN; break;
        case 'b': piece = PIECES.bB; break;
        case 'k': piece = PIECES.bK; break;
        case 'q': piece = PIECES.bQ; break;
        case 'P': piece = PIECES.wP; break;
        case 'R': piece = PIECES.wR; break;
        case 'N': piece = PIECES.wN; break;
        case 'B': piece = PIECES.wB; break;
        case 'K': piece = PIECES.wK; break;
        case 'Q': piece = PIECES.wQ; break;

        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
            piece = PIECES.EMPTY;
            count = fen[fenCnt].charCodeAt() - '0'.charCodeAt();
            break;

        case '/':
        case ' ':
            rank--;
            file = FILES.FILE_A;
            fenCnt++;
            continue;
        default:
            console.log('FEN error');
            return;

        }

        for (i = 0; i < count; i++) {
            sq120 = fileRankToSquare(file,rank);
            GameBoard.pieces[sq120] = piece;
            file++;
        }
        fenCnt++;
    } // while loop end

    // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
    GameBoard.side = (fen[fenCnt] === 'w') ? COLORS.WHITE : COLORS.BLACK;
    fenCnt += 2;

    for (i = 0; i < 4; i++) {
        if (fen[fenCnt] === ' ') {
            break;
        }
        switch (fen[fenCnt]) {
        case 'K': GameBoard.castlePerm |= CASTLEBIT.WKCA; break;
        case 'Q': GameBoard.castlePerm |= CASTLEBIT.WQCA; break;
        case 'k': GameBoard.castlePerm |= CASTLEBIT.BKCA; break;
        case 'q': GameBoard.castlePerm |= CASTLEBIT.BQCA; break;
        default: break;
        }
        fenCnt++;
    }
    fenCnt++;

    if (fen[fenCnt] !== '-') {
        file = fen[fenCnt].charCodeAt() - 'a'.charCodeAt();
        rank = fen[fenCnt + 1].charCodeAt() - '1'.charCodeAt();
        console.log('fen[fenCnt]:' + fen[fenCnt] + ' File:' + file + ' Rank:' + rank);
        GameBoard.enPas = fileRankToSquare(file,rank);
    }

    GameBoard.posKey = generatePosKey();
    updateListsMaterial();
}

function printSquareAttacked() {

    let sq,file,rank,piece;

    console.log('\nAttacked:\n');

    for (rank = RANKS.RANK_8; rank >= RANKS.RANK_1; rank--) {
        let line = ((rank + 1) + '  ');
        for (file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
            sq = fileRankToSquare(file,rank);
            if (squareAttacked(sq, GameBoard.side ^ 1) === BOOL.TRUE) piece = 'X';
            else piece = '-';
            line += (' ' + piece + ' ');
        }
        console.log(line);
    }

    console.log('');

}

function squareAttacked(sq, side) {
    let pce;
    let tSquare;
    let index;
    let dir;

    if (side === COLORS.WHITE) {
        if (GameBoard.pieces[sq - 11] === PIECES.wP || GameBoard.pieces[sq - 9] === PIECES.wP) {
            return BOOL.TRUE;
        }
    } else {
        if (GameBoard.pieces[sq + 11] === PIECES.bP || GameBoard.pieces[sq + 9] === PIECES.bP) {
            return BOOL.TRUE;
        }
    }

    for (index = 0; index < 8; index++) {
        pce = GameBoard.pieces[sq + KnDir[index]];
        if (pce !== SQUARES.OFFBOARD && pieceColor[pce] === side && isKnight[pce] === BOOL.TRUE) {
            return BOOL.TRUE;
        }
    }

    for (index = 0; index < 4; ++index) {
        dir = RkDir[index];
        tSquare = sq + dir;
        pce = GameBoard.pieces[tSquare];
        while (pce !== SQUARES.OFFBOARD) {
            if (pce !== PIECES.EMPTY) {
                if (isRookQueen[pce] === BOOL.TRUE && pieceColor[pce] === side) {
                    return BOOL.TRUE;
                }
                break;
            }
            tSquare += dir;
            pce = GameBoard.pieces[tSquare];
        }
    }

    for (index = 0; index < 4; ++index) {
        dir = BiDir[index];
        tSquare = sq + dir;
        pce = GameBoard.pieces[tSquare];
        while (pce !== SQUARES.OFFBOARD) {
            if (pce !== PIECES.EMPTY) {
                if (isBishopQueen[pce] === BOOL.TRUE && pieceColor[pce] === side) {
                    return BOOL.TRUE;
                }
                break;
            }
            tSquare += dir;
            pce = GameBoard.pieces[tSquare];
        }
    }

    for (index = 0; index < 8; index++) {
        pce = GameBoard.pieces[sq + KiDir[index]];
        if (pce !== SQUARES.OFFBOARD && pieceColor[pce] === side && isKing[pce] === BOOL.TRUE) {
            return BOOL.TRUE;
        }
    }

    return BOOL.FALSE;

}

export {
    pieceIndex,
    GameBoard,
    CheckBoard,
    printBoard,
    generatePosKey,
    PrintPieceLists,
    updateListsMaterial,
    resetBoard,
    parseFen,
    printSquareAttacked,
    squareAttacked
};
