import { GameBoard } from './board';

export const numOfBoardSquares = 120;
export const PIECES = { EMPTY : 0, wP : 1, wN : 2, wB : 3,wR : 4, wQ : 5, wK : 6, bP : 7, bN : 8, bB : 9, bR : 10, bQ : 11, bK : 12 };
export const FILES = { FILE_A:0, FILE_B:1, FILE_C:2, FILE_D:3, FILE_E:4, FILE_F:5, FILE_G:6, FILE_H:7, FILE_NONE:8 };
export const RANKS = { RANK_1:0, RANK_2:1, RANK_3:2, RANK_4:3, RANK_5:4, RANK_6:5, RANK_7:6, RANK_8:7, RANK_NONE:8 };
export const COLORS = { WHITE:0, BLACK:1, BOTH:2 };
export const CASTLEBIT = { WKCA : 1, WQCA : 2, BKCA : 4, BQCA : 8 };

export const SQUARES = {
    A1:21, B1:22, C1:23, D1:24, E1:25, F1:26, G1:27, H1:28,
    A8:91, B8:92, C8:93, D8:94, E8:95, F8:96, G8:97, H8:98,
    NO_SQ:99, OFFBOARD:100
};

export const BOOL = { FALSE:0, TRUE:1 };

export const MAXGAMEMOVES = 2048;
export const MAXPOSITIONMOVES = 256;
export const MAXDEPTH = 64;
export const INFINITE = 30000;
export const MATE = 29000;
export const PVENTRIES = 10000;

export const FilesBrd = new Array(numOfBoardSquares);
export const RanksBrd = new Array(numOfBoardSquares);

export const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const pceChar = '.PNBRQKpnbrqk';
export const sideChar = 'wb-';
export const rankChar = '12345678';
export const fileChar = 'abcdefgh';

export function fileRankToSquare(file,rank) {
    return ((21 + (file)) + ((rank) * 10));
}

export const isPieceBig = [ BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE ];
export const isPieceMajor = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE ];
export const isPieceMinor = [ BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE ];
export const pieceValue = [ 0, 100, 325, 325, 550, 1000, 50000, 100, 325, 325, 550, 1000, 50000 ];
export const pieceColor = [ COLORS.BOTH, COLORS.WHITE, COLORS.WHITE, COLORS.WHITE, COLORS.WHITE, COLORS.WHITE, COLORS.WHITE, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK ];

export const isPawn = [ BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE ];
export const isKnight = [ BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE ];
export const isKing = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE ];
export const isRookQueen = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE ];
export const isBishopQueen = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE ];
export const pieceSlides = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE ];

export const KnDir = [ -8, -19, -21, -12, 8, 19, 21, 12 ];
export const RkDir = [ -1, -10, 1, 10 ];
export const BiDir = [ -9, -11, 11, 9 ];
export const KiDir = [ -1, -10, 1, 10, -9, -11, 11, 9 ];
export const DirNum = [ 0, 0, 8, 4, 4, 8, 8, 0, 8, 4, 4, 8, 8 ];
export const PceDir = [ 0, 0, KnDir, BiDir, RkDir, KiDir, KiDir, 0, KnDir, BiDir, RkDir, KiDir, KiDir ];

export const LoopNonSlidePce = [ PIECES.wN, PIECES.wK, 0, PIECES.bN, PIECES.bK, 0 ];
export const LoopNonSlideIndex = [ 0, 3 ];
export const LoopSlidePce = [ PIECES.wB, PIECES.wR, PIECES.wQ, 0, PIECES.bB, PIECES.bR, PIECES.bQ, 0 ];
export const LoopSlideIndex = [ 0, 4];

export const PieceKeys = new Array(14 * 120);
export const sideKey = undefined;
export const CastleKeys = new Array(16);

export const Sq120ToSq64 = new Array(numOfBoardSquares);
export const Sq64ToSq120 = new Array(64);

export function rand32() {
    return (Math.floor((Math.random() * 255) + 1) << 23) | (Math.floor((Math.random() * 255) + 1) << 16)
         | (Math.floor((Math.random() * 255) + 1) << 8) | Math.floor((Math.random() * 255) + 1);
}

export const mirror64 = [
    56,57,58,59,60,61,62,63,
    48,49,50,51,52,53,54,55,
    40,41,42,43,44,45,46,47,
    32,33,34,35,36,37,38,39,
    24,25,26,27,28,29,30,31,
    16,17,18,19,20,21,22,23,
    8,9,10,11,12,13,14,15,
    0,1,2,3,4,5,6,7
];

export function doSq64(sq120) {
    return Sq120ToSq64[(sq120)];
}

export function doSq120(sq64) {
    return Sq64ToSq120[(sq64)];
}

export function pieceIndex(pce, pceNum) {
    return (pce * 10 + pceNum);
}

export function doMirror64(sq) {
    return mirror64[sq];
}

export const Kings = [PIECES.wK, PIECES.bK];
export const CastlePerm = [
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 13, 15, 15, 15, 12, 15, 15, 14, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 7, 15, 15, 15, 3, 15, 15, 11, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15
];

/*
0000 0000 0000 0000 0000 0111 1111 -> From 0x7F
0000 0000 0000 0011 1111 1000 0000 -> To >> 7, 0x7F
0000 0000 0011 1100 0000 0000 0000 -> Captured >> 14, 0xF
0000 0000 0100 0000 0000 0000 0000 -> EP 0x40000
0000 0000 1000 0000 0000 0000 0000 -> Pawn Start 0x80000
0000 1111 0000 0000 0000 0000 0000 -> Promoted Piece >> 20, 0xF
0001 0000 0000 0000 0000 0000 0000 -> Castle 0x1000000
*/

export function fromSquare(m) {
    return (m & 0x7F);
}
export function toSquare(m) {
    return ((m >> 7) & 0x7F);
}
export function captured(m) {
    return ((m >> 14) & 0xF);
}
export function promoted(m) {
    return ((m >> 20) & 0xF);
}

export const MFLAGEP = 0x40000;
export const MFLAGPS = 0x80000;
export const MFLAGCA = 0x1000000;
export const MFLAGCAP = 0x7C000;
export const MFLAGPROM = 0xF00000;
export const noMove = 0;

export function isSquareOffBoard(square) {
    return FilesBrd[square] === SQUARES.OFFBOARD ? BOOL.TRUE : BOOL.FALSE;
}

export function hashPiece(piece, square) {
    GameBoard.posKey ^= PieceKeys[(piece * 120) + square];
}

export function hashCastle() {
    GameBoard.posKey ^= CastleKeys[GameBoard.castlePerm];
}
export function hashSide() {
    GameBoard.posKey ^= sideKey;
}
export function hashEnPassant() {
    GameBoard.posKey ^= PieceKeys[GameBoard.enPas];
}

export const GameController = {
    EngineSide: COLORS.BOTH,
    PlayerSide: COLORS.BOTH,
    GameOver: BOOL.FALSE
};

export const UserMove = {
    from: SQUARES.NO_SQ,
    to: SQUARES.NO_SQ
};
