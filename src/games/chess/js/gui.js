import { pieceIndex, GameBoard, PrintBoard, ParseFen, SqAttacked } from './board';
import { BOOL, COLORS, PIECES, SQUARES, FilesBrd, RanksBrd, FR2SQ, SQ120 } from './constants';
import { NOMOVE, PieceCol, FROMSQ, TOSQ, MFLAGEP, MFLAGCA, CAPTURED, PROMOTED, Kings, UserMove, SideChar, PceChar, MAXDEPTH, GameController } from './constants';
import {
    PrSq,
    ParseMove
} from './io';
import { MakeMove, TakeMove } from './makemove';
import $ from 'jquery';
import { GenerateMoves } from './movegen';
import {
    SearchController,
    SearchPosition
} from './search';

export function newGame(fenStr) {
    ParseFen(fenStr);
    PrintBoard();
    SetInitialBoardPieces();
    CheckAndSet();
}

export function ClearAllPieces() {
    $('.Piece').remove();
}

export function SetInitialBoardPieces() {

    let sq;
    let sq120;
    let pce;

    ClearAllPieces();

    for (sq = 0; sq < 64; ++sq) {
        sq120 = SQ120(sq);
        pce = GameBoard.pieces[sq120];
        if (pce >= PIECES.wP && pce <= PIECES.bK) {
            AddGUIPiece(sq120, pce);
        }
    }
}

export function DeSelectSq(sq) {
    $('.Square').each(function() {
        if (PieceIsOnSq(sq, $(this).position().top, $(this).position().left) === BOOL.TRUE) {
            $(this).removeClass('SqSelected');
        }
    });
}

export function SetSqSelected(sq) {
    $('.Square').each(function() {
        if (PieceIsOnSq(sq, $(this).position().top, $(this).position().left) === BOOL.TRUE) {
            $(this).addClass('SqSelected');
        }
    });
}

export function clickedSquare(pageX, pageY) {
    console.log('clickedSquare() at ' + pageX + ',' + pageY);
    const position = $('#Board').position();

    const workedX = Math.floor(position.left);
    const workedY = Math.floor(position.top);

    pageX = Math.floor(pageX);
    pageY = Math.floor(pageY);

    const file = Math.floor((pageX - workedX) / 60);
    const rank = 7 - Math.floor((pageY - workedY) / 60);

    const sq = FR2SQ(file,rank);

    console.log('Clicked sq:' + PrSq(sq));

    SetSqSelected(sq);

    return sq;
}

export function makeUserMove() {

    if (UserMove.from !== SQUARES.NO_SQ && UserMove.to !== SQUARES.NO_SQ) {

        console.log('User Move:' + PrSq(UserMove.from) + PrSq(UserMove.to));

        const parsed = ParseMove(UserMove.from,UserMove.to);

        if (parsed !== NOMOVE) {
            MakeMove(parsed);
            PrintBoard();
            MoveGUIPiece(parsed);
            CheckAndSet();
            PreSearch();
        }

        DeSelectSq(UserMove.from);
        DeSelectSq(UserMove.to);

        UserMove.from = SQUARES.NO_SQ;
        UserMove.to = SQUARES.NO_SQ;
    }

}

export function PieceIsOnSq(sq, top, left) {

    if ((RanksBrd[sq] === 7 - Math.round(top / 60)) &&
        FilesBrd[sq] === Math.round(left / 60)) {
        return BOOL.TRUE;
    }

    return BOOL.FALSE;

}

export function RemoveGUIPiece(sq) {

    $('.Piece').each(function() {
        if (PieceIsOnSq(sq, $(this).position().top, $(this).position().left) === BOOL.TRUE) {
            $(this).remove();
        }
    });

}

export function AddGUIPiece(sq, pce) {

    const file = FilesBrd[sq];
    const rank = RanksBrd[sq];
    const rankName = 'rank' + (rank + 1);
    const fileName = 'file' + (file + 1);
    const pieceFileName = '/images/' + SideChar[PieceCol[pce]] + PceChar[pce].toUpperCase() + '.png';
    const imageString = '<image src="' + pieceFileName + '" class="Piece ' + rankName + ' ' + fileName + '"/>';
    $('#Board').append(imageString);
}

export function MoveGUIPiece(move) {

    const from = FROMSQ(move);
    const to = TOSQ(move);

    if (move & MFLAGEP) {
        let epRemove;
        if (GameBoard.side === COLORS.BLACK) {
            epRemove = to - 10;
        } else {
            epRemove = to + 10;
        }
        RemoveGUIPiece(epRemove);
    } else if (CAPTURED(move)) {
        RemoveGUIPiece(to);
    }

    const file = FilesBrd[to];
    const rank = RanksBrd[to];
    const rankName = 'rank' + (rank + 1);
    const fileName = 'file' + (file + 1);

    $('.Piece').each(function() {
        if (PieceIsOnSq(from, $(this).position().top, $(this).position().left) === BOOL.TRUE) {
            $(this).removeClass();
            $(this).addClass('Piece ' + rankName + ' ' + fileName);
        }
    });

    if (move & MFLAGCA) {
        switch (to) {
        case SQUARES.G1: RemoveGUIPiece(SQUARES.H1); AddGUIPiece(SQUARES.F1, PIECES.wR); break;
        case SQUARES.C1: RemoveGUIPiece(SQUARES.A1); AddGUIPiece(SQUARES.D1, PIECES.wR); break;
        case SQUARES.G8: RemoveGUIPiece(SQUARES.H8); AddGUIPiece(SQUARES.F8, PIECES.bR); break;
        case SQUARES.C8: RemoveGUIPiece(SQUARES.A8); AddGUIPiece(SQUARES.D8, PIECES.bR); break;
        default: break;
        }
    } else if (PROMOTED(move)) {
        RemoveGUIPiece(to);
        AddGUIPiece(to, PROMOTED(move));
    }

}

