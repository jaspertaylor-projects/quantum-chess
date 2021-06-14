import './CapturedPieces.css'
import { useState, useEffect } from 'react';


const w_urls = [`assets/white_pieces/k.png`, `assets/white_pieces/q.png`, `assets/white_pieces/r.png`,
                `assets/white_pieces/b.png`, `assets/white_pieces/n.png`, `assets/white_pieces/p.png`]
const b_urls = [`assets/black_pieces/k.png`, `assets/black_pieces/q.png`, `assets/black_pieces/r.png`,
                `assets/black_pieces/b.png`, `assets/black_pieces/n.png`, `assets/black_pieces/p.png`]


interface Props {
    capturedWhitePieces : number [];
    capturedBlackPieces : number [];
}

export default function CapturedPieces ({capturedWhitePieces, capturedBlackPieces} : Props){
    const [capturedWhite, setWhiteCaptured] = useState<number[]>(capturedWhitePieces)
    const [capturedBlack, setBlackCaptured] = useState<number[]>(capturedBlackPieces)
    
    useEffect(() => {
        setWhiteCaptured(capturedWhitePieces)
      }, [capturedWhite, capturedWhitePieces])
      useEffect(() => {
        setBlackCaptured(capturedBlackPieces);
      }, [capturedBlack, capturedBlackPieces])


    let w_imgs = []
    let b_imgs = []

    for (let i = 5; i > 0; i --){
        for (let j = 0; j < capturedWhitePieces[i]; j ++){
            w_imgs.push(<div className = 'cap' key = {`${i}${j}`}style = {{backgroundImage : `url(${w_urls[i]})`}}/>)
        }
    }
    for (let i = 5; i > 0; i --){
        for (let j = 0; j < capturedBlackPieces[i]; j ++){
            b_imgs.push(<div className = 'cap' key = {`${i}${j}`}style = {{backgroundImage : `url(${b_urls[i]})`}}/>)
        }
    }
    return <div><div className = 'white-captured'>{w_imgs}</div>                
                <div className = 'black-captured'>{b_imgs}</div>
            </div>
}