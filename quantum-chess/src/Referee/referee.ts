/*
This class does a lot of the heavy lifting for the chess game.  Currently 
the isValidMove also makes the move by changing the Piece [] as it checks for 
the moves validity.  This is because once the move has been made it must use 
the new board state to see if the move has put its own king in check which would 
actually make the move invalid.  So, if the move returns as invalid, the board 
state must be reset. 
*/


import { PieceType, TeamType, Piece, AXIS } from "../constants"
import { isPawnNormalMove, isPawnStartingMove} from "./pawnLogic"
import { isLegalBishopMove, isLegalRookMove, isLegalQueenMove, isLegalKingMove, isLegalNightMove} from "./pieceLogic"
import {CLICKED1} from '../components/Promotion/promotion'
import SuperPiece from "../superPiece"
import { CLICKED2 } from "../components/TakePiece/TakePiece"

export default class Referee{
    


    // promote(px: number, py: number, x : number, y: number, boardState : Piece []){
    //     const piece = boardState.find(p => p.x === px && p.y === py)
    //     if (piece && piece.type === PieceType.PAWN && piece.team === TeamType.WHITE && y === 7){
    //         piece.promoted = true
    //     }   
    //     else if (piece && piece.type === PieceType.PAWN && piece.team === TeamType.BLACK && y === 0){
    //         piece.promoted = true
    //     } else if (piece){
    //         piece.promoted = false
    //     }
    // } 

    getPossiblePieces(px : number, py : number, x : number, y : number, piece : SuperPiece, 
                boardState : Piece [],  activePlayer : TeamType) : PieceType [] {
        const possiblePieces : PieceType [] = []; 
        const CLICKED = CLICKED1 && CLICKED2
        if (!CLICKED){
            return possiblePieces
        }  
        // Only the active player can move
        if (piece.team !== activePlayer){
            return possiblePieces
        }
        // A non-move is not a move
        if (px === x && py === y){
            return possiblePieces
        }
        // A move off the board is not a move
        if (!(AXIS.includes(px) &&  AXIS.includes(py) &&  AXIS.includes(x) && AXIS.includes(y))){
            return possiblePieces
        }
        const dx = x - px
        const dy = y - py
        const team = piece.team ? piece.team : TeamType.WHITE
        piece.subPieces.forEach(p =>  {
            switch(p){
                case PieceType.PAWN : {
                    if (isPawnStartingMove(px, py, x, y, team, boardState)){
                        possiblePieces.push(PieceType.PAWN)
                    }
                    else if (isPawnNormalMove(px, py, x, y, team, boardState)){                          
                            possiblePieces.push(PieceType.PAWN)
                    }
                    break;
                }
                case PieceType.NIGHT : {
                    if (isLegalNightMove(px, py, dx, dy, team, boardState)){
                        possiblePieces.push(PieceType.NIGHT)
                    }
                    break;
                }
                case PieceType.BISHOP : {
                    if (isLegalBishopMove(px, py, dx, dy, team, boardState)){
                        possiblePieces.push(PieceType.BISHOP)
                    }
                    break;
                }
                case PieceType.ROOK : {
                    if (isLegalRookMove(px, py, dx, dy, team, boardState)){
                        possiblePieces.push(PieceType.ROOK)
                    }
                    break;
                }
                case PieceType.QUEEN : {
                    if (isLegalQueenMove(px, py, dx, dy, team, boardState)){
                        possiblePieces.push(PieceType.QUEEN)
                    }
                    break;
                }
                case PieceType.KING : {
                    if (isLegalKingMove(px, py, dx, dy, team, boardState)){
                        possiblePieces.push(PieceType.KING)
                    }
                    break;
                }

            }
        })
    return possiblePieces
    }
}