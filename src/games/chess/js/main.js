import { GameBoard } from './board';
import { FILES, RANKS, SQUARES, numOfBoardSquares, FilesBrd, RanksBrd, fileRankToSquare, rand32, PieceKeys, CastleKeys, Sq120ToSq64, Sq64ToSq120, MAXGAMEMOVES, noMove, PVENTRIES } from './constants';
import $ from 'jquery';

function initFilesRanksBrd() {
    let index = 0;
    let file = FILES.FILE_A;
    let rank = RANKS.RANK_1;
    let sq = SQUARES.A1;

    for (index = 0; index < numOfBoardSquares; ++index) {
        FilesBrd[index] = SQUARES.OFFBOARD;
        RanksBrd[index] = SQUARES.OFFBOARD;
    }

    for (rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
        for (file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
            sq = fileRankToSquare(file,rank);
            FilesBrd[sq] = file;
            RanksBrd[sq] = rank;
        }
    }
}

function initHashKeys() {
    let index = 0;

    for (index = 0; index < 14 * 120; ++index) {
        PieceKeys[index] = rand32();
    }

    for (index = 0; index < 16; ++index) {
        CastleKeys[index] = rand32();
    }
}

function initSq120To64() {
    let index = 0;
    let file = FILES.FILE_A;
    let rank = RANKS.RANK_1;
    let sq = SQUARES.A1;
    let sq64 = 0;

    for (index = 0; index < numOfBoardSquares; ++index) {
        Sq120ToSq64[index] = 65;
    }

    for (index = 0; index < 64; ++index) {
        Sq64ToSq120[index] = 120;
    }

    for (rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
        for (file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
            sq = fileRankToSquare(file,rank);
            Sq64ToSq120[sq64] = sq;
            Sq120ToSq64[sq] = sq64;
            sq64++;
        }
    }

}

function initBoardVars() {
    let index = 0;
    for (index = 0; index < MAXGAMEMOVES; ++index) {
        GameBoard.history.push({
            move : noMove,
            castlePerm : 0,
            enPas : 0,
            fiftyMove : 0,
            posKey : 0
        });
    }

    for (index = 0; index < PVENTRIES; ++index) {
        GameBoard.PvTable.push({
            move : noMove,
            posKey : 0
        });
    }
}

function initBoardSquares() {
    let light = 1;
    let rankName;
    let fileName;
    let rankIter;
    let fileIter;
    let divString;
    let lightString;

    for (rankIter = RANKS.RANK_8; rankIter >= RANKS.RANK_1; rankIter--) {
        light ^= 1;
        rankName = 'rank' + (rankIter + 1);

        for (fileIter = FILES.FILE_A; fileIter <= FILES.FILE_H; fileIter++) {
            fileName = 'file' + (fileIter + 1);
            lightString = light === 0 ? 'Light' : 'Dark';
            light ^= 1;
            divString = `<div class="Square ${ rankName } ${ fileName } ${ lightString }">`;
            $('#Board').append(divString);
        }
    }
}

export {
    initFilesRanksBrd,
    initHashKeys,
    initSq120To64,
    initBoardVars,
    initBoardSquares
};
