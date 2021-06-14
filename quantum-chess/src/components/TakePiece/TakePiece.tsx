import './TakePiece.css'
import { TeamType, Piece, PieceType, HORIZONTAL_AXIS, VERTICAL_AXIS } from '../../constants'
import { useState, useEffect } from 'react';
import CapturedPieces from './CapturedPieces'
import {index_converter} from '../../constants'

interface Props {
    piece : Piece | null;
}

export let TAKEN_PIECES_BLACK = [0, 0, 0, 0, 0, 0]
export let TAKEN_PIECES_WHITE = [0, 0, 0, 0, 0, 0]
export let CLICKED2 = true


function select_piece(index : number, piece : Piece | null){
    let PIECE_HAS_BEEN_TAKEN = false;
    if (piece && !PIECE_HAS_BEEN_TAKEN){
        if (piece.SuperPiece.team === TeamType.WHITE){
            TAKEN_PIECES_WHITE[index] ++ 
        }
        if (piece.SuperPiece.team === TeamType.BLACK){
            TAKEN_PIECES_BLACK[index] ++         
        }
    }
    PIECE_HAS_BEEN_TAKEN = true
}



function checkSinglePiece(piece : Piece | null) : boolean{
    if (piece){
        if (piece.SuperPiece.subPieces.includes(PieceType.KING)){
            if (piece.SuperPiece.subPieces.length === 2)
            {   
                console.log(index_converter(piece.SuperPiece.subPieces[1]))
                select_piece(index_converter(piece.SuperPiece.subPieces[1]), piece)
                return true 
            }
        }
        else if (piece.SuperPiece.subPieces.length === 1)
            {   
                select_piece(index_converter(piece.SuperPiece.subPieces[0]), piece)
                return true 
            }
        }
        return false

    }

export function resetTakenPieces(){
    TAKEN_PIECES_BLACK = [0, 0, 0, 0, 0, 0]
    TAKEN_PIECES_WHITE = [0, 0, 0, 0, 0, 0]
}

export default function TakePiece({piece} : Props) {
    const [p, setP] = useState< Piece | null >(null)
    const [single, setSingle] = useState<boolean>(false)
    const top = p?.SuperPiece.team === TeamType.WHITE ? '91.5vh' : '4vh';
    let x = ''
    let y = 0
    if (p){
        x = HORIZONTAL_AXIS[p.x]
        y = VERTICAL_AXIS[p.y]
    }

    useEffect(() => {
        setP(piece);
        setSingle(checkSinglePiece(piece));
    }, [piece])

    const buttons = get_buttons(p)

    function get_buttons(piece : Piece | null){
        let buttons = []
        const dir = piece?.SuperPiece.team === TeamType.WHITE ? 'white_pieces' : 'black_pieces';
        const qURL = `assets/${dir}/q.png`
        const bURL = `assets/${dir}/b.png`
        const nURL = `assets/${dir}/n.png`
        const rURL = `assets/${dir}/r.png`
        const pURL = `assets/${dir}/p.png`
        if (p?.SuperPiece.subPieces.includes(PieceType.QUEEN)){
            buttons.push(<button className = 'take-button' key = 'q'
            style = {{backgroundImage : `url(${qURL})`}} onClick = {takeQueen}></button>)
        }
        if (p?.SuperPiece.subPieces.includes(PieceType.ROOK)){
            buttons.push(<button className = 'take-button' key = 'r'
            style = {{backgroundImage : `url(${rURL})`}} onClick = {takeRook}></button>)
        }
        if (p?.SuperPiece.subPieces.includes(PieceType.BISHOP)){
            buttons.push(<button className = 'take-button' key = 'b'
            style = {{backgroundImage : `url(${bURL})`}} onClick = {takeBishop}></button>)
        }
        if (p?.SuperPiece.subPieces.includes(PieceType.NIGHT)){
            buttons.push(<button className = 'take-button' key = 'n'
            style = {{backgroundImage : `url(${nURL})`}} onClick = {takeNight}></button>)
        }
        if (p?.SuperPiece.subPieces.includes(PieceType.PAWN)){
            buttons.push(<button className = 'take-button' key = 'p'
            style = {{backgroundImage : `url(${pURL})`}} onClick = {takePawn}></button>)
        }
        return buttons
    }
    function takeQueen(){
        select_piece(1, p)
        CLICKED2 = true
        setP(null)
    }
    function takeRook(){
        select_piece(2, p)
        CLICKED2 = true
        setP(null)   
    }
    function takeBishop(){
        select_piece(3, p)
        CLICKED2 = true
        setP(null)      
    }
    function takeNight(){
        select_piece(4, p)
        CLICKED2 = true
        setP(null)   
    }
    function takePawn(){
        select_piece(5, p)
        CLICKED2 = true
        setP(null)
    }

    if (p !== null !== single){ 
        CLICKED2 = false 
        return <div>
        <CapturedPieces  capturedWhitePieces = {TAKEN_PIECES_WHITE} capturedBlackPieces = {TAKEN_PIECES_BLACK}></CapturedPieces>
        <div className = 'box' style = {{top : top}}>
        <span className = 'pop'> 
        <span className = 'white-text'> &nbsp; Your piece was taken on {x}{y} what piece is it? &thinsp; </span>
        {buttons}
        </span>
        </div>
        </div>
    }
    else {          
        return <div className = 'empty'>
        <CapturedPieces  capturedWhitePieces = {TAKEN_PIECES_WHITE} capturedBlackPieces = {TAKEN_PIECES_BLACK}></CapturedPieces>
        </div>
    }
}