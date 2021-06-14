import { PieceType, TeamType } from "./constants"

export default class SuperPiece{
    subPieces : PieceType [] = [];
    team : TeamType = TeamType.WHITE;
    checksLike : PieceType = PieceType.NO_PIECE;
    img_url : string = '';

    constructor (subPieces: PieceType [], team : TeamType){
        this.subPieces = subPieces 
        this.team = team
        this.setURL()
        this.setChecksLike()
    }

    setURL(){
            let url = ''
            const dir = this.team === TeamType.WHITE ? 'white_pieces': 'black_pieces';
            for (let i = 0; i < this.subPieces.length; i ++){
                url = url + this.subPieces[i]
                this.img_url = `assets/${dir}/${url}.png`
            }
    }

    equals(arr : PieceType []) : boolean{
        if (this.subPieces.length !== arr.length){
            return false
        }
        for (let i = 0; i < this.subPieces.length; i ++){
            if (this.subPieces[i] !== arr[i]){
                return false
            }
        } 
        return true
    }


    setChecksLike(){
        if (this.subPieces.length === 1){
            this.checksLike = this.subPieces[0]
        } 
        else if (this.equals([PieceType.BISHOP, PieceType.PAWN])){
            this.checksLike = PieceType.PAWN
        }
        else if (this.equals([ PieceType.QUEEN, PieceType.BISHOP, PieceType.PAWN])){
                this.checksLike = PieceType.PAWN
        }   
        else if (this.equals([PieceType.KING, PieceType.QUEEN, PieceType.BISHOP, PieceType.PAWN])){
            this.checksLike = PieceType.PAWN
        }
        else if (this.equals([PieceType.KING, PieceType.BISHOP, PieceType.PAWN])){
            this.checksLike = PieceType.PAWN
        } 
        else if (this.equals([PieceType.KING, PieceType.QUEEN])){
            this.checksLike = PieceType.KING
        } 
        else if (this.equals([PieceType.KING, PieceType.QUEEN, PieceType.ROOK])){
            this.checksLike = PieceType.WIERD_XY
        } 
        else if (this.equals([PieceType.KING, PieceType.ROOK])){
            this.checksLike = PieceType.WIERD_XY
        } 
        else if (this.equals([PieceType.QUEEN, PieceType.ROOK])){
            this.checksLike = PieceType.ROOK
        } 
        else if (this.equals([PieceType.QUEEN, PieceType.BISHOP])){
            this.checksLike = PieceType.BISHOP
        }  
        else if (this.equals([PieceType.KING, PieceType.QUEEN, PieceType.BISHOP])){
            this.checksLike = PieceType.WIERD_D
        }
        else if (this.equals([PieceType.KING, PieceType.BISHOP])){
            this.checksLike = PieceType.WIERD_D
        }
    }






}