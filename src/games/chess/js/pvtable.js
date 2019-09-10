import { GameBoard } from './board';
import { NOMOVE, PVENTRIES, BOOL } from './constants';
import { MoveExists } from './movegen';
import { MakeMove, TakeMove } from './makemove';

export function GetPvLine(depth) {

    let move = ProbePvTable();
    let count = 0;

    while (move !== NOMOVE && count < depth) {

        if (MoveExists(move) === BOOL.TRUE) {
            MakeMove(move);
            GameBoard.PvArray[count++] = move;
        } else {
            break;
        }
        move = ProbePvTable();
    }

    while (GameBoard.ply > 0) {
        TakeMove();
    }

    return count;

}

export function ProbePvTable() {
    const index = GameBoard.posKey % PVENTRIES;

    if (GameBoard.PvTable[index].posKey === GameBoard.posKey) {
        return GameBoard.PvTable[index].move;
    }

    return NOMOVE;
}

export function StorePvMove(move) {
    const index = GameBoard.posKey % PVENTRIES;
    GameBoard.PvTable[index].posKey = GameBoard.posKey;
    GameBoard.PvTable[index].move = move;
}

// module.exports = {
//     GetPvLine,
//     ProbePvTable,
//     StorePvMove
// };
