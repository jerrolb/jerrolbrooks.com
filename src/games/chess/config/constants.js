export const numberOfSquaresOnBoard = 120;
export const BOOL = {
    FALSE: 0,
    TRUE: 1
};

export const COLORS = {
    WHITE: 0,
    BLACK: 1,
    BOTH: 2
};

export const PIECES = {
    EMPTY: 0,
    wP: 1,
    wN: 2,
    wB: 3,
    wR: 4,
    wQ: 5,
    wK: 6,
    bP: 7,
    bN: 8,
    bB: 9,
    bR: 10,
    bQ: 11,
    bK: 12
};

export const FILES = {
    FILE_A: 0,
    FILE_B: 1,
    FILE_C: 2,
    FILE_D: 3,
    FILE_E: 4,
    FILE_F: 5,
    FILE_G: 6,
    FILE_H: 7,
    FILE_NONE: 8
};

export const RANKS = {
    RANK_1: 0,
    RANK_2: 1,
    RANK_3: 2,
    RANK_4: 3,
    RANK_5: 4,
    RANK_6: 5,
    RANK_7: 6,
    RANK_8: 7,
    RANK_NONE: 8
};

export const SQUARES = {
    A1: 21,
    B1: 22,
    C1: 23,
    D1: 24,
    E1: 25,
    F1: 26,
    G1: 27,
    H1: 28,
    A8: 91,
    B8: 92,
    C8: 93,
    D8: 94,
    E8: 95,
    F8: 96,
    G8: 97,
    H8: 98,
    NOSQUARE: 99,
    OFFBOARD: 100
};

export const FILESBOARD = new Array(numberOfSquaresOnBoard);
export const RANKSBOARD = new Array(numberOfSquaresOnBoard);

export function fileRankToSquare(file, rank) {
    return ((21 + file) + (rank * 10));
}
