/*
This file contains the movement logic for all non-PAWN pieces. Castling is 
considered a KING move, and money pieces must make sure that their path is 
not being blocked by any pieces in the way.
*/

import { Piece , TeamType} from '../constants'



function isFriendlyPiece(x : number, y: number, team : TeamType, boardState : Piece []): boolean {
    const piece = boardState.find(p => p.x === x && p.y === y)
    const occupied =  piece && piece.SuperPiece.team === team ? true : false
    return occupied
}



export function isLegalRookMove(px : number, py : number, dx : number, dy : number, team : TeamType, boardState : Piece[]) : boolean {
    if (dx === 0 || dy === 0){
        if (dx === 0){
            const y_dir = Math.sign(dy)
            for (let i = 1; i < Math.abs(dy); i ++){
                const obstructingPiece = boardState.find(p => p.x === px && p.y === py + i*y_dir) 
                if (obstructingPiece){
                    return false
                }
            } 
            if (!isFriendlyPiece(px + dx, py + dy, team, boardState)){
                return true
            }
        }
        if (dy === 0){
            const x_dir = Math.sign(dx)
            for (let i = 1; i < Math.abs(dx); i ++){
                const obstructingPiece = boardState.find(p => p.x === px + i*x_dir && p.y === py) 
                if (obstructingPiece){
                    return false
                }
            } 
            if (!isFriendlyPiece(px + dx, py + dy, team, boardState)){
                return true
            }
        }
    } 
    return false;
}



export function isLegalBishopMove(px : number, py : number, dx : number, dy : number, team : TeamType, boardState : Piece[]) : boolean{
    if (Math.abs(dx) === Math.abs(dy)){
        const x_dir = Math.sign(dx)
        const y_dir = Math.sign(dy)
        for (let i = 1; i < Math.abs(dx); i ++){
            const obstructingPiece = boardState.find(p => p.x === px + i*x_dir && p.y === py + i*y_dir) 
            if (obstructingPiece){
                return false
            }
        } 
        if (!isFriendlyPiece(px + dx, py + dy, team, boardState)){
            return true
        }
    } 
    return false
}
export function isLegalNightMove(px : number, py : number, dx : number, dy : number, team : TeamType, boardState : Piece[]) : boolean{
    if ((Math.abs(dx) === 1 && Math.abs(dy) === 2) || (Math.abs(dx) === 2 && Math.abs(dy) === 1)){
        if (!isFriendlyPiece(px + dx, py + dy, team, boardState)){
            return true
        }
    }
    return false
}
export function isLegalQueenMove(px : number, py : number, dx : number, dy : number, team : TeamType, boardState : Piece[]) : boolean{
    const legality = isLegalRookMove(px, py, dx, dy, team, boardState) || isLegalBishopMove(px, py, dx, dy, team, boardState)
    return legality && !isFriendlyPiece(px + dx, py + dy, team, boardState)
}


export function isLegalKingMove(px : number, py : number, dx : number, dy : number, team : TeamType, boardState : Piece[]) : boolean{
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2){
        if (!isFriendlyPiece(px + dx, py + dy, team, boardState)){
            return true
        }
    } 
    return false
}


export function isWH(px : number, py : number, dx : number, dy : number, team : TeamType, boardState : Piece[]) : boolean {
    return (isLegalRookMove(px, py, 1, 1, team, boardState) || isLegalRookMove(px, py, 1, -1, team , boardState) 
        || isLegalRookMove(px, py, -1, 1, team , boardState) || isLegalRookMove(px, py, -1, -1, team , boardState))
}

export function isWD(px : number, py : number, dx : number, dy : number, team : TeamType, boardState : Piece[]) : boolean {
    return (isLegalBishopMove(px, py, 1, 1, team, boardState) || isLegalBishopMove(px, py, 1, -1, team , boardState) 
        || isLegalBishopMove(px, py, -1, 1, team , boardState) || isLegalBishopMove(px, py, -1, -1, team , boardState))
}