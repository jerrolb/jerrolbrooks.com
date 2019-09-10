import { FileChar, FilesBrd, RankChar, RanksBrd, FROMSQ, TOSQ, PROMOTED, PieceKnight } from './constants';
import { BOOL, COLORS, PIECES, NOMOVE, PieceRookQueen, PieceBishopQueen } from './constants';
import { GenerateMoves } from './movegen';
import { GameBoard } from './board';
import { MakeMove, TakeMove } from './makemove';

export function PrSq(sq) {
    return (FileChar[FilesBrd[sq]] + RankChar[RanksBrd[sq]]);
}

export function PrMove(move) {
    let MvStr;

    const ff = FilesBrd[FROMSQ(move)];
    const rf = RanksBrd[FROMSQ(move)];
    const ft = FilesBrd[TOSQ(move)];
    const rt = RanksBrd[TOSQ(move)];

    MvStr = FileChar[ff] + RankChar[rf] + FileChar[ft] + RankChar[rt];

    const promoted = PROMOTED(move);

    if (promoted !== PIECES.EMPTY) {
        let pchar = 'q';
        if (PieceKnight[promoted] === BOOL.TRUE) {
            pchar = 'n';
        } else if (PieceRookQueen[promoted] === BOOL.TRUE && PieceBishopQueen[promoted] === BOOL.FALSE) {
            pchar = 'r';
        } else if (PieceRookQueen[promoted] === BOOL.FALSE && PieceBishopQueen[promoted] === BOOL.TRUE) {
            pchar = 'b';
        }
        MvStr += pchar;
    }
    return MvStr;
}

export function PrintMoveList() {

    let index;
    let move;
    let num = 1;
    console.log('MoveList:');

    for (index = GameBoard.moveListStart[GameBoard.ply]; index < GameBoard.moveListStart[GameBoard.ply + 1]; ++index) {
        move = GameBoard.moveList[index];
        console.log('IMove:' + num + ':(' + index + '):' + PrMove(move) + ' Score:' + GameBoard.moveScores[index]);
        num++;
    }
    console.log('End MoveList');
}

export function ParseMove(from, to) {

    GenerateMoves();

    let Move = NOMOVE;
    let PromPce = PIECES.EMPTY;
    let found = BOOL.FALSE;

    for (let index = GameBoard.moveListStart[GameBoard.ply];
        index < GameBoard.moveListStart[GameBoard.ply + 1]; ++index) {
        Move = GameBoard.moveList[index];
        if (FROMSQ(Move) === from && TOSQ(Move) === to) {
            PromPce = PROMOTED(Move);
            if (PromPce !== PIECES.EMPTY) {
                if ((PromPce === PIECES.wQ && GameBoard.side === COLORS.WHITE) ||
                    (PromPce === PIECES.bQ && GameBoard.side === COLORS.BLACK)) {
                    found = BOOL.TRUE;
                    break;
                }
                continue;
            }
            found = BOOL.TRUE;
            break;
        }
    }

    if (found !== BOOL.FALSE) {
        if (MakeMove(Move) === BOOL.FALSE) {
            return NOMOVE;
        }
        TakeMove();
        return Move;
    }

    return NOMOVE;
}

// module.exports = {
//     PrSq,
//     PrMove,
//     PrintMoveList,
//     ParseMove
// };

