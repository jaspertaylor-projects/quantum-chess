/*
This is the file where we detrmine whether Kings are in check or checkmate.  It
is important to remember that the isCheckMate function works by checking to see
if there are any legal moves for a piece and returns true if there are no moves
sometimes this can be stale mate so it must be used in conjunction with 
isMyKingInCheck to fully determine the outcome of the game.

*/


import { PieceType, TeamType, Piece} from "../constants"
import { isLegalBishopMove, isLegalRookMove, isLegalQueenMove, isLegalKingMove, isLegalNightMove, isWH, isWD} from "./pieceLogic"
import { isPawnNormalMove } from "./pawnLogic"
import { CLICKED1 } from '../components/Promotion/promotion'
import { CLICKED2 } from '../components/TakePiece/TakePiece'
import Referee from './referee'
import { AXIS } from '../constants'
import { fakeMove } from "./executeMove"

export default class Checker {   
    oldBoardState : Piece [] | null;

    constructor (boardState: Piece [] | null){
        this.oldBoardState = boardState
    }

    // Makes a copy of the board state so that way we can make 'hypothetical'
    // moves and then do a 'take back'.
    deepCopy(boardState : Piece []) {
        if (this.oldBoardState){
            for (let i = 0; i < this.oldBoardState.length; i ++){
                const p = this.oldBoardState[i]
                boardState[i] = {SuperPiece : p.SuperPiece, x : p.x, y : p.y, taken : false, promoted : false}
            }
        }
    } 
    removeKing(p : Piece){
        if (p.SuperPiece.subPieces.includes(PieceType.KING)){
            p.SuperPiece.subPieces.splice(0, 1)
        }
    }

    removeKingsInCheck(boardState : Piece [], team : TeamType){
        const ref = new Referee()
        const enemyTeam = team === TeamType.WHITE ? TeamType.BLACK : TeamType.WHITE
        for (let i = 0; i < boardState.length; i++){
            const enemyPiece = boardState[i];
            if (enemyPiece.SuperPiece.team === enemyTeam){
                for (let j = 0; j < boardState.length; j++){
                    const ourPiece = boardState[j];
                    if (ourPiece.SuperPiece.team === team && ourPiece.SuperPiece.subPieces.length > 1){
                        const piecesThatCanTakeMyKing = ref.getPossiblePieces(enemyPiece.x, enemyPiece.y, ourPiece.x, 
                                                                            ourPiece.y, enemyPiece.SuperPiece, boardState,  
                                                                            enemyTeam)
                        if (piecesThatCanTakeMyKing.length > 0){
                            this.removeKing(ourPiece)
                        }
                    }

                }
            } 
        }
    }
    // Returns true if your team has a king in check.  The increment should usually be set to 0 
    // but exists for checking the no castling through check rule 
    isMyKingInCheck(team : TeamType, boardState : Piece []) : boolean {
        const ref = new Referee()
        const enemyTeam = team === TeamType.WHITE ? TeamType.BLACK : TeamType.WHITE
        const myKing = boardState.find(p => p.SuperPiece.team === team 
                                        && p.SuperPiece.subPieces.length === 1
                                        && p.SuperPiece.subPieces[0] === PieceType.KING) 
        if (myKing){ 
            for (let i = 0; i < boardState.length; i++){
                const p = boardState[i];
                if (p.SuperPiece.team === enemyTeam) {
                    const piecesThatCanTakeMyKing = ref.getPossiblePieces(p.x, p.y, myKing.x, myKing.y, p.SuperPiece, boardState,  enemyTeam)
                    if (piecesThatCanTakeMyKing.length > 0){
                        return true
                    }
                }
            }
        }
        return false    
        }


    //Returns true if the enemy team has no legal moves
    isCheckMate(team : TeamType, boardState : Piece []): boolean{
        const CLICKED = CLICKED1 && CLICKED2
        const ref = new Referee()
        const enemyTeam = team === TeamType.WHITE ? TeamType.BLACK : TeamType.WHITE
        for (let j = AXIS.length - 1; j >= 0; j-- ){
            for (let i = 0; i < AXIS.length; i++ ) {
                for (let k = 0; k < boardState.length; k ++ ){
                    const p = boardState[k] 
                    if (p.SuperPiece.team === enemyTeam)  {               
                        const legalMove = ref.getPossiblePieces(p.x, p.y, i, j,  p.SuperPiece, boardState, enemyTeam)
                        if (legalMove.length > 0|| !CLICKED){
                            fakeMove(p.x, p.y, i, j,  legalMove, enemyTeam, boardState)
                            const inCheck = this.isMyKingInCheck(enemyTeam, boardState)
                            this.deepCopy(boardState)
                            if (!inCheck){
                                return false   
                            }                   
                        } 
                    }
                }
            
            }
        }        
        return true

    }

}