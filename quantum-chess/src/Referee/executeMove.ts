/*
This function updates the Piece [] so that the piece moves to its new location. It
also handles the case where a piece is taken and when a ROOK is teleported via 
the castling move.
*/

import { Piece, PieceType, TeamType } from '../constants'
import SuperPiece from '../superPiece'
import Checker from './checker'

export let TAKEN_PIECE : Piece | null = null


export function setTAKEN(piece : Piece | null){
    TAKEN_PIECE = piece
}


export function canExecuteMove (px : number, py : number, x : number, y: number, possiblePieces : PieceType [], 
                                activePlayer : TeamType, boardState : Piece []) : boolean{
        const checker = new Checker(null);
        fakeMove(px, py, x, y, possiblePieces, activePlayer, boardState)
        const inCheck = checker.isMyKingInCheck(activePlayer, boardState)
        if (inCheck){
            return false
        }
        return true                                
    }

export function executeMove (px : number, py : number, x : number, y: number,
                            possiblePieces : PieceType [], activePlayer : TeamType, boardState : Piece []) {
    const takenPiece = boardState.find(p => p.x === x && p.y === y && p.SuperPiece.team !== activePlayer)
    if (takenPiece){
        TAKEN_PIECE = takenPiece
        takePiece(takenPiece, boardState)
    } else {
        TAKEN_PIECE = null
    }
    const currentPiece = boardState.find(p => p.x === px && p.y === py) 
    if (currentPiece){
        const id = boardState.indexOf(currentPiece)
        boardState[id] = {SuperPiece : new SuperPiece(possiblePieces, activePlayer), x, y}    
    }
    promote(boardState)
}

export function fakeMove (px : number, py : number, x : number, y: number,
    possiblePieces : PieceType [], activePlayer : TeamType, boardState : Piece []) {
    const takenPiece = boardState.find(p => p.x === x && p.y === y && p.SuperPiece.team !== activePlayer)
    if (takenPiece){
        takePiece(takenPiece, boardState)
    } 
    const currentPiece = boardState.find(p => p.x === px && p.y === py) 
    if (currentPiece){
        const id = boardState.indexOf(currentPiece)
        boardState[id] = {SuperPiece : new SuperPiece(possiblePieces, activePlayer), x, y}    
    }
}



export function promote(boardState : Piece []){
    const promoted_white = boardState.find(p => p.SuperPiece.team === TeamType.WHITE && p.y === 7 &&
                                            p.SuperPiece.equals([PieceType.PAWN]))
    if(promoted_white){
            promoted_white.promoted = true
    }
    const promoted_black = boardState.find(p => p.SuperPiece.team === TeamType.BLACK && p.y === 0 &&
                            p.SuperPiece.equals([PieceType.PAWN]))
    if(promoted_black){
        promoted_black.promoted = true
    }
}

function takePiece(p : Piece, boardState : Piece []){
    const id = boardState.indexOf(p)
    boardState.splice(id, 1)
}