export function DrawMaterial() {

    if (GameBoard.pceNum[PIECES.wP] !== 0 || GameBoard.pceNum[PIECES.bP] !== 0) return BOOL.FALSE;
    if (GameBoard.pceNum[PIECES.wQ] !== 0 || GameBoard.pceNum[PIECES.bQ] !== 0 ||
                    GameBoard.pceNum[PIECES.wR] !== 0 || GameBoard.pceNum[PIECES.bR] !== 0) return BOOL.FALSE;
    if (GameBoard.pceNum[PIECES.wB] > 1 || GameBoard.pceNum[PIECES.bB] > 1) {
        return BOOL.FALSE;
    }
    if (GameBoard.pceNum[PIECES.wN] > 1 || GameBoard.pceNum[PIECES.bN] > 1) {
        return BOOL.FALSE;
    }

    if (GameBoard.pceNum[PIECES.wN] !== 0 && GameBoard.pceNum[PIECES.wB] !== 0) {
        return BOOL.FALSE;
    }
    if (GameBoard.pceNum[PIECES.bN] !== 0 && GameBoard.pceNum[PIECES.bB] !== 0) {
        return BOOL.FALSE;
    }

    return BOOL.TRUE;
}

export function ThreeFoldRep() {
    let i = 0, r = 0;

    for (i = 0; i < GameBoard.hisPly; ++i) {
        if (GameBoard.history[i].posKey === GameBoard.posKey) {
            r++;
        }
    }
    return r;
}

export function CheckResult() {
    if (GameBoard.fiftyMove >= 100) {
        $('#GameStatus').text('GAME DRAWN {fifty move rule}');
        return BOOL.TRUE;
    }

    if (ThreeFoldRep() >= 2) {
        $('#GameStatus').text('GAME DRAWN {3-fold repetition}');
        return BOOL.TRUE;
    }

    if (DrawMaterial() === BOOL.TRUE) {
        $('#GameStatus').text('GAME DRAWN {insufficient material to mate}');
        return BOOL.TRUE;
    }

    GenerateMoves();

    let MoveNum = 0;
    let found = 0;

    for (MoveNum = GameBoard.moveListStart[GameBoard.ply]; MoveNum < GameBoard.moveListStart[GameBoard.ply + 1]; ++MoveNum) {

        if (MakeMove(GameBoard.moveList[MoveNum]) === BOOL.FALSE) {
            continue;
        }
        found++;
        TakeMove();
        break;
    }

    if (found !== 0) return BOOL.FALSE;

    const InCheck = SqAttacked(GameBoard.pList[pieceIndex(Kings[GameBoard.side],0)], GameBoard.side ^ 1);

    if (InCheck === BOOL.TRUE) {
        if (GameBoard.side === COLORS.WHITE) {
            $('#GameStatus').text('GAME OVER {black mates}');
            return BOOL.TRUE;
        } else {
            $('#GameStatus').text('GAME OVER {white mates}');
            return BOOL.TRUE;
        }
    } else {
        $('#GameStatus').text('GAME DRAWN {stalemate}');return BOOL.TRUE;
    }

    return BOOL.FALSE;
}

export function CheckAndSet() {
    if (CheckResult() === BOOL.TRUE) {
        GameController.GameOver = BOOL.TRUE;
    } else {
        GameController.GameOver = BOOL.FALSE;
        $('#GameStatus').text('');
    }
}

export function PreSearch() {
    if (GameController.GameOver === BOOL.FALSE) {
        SearchController.thinking = BOOL.TRUE;
        setTimeout(function() {
            StartSearch();
        }, 200);
    }
}

export function StartSearch() {

    SearchController.depth = MAXDEPTH;
    const tt = $('#ThinkTimeChoice').val();

    SearchController.time = parseInt(tt) * 1000;
    SearchPosition();

    MakeMove(SearchController.best);
    MoveGUIPiece(SearchController.best);
    CheckAndSet();
}

// module.exports = {
//     newGame,
//     ClearAllPieces,
//     SetInitialBoardPieces,
//     DeSelectSq,
//     SetSqSelected,
//     clickedSquare,
//     makeUserMove,
//     PieceIsOnSq,
//     RemoveGUIPiece,
//     AddGUIPiece,
//     MoveGUIPiece,
//     DrawMaterial,
//     ThreeFoldRep,
//     CheckResult,
//     CheckAndSet,
//     PreSearch,
//     StartSearch
// };
