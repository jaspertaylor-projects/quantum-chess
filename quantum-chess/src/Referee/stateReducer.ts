
import { TAKEN_PIECES_BLACK, TAKEN_PIECES_WHITE } from "../components/TakePiece/TakePiece";
import { index_converter, Piece, PieceType, TeamType } from "../constants";


const all_pieces = [PieceType.KING, PieceType.QUEEN, PieceType.ROOK, PieceType.BISHOP, PieceType.NIGHT, PieceType.PAWN]


let whiteNumPiece : number [] = [1, 1, 2, 2, 2, 8]
let blackNumPiece : number [] = [1, 1, 2, 2, 2, 8]
let count : number = 0


export function change_piece_count(new_piece : PieceType, team : TeamType){
    const piece_index = index_converter(new_piece)
    if (team === TeamType.WHITE){
        whiteNumPiece[piece_index] ++
        whiteNumPiece[5] --
    }
    else{
        blackNumPiece[piece_index] ++
        blackNumPiece[5] --
    }


}


function uncollapsed(piece : PieceType, boardState : Piece [], team : TeamType) : number [] {
    let ids : number [] = []
    for(let i = 0; i < boardState.length; i ++){
        if (boardState[i].SuperPiece.subPieces.length > 1 &&
            boardState[i].SuperPiece.subPieces.includes(piece) &&
            boardState[i].SuperPiece.team === team){
            ids.push(i)
        }
    }
    return ids
}

function collapsed(piece : PieceType [], boardState : Piece [], team : TeamType) : number [] {
    let ids : number [] = []
    for(let i = 0; i < boardState.length; i ++){
        if ( boardState[i].SuperPiece.equals([...piece]) &&
            boardState[i].SuperPiece.team === team){
            ids.push(i)
        }
    }
    return ids
}

function remove(piece : PieceType [], boardState : Piece [], team : TeamType, ids : number []){
    for (let p = 0; p < piece.length; p++)
        for(let i = 0; i < boardState.length; i ++){
            if (!ids.includes(i) && 
                boardState[i].SuperPiece.subPieces.includes(piece[p]) && 
                boardState[i].SuperPiece.team === team){
                const id = boardState[i].SuperPiece.subPieces.indexOf(piece[p])
                boardState[i].SuperPiece.subPieces.splice(id, 1)
                count = count + 1
            }
        }
    }

function removeAll(piece : PieceType, boardState : Piece [], ids : number []){
    for (let i = 0; i < ids.length; i++){
        boardState[ids[i]].SuperPiece.subPieces = [piece]
        count = count + 1
    }
}




function inductive_collapse(boardState : Piece [], team : TeamType){
        const arr1 = team === TeamType.WHITE ? whiteNumPiece : blackNumPiece
        const arr2 = team === TeamType.WHITE ? TAKEN_PIECES_WHITE : TAKEN_PIECES_BLACK
        for (let i =  0; i < all_pieces.length; i++){
            const ids = uncollapsed(all_pieces[i], boardState, team)
            const ids2 = collapsed([all_pieces[i]], boardState, team)
            if (ids.length + ids2.length + arr2[i] === arr1[i]){
                removeAll(all_pieces[i], boardState, ids)               
            }
        }
    }

function first_level_collapse(boardState : Piece [], team : TeamType) {
    const arr1 = team === TeamType.WHITE ? whiteNumPiece : blackNumPiece
    const arr2 = team === TeamType.WHITE ? TAKEN_PIECES_WHITE : TAKEN_PIECES_BLACK
    for (let i =  0; i < all_pieces.length; i++){
        const ids = collapsed([all_pieces[i]], boardState, team)
        if (ids.length + arr2[i] === arr1[i]){
            remove([all_pieces[i]], boardState, team, ids)               
        }
    }
}

function second_level_collapse(boardState : Piece [], team : TeamType) {
    const arr1 = team === TeamType.WHITE ? whiteNumPiece : blackNumPiece
    const arr2 = team === TeamType.WHITE ? TAKEN_PIECES_WHITE : TAKEN_PIECES_BLACK
    for (let i =  0; i < all_pieces.length; i++){
        for(let j = i + 1; j < all_pieces.length; j ++){
            const piece_combo = [all_pieces[i], all_pieces[j]]
            const taken_sum =  arr2[i] + arr2[j]
            const ids = collapsed(piece_combo, boardState, team)
            if (ids.length + taken_sum === arr1[i] + arr1[j]){
                remove(piece_combo, boardState, team, ids)               
            }
        }
    }
}


