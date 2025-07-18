import { useState } from "react";
export default function Game() {
    const [turn, setTurn] = useState(0)
    const initialMoves = Array(9).fill(null);
    initialMoves[0] = Array(9).fill('-');
    const [moves, setMoves] = useState(initialMoves);
    function jumpTo(turnNo) {
        setTurn(turnNo);
    }
    function handleNextMove(nextSquares) {
        const newTurn = turn + 1;
        setTurn(newTurn);
        const previousMoves = moves.slice();
        previousMoves[newTurn] = nextSquares;
        setMoves(previousMoves);
        if (newTurn == 8 || checkWinner(nextSquares))
            alert('Game over');
    }
    const currentMove = moves[turn].slice();
    const movesList = moves.map(function (move, index) {
        if (move && index > 0 && index < turn)
            return (<li key={index}><button onClick={() => { jumpTo(index) }}>Jump to {index}</button></li>);

    })
    return (
        <div>
            <Board squares={currentMove} onMove={handleNextMove} turn={turn}></Board>
            <ol>
                {movesList}
            </ol>
        </div>
    );
}
function Board({ squares, onMove, turn }) {
    //console.log(squares)
    //const [squares, setSquares] = useState(Array(9).fill('-'))
    //const [turn, setTurn] = useState(0)
    function handleClick(i) {
        console.log(`${i} clicked!`);
        //setVvv('X');
        if (squares[i] == '-') {
            const copySquares = squares.slice();
            if (turn % 2 == 0)
                copySquares[i] = 'X';
            else
                copySquares[i] = 'O';
            onMove(copySquares);

        }

    }
    return (
        <>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}></Square>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}></Square>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}></Square>
            </div>

            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}></Square>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}></Square>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}></Square>
            </div>

            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}></Square>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}></Square>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}></Square>

            </div>
        </>
    )

}

function Square({ value, onSquareClick }) {
    return (<button onClick={onSquareClick} className="square">{value}</button>);
}

function checkWinner(squares) {
    const winningLines = [
        [0, 1, 2],
        [0, 4, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ]
    let isWinning = false;
    for (var i = 0; i < winningLines.length; i++) {
        let winningLine = winningLines[i];
        if (squares[winningLine[0]] != '-' && (squares[winningLine[0]] == squares[winningLine[2]]) && (squares[winningLine[2]] == squares[winningLine[1]])) {
            isWinning = true;
        }
    }
    return isWinning;
}