/* 
This file handles the surprisingly complicated PAWN movement. This includes 
the PAWN's special starting move, special diagonal taking move, ability to take 
en passant, ability to be taken en passant, and promoting upon reaching the 
other side of the board. Also contains the ever useful function isFriendlyPiece().
This Section of code could be cleaned up a little bit but right now everything is 
working perfectly so if it ain't broke don't fix it.
*/


import { Piece, TeamType } from '../constants'
import SuperPiece from '../superPiece'
import {PROMOTED_PIECE} from '../components/Promotion/promotion'
import {change_piece_count} from './stateReducer'


// Checks to see if a piece is in the way, this is different from other pieces
// since normally if an enemy piece is on the square you are moving to 
// the piece is captured, a pawn however, is blockaded.

function pawnIsBlockaded(x : number, y: number, boardState : Piece []): boolean {
    const piece = boardState.find(p => p.x === x && p.y === y) 
    const occupied =  piece ? true : false
    return occupied
}

// Returns true if the piece on square x, y belongs to the team

export function isFriendlyPiece(x : number, y: number, team : TeamType, boardState : Piece []): boolean {
    const piece = boardState.find(p => p.x === x && p.y === y)
    const occupied =  piece && piece.SuperPiece.team === team ? true : false
    return occupied
}
// Returns true if a pawn is moving 2 squares forward

export function isPawnStartingMove(px : number, py : number, x : number, y : number, 
                                    team : TeamType, boardState : Piece []):boolean{
    const startingRow = team === TeamType.WHITE ? 1 : 6
    const increment = team === TeamType.WHITE ? 1 : - 1
    if (((py === startingRow || py === startingRow - increment) && px === x) && (py === y - 2 * increment)){
        if (!pawnIsBlockaded(x, y, boardState) && !pawnIsBlockaded(x, y - increment, boardState)){
            return true
        }
    } return false
}
// Returns true if the the pawn can move from px, py to x, y this covers the case of capturing 
// diagonally.

export function isPawnNormalMove(px : number, py : number, x : number, y : number, 
                                team : TeamType, boardState : Piece []): boolean{
    const enemyTeam = team === TeamType.WHITE ? TeamType.BLACK : TeamType.WHITE
    const increment = team === TeamType.WHITE ? 1 : - 1
    if (py === y - increment && px === x){
        if (!pawnIsBlockaded(x, y, boardState)){
            return true;
        } 
    }
    if ((x === px + 1 || x === px -1) && (py === y - increment) && isFriendlyPiece(x, y, enemyTeam, boardState)) {
        return true
    } 
    return false 
} 

// Promotes a pawn to a QUEEN, ROOK, BISHOP, or NIGHT

export function promotePieces(boardState : Piece []){
    const promotedPiece = boardState.find(p => p.promoted === true)
    if (promotedPiece){
        const id = boardState.indexOf(promotedPiece)
        boardState[id] = {SuperPiece : new SuperPiece([PROMOTED_PIECE], promotedPiece.SuperPiece.team), 
                        x : promotedPiece.x,  y: promotedPiece.y, taken : false, promoted : false}
        change_piece_count(PROMOTED_PIECE, promotedPiece.SuperPiece.team)
    }
}