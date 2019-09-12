import { pieceIndex, GameBoard, printBoard, parseFen, squareAttacked } from './board';
import { BOOL, COLORS, PIECES, SQUARES, FilesBrd, RanksBrd, fileRankToSquare, doSq120 } from './constants';
import { noMove, pieceColor, fromSquare, toSquare, MFLAGEP, MFLAGCA, captured, promoted, Kings, UserMove, sideChar, pceChar, MAXDEPTH, GameController } from './constants';
import { printSquare, parseMove } from './io';
import { makeMove, takeMove } from './makemove';
import $ from 'jquery';
import { generateMoves } from './movegen';
import { SearchController, searchPosition } from './search';

function newGame(fenStr) {
    parseFen(fenStr);
    printBoard();
    setInitialBoardPieces();
    checkAndSet();
}

function clearAllPieces() {
    $('.Piece').remove();
}

function setInitialBoardPieces() {

    let sq;
    let sq120;
    let pce;

    clearAllPieces();

    for (sq = 0; sq < 64; ++sq) {
        sq120 = doSq120(sq);
        pce = GameBoard.pieces[sq120];
        if (pce >= PIECES.wP && pce <= PIECES.bK) {
            addGuiPiece(sq120, pce);
        }
    }
}

function deselectSquare(sq) {
    $('.Square').each(function() {
        if (pieceIsOnSquare(sq, $(this).position().top, $(this).position().left) === BOOL.TRUE) {
            $(this).removeClass('SqSelected');
        }
    });
}

function setSqSelected(sq) {
    $('.Square').each(function() {
        if (pieceIsOnSquare(sq, $(this).position().top, $(this).position().left) === BOOL.TRUE) {
            $(this).addClass('SqSelected');
        }
    });
}

function clickedSquare(pageX, pageY) {
    console.log('clickedSquare() at ' + pageX + ',' + pageY);
    const position = $('#Board').position();

    const workedX = Math.floor(position.left);
    const workedY = Math.floor(position.top);

    pageX = Math.floor(pageX);
    pageY = Math.floor(pageY);

    const file = Math.floor((pageX - workedX) / 60);
    const rank = 7 - Math.floor((pageY - workedY) / 60);

    const sq = fileRankToSquare(file,rank);

    console.log('Clicked sq:' + printSquare(sq));

    setSqSelected(sq);

    return sq;
}

function makeUserMove() {

    if (UserMove.from !== SQUARES.NO_SQ && UserMove.to !== SQUARES.NO_SQ) {

        console.log('User Move:' + printSquare(UserMove.from) + printSquare(UserMove.to));

        const parsed = parseMove(UserMove.from,UserMove.to);

        if (parsed !== noMove) {
            makeMove(parsed);
            printBoard();
            moveGuiPiece(parsed);
            checkAndSet();
            preSearch();
        }

        deselectSquare(UserMove.from);
        deselectSquare(UserMove.to);

        UserMove.from = SQUARES.NO_SQ;
        UserMove.to = SQUARES.NO_SQ;
    }

}

function pieceIsOnSquare(sq, top, left) {

    if ((RanksBrd[sq] === 7 - Math.round(top / 60)) &&
        FilesBrd[sq] === Math.round(left / 60)) {
        return BOOL.TRUE;
    }

    return BOOL.FALSE;

}

function removeGuiPiece(sq) {

    $('.Piece').each(function() {
        if (pieceIsOnSquare(sq, $(this).position().top, $(this).position().left) === BOOL.TRUE) {
            $(this).remove();
        }
    });

}

function addGuiPiece(sq, pce) {
    const file = FilesBrd[sq];
    const rank = RanksBrd[sq];
    const rankName = 'rank' + (rank + 1);
    const fileName = 'file' + (file + 1);
    const pieceFileName = '/images/' + sideChar[pieceColor[pce]] + pceChar[pce].toUpperCase() + '.png';
    const imageString = '<image src="' + pieceFileName + '" class="Piece ' + rankName + ' ' + fileName + '"/>';
    $('#Board').append(imageString);
}