function third_level_collapse(boardState : Piece [], team : TeamType) {
    const arr1 = team === TeamType.WHITE ? whiteNumPiece : blackNumPiece
    const arr2 = team === TeamType.WHITE ? TAKEN_PIECES_WHITE : TAKEN_PIECES_BLACK
    for (let i =  0; i < all_pieces.length; i++){
        for(let j = i + 1; j < all_pieces.length; j ++){
            for(let k = j + 1; k < all_pieces.length; k ++){
                const piece_combo = [all_pieces[i], all_pieces[j], all_pieces[k]]
                const taken_sum =  arr2[i] + arr2[j] + arr2[k] 
                const ids = collapsed(piece_combo, boardState, team)
                if (ids.length + taken_sum === arr1[i] + arr1[j] + arr1[k]){
                    remove(piece_combo, boardState, team, ids)               
                }
            }
        }
    }
}




function fourth_level_collapse(boardState : Piece [], team : TeamType) {
    const arr1 = team === TeamType.WHITE ? whiteNumPiece : blackNumPiece
    const arr2 = team === TeamType.WHITE ? TAKEN_PIECES_WHITE : TAKEN_PIECES_BLACK
    for (let i =  0; i < all_pieces.length; i++){
        for(let j = i + 1; j < all_pieces.length; j ++){
            for(let k = j + 1; k < all_pieces.length; k ++){
                for(let l = k + 1; l < all_pieces.length; l ++){
                    const piece_combo = [all_pieces[i], all_pieces[j], all_pieces[k], all_pieces[l]]
                    const taken_sum =  arr2[i] + arr2[j] + arr2[k] + arr2[l]
                    const ids = collapsed(piece_combo, boardState, team)
                    if (ids.length + taken_sum === arr1[i] + arr1[j] + arr1[k] + arr1[l]){
                        remove(piece_combo, boardState, team, ids)               
                    }
                }
            }
        }
    }
}

function fifth_level_collapse(boardState : Piece [], team : TeamType) {
    const arr1 = team === TeamType.WHITE ? whiteNumPiece : blackNumPiece
    const arr2 = team === TeamType.WHITE ? TAKEN_PIECES_WHITE : TAKEN_PIECES_BLACK
    for (let i =  0; i < all_pieces.length; i++){
        for(let j = i + 1; j < all_pieces.length; j ++){
            for(let k = j + 1; k < all_pieces.length; k ++){
                for(let l = k + 1; l < all_pieces.length; l ++){
                    for(let m = l + 1; l < all_pieces.length; l ++){
                        const piece_combo = [all_pieces[i], all_pieces[j], all_pieces[k], all_pieces[l], all_pieces[m]]
                        const taken_sum =  arr2[i] + arr2[j] + arr2[k] + arr2[l] + arr2[m]
                        const ids = collapsed(piece_combo, boardState, team)
                        if (ids.length + taken_sum === arr1[i] + arr1[j] + arr1[k] + arr1[l] + arr1[m]){
                            remove(piece_combo, boardState, team, ids)               
                        }
                    }
                }
            }
        }
    }
}



export function fullReduction(boardState : Piece []){
    let somethingChanged = true
    while (somethingChanged === true){
        inductive_collapse(boardState, TeamType.WHITE)
        inductive_collapse(boardState, TeamType.BLACK)
        first_level_collapse(boardState, TeamType.WHITE)
        first_level_collapse(boardState, TeamType.BLACK)
        second_level_collapse(boardState, TeamType.WHITE)
        second_level_collapse(boardState, TeamType.BLACK)
        third_level_collapse(boardState, TeamType.WHITE)
        third_level_collapse(boardState, TeamType.BLACK)
        fourth_level_collapse(boardState, TeamType.WHITE)
        fourth_level_collapse(boardState, TeamType.BLACK)
        fifth_level_collapse(boardState, TeamType.WHITE)
        fifth_level_collapse(boardState, TeamType.BLACK)
        somethingChanged = count !== 0
        count = 0
    }
}