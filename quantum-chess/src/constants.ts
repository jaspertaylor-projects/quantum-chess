import SuperPiece from "./superPiece";

export const HORIZONTAL_AXIS = ['a', 'b', 'c', 'd', 'e', 'f',   'g', 'h'];
export const VERTICAL_AXIS = [1,2,3,4,5,6,7,8];
export const AXIS = [0,1,2,3,4,5,6,7];
export const GRID_SIZE = 100


export interface Piece {
    SuperPiece : SuperPiece;
    x : number; 
    y : number; 
    taken? : boolean;
    promoted? : boolean;
}

export enum TeamType{
    WHITE,
    BLACK
}

export enum PieceType {
    PAWN = 'p',
    BISHOP = 'b', 
    NIGHT = 'n', 
    ROOK = 'r',
    QUEEN = 'q',
    KING = 'k',
    WIERD_XY = 'wxy',
    WIERD_D = 'wd',
    NO_PIECE = 'np',
}



export function initializeBoardState() : Piece []{
    const state : Piece[] = []
    for (let p = 0; p < 2; p ++){
        for (let i = 0; i < AXIS.length; i++){
            state.push({SuperPiece : new SuperPiece([PieceType.KING, PieceType.QUEEN, PieceType.ROOK, 
                                    PieceType.BISHOP, PieceType.NIGHT, PieceType.PAWN], TeamType.WHITE), x : i, y : 0 + p})
            state.push({SuperPiece : new SuperPiece([PieceType.KING, PieceType.QUEEN, PieceType.ROOK, 
                                    PieceType.BISHOP, PieceType.NIGHT, PieceType.PAWN], TeamType.BLACK), x : i, y : 6 + p})
        }
    }
    return state
}


export function index_converter(p : PieceType) : number{
    switch (p){
        case PieceType.QUEEN : {
            return 1;
        }
        case PieceType.ROOK : {
            return 2;
        }
        case PieceType.BISHOP : {
            return 3;
        }
        case PieceType.NIGHT : {
            return 4;
        }
        case PieceType.PAWN : {
            return 5;
        }
    }
    return -1
}