function moveGuiPiece(move) {

    const from = fromSquare(move);
    const to = toSquare(move);

    if (move & MFLAGEP) {
        let epRemove;
        if (GameBoard.side === COLORS.BLACK) {
            epRemove = to - 10;
        } else {
            epRemove = to + 10;
        }
        removeGuiPiece(epRemove);
    } else if (captured(move)) {
        removeGuiPiece(to);
    }

    const file = FilesBrd[to];
    const rank = RanksBrd[to];
    const rankName = 'rank' + (rank + 1);
    const fileName = 'file' + (file + 1);

    $('.Piece').each(function() {
        if (pieceIsOnSquare(from, $(this).position().top, $(this).position().left) === BOOL.TRUE) {
            $(this).removeClass();
            $(this).addClass('Piece ' + rankName + ' ' + fileName);
        }
    });

    if (move & MFLAGCA) {
        switch (to) {
        case SQUARES.G1: removeGuiPiece(SQUARES.H1); addGuiPiece(SQUARES.F1, PIECES.wR); break;
        case SQUARES.C1: removeGuiPiece(SQUARES.A1); addGuiPiece(SQUARES.D1, PIECES.wR); break;
        case SQUARES.G8: removeGuiPiece(SQUARES.H8); addGuiPiece(SQUARES.F8, PIECES.bR); break;
        case SQUARES.C8: removeGuiPiece(SQUARES.A8); addGuiPiece(SQUARES.D8, PIECES.bR); break;
        default: break;
        }
    } else if (promoted(move)) {
        removeGuiPiece(to);
        addGuiPiece(to, promoted(move));
    }

}

function drawMaterial() {

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

function threeFoldRep() {
    let i = 0, r = 0;

    for (i = 0; i < GameBoard.hisPly; ++i) {
        if (GameBoard.history[i].posKey === GameBoard.posKey) {
            r++;
        }
    }
    return r;
}

function checkResult() {
    if (GameBoard.fiftyMove >= 100) {
        $('#GameStatus').text('GAME DRAWN {fifty move rule}');
        return BOOL.TRUE;
    }

    if (threeFoldRep() >= 2) {
        $('#GameStatus').text('GAME DRAWN {3-fold repetition}');
        return BOOL.TRUE;
    }

    if (drawMaterial() === BOOL.TRUE) {
        $('#GameStatus').text('GAME DRAWN {insufficient material to mate}');
        return BOOL.TRUE;
    }

    generateMoves();

    let MoveNum = 0;
    let found = 0;

    for (MoveNum = GameBoard.moveListStart[GameBoard.ply]; MoveNum < GameBoard.moveListStart[GameBoard.ply + 1]; ++MoveNum) {

        if (makeMove(GameBoard.moveList[MoveNum]) === BOOL.FALSE) {
            continue;
        }
        found++;
        takeMove();
        break;
    }

    if (found !== 0) return BOOL.FALSE;

    const InCheck = squareAttacked(GameBoard.pList[pieceIndex(Kings[GameBoard.side],0)], GameBoard.side ^ 1);

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
}

function checkAndSet() {
    if (checkResult() === BOOL.TRUE) {
        GameController.GameOver = BOOL.TRUE;
    } else {
        GameController.GameOver = BOOL.FALSE;
        $('#GameStatus').text('');
    }
}

function preSearch() {
    if (GameController.GameOver === BOOL.FALSE) {
        SearchController.thinking = BOOL.TRUE;
        setTimeout(function() {
            startSearch();
        }, 200);
    }
}

function startSearch() {

    SearchController.depth = MAXDEPTH;
    const tt = $('#ThinkTimeChoice').val();

    SearchController.time = parseInt(tt) * 1000;
    searchPosition();

    makeMove(SearchController.best);
    moveGuiPiece(SearchController.best);
    checkAndSet();
}

export {
    newGame,
    clearAllPieces,
    setInitialBoardPieces,
    deselectSquare,
    setSqSelected,
    clickedSquare,
    makeUserMove,
    pieceIsOnSquare,
    removeGuiPiece,
    addGuiPiece,
    moveGuiPiece,
    drawMaterial,
    threeFoldRep,
    checkResult,
    checkAndSet,
    preSearch,
    startSearch
};
