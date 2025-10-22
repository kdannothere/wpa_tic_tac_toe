import React from 'react';
import Cell from './Cell';

const Board = ({ board, onClick }) => {
    const renderCell = (index) => {
        return (
            <Cell
                key={index}
                index={index}
                value={board[index]}
                onClick={onClick}
            />
        );
    };

    return (
        <div id="game__board">
            {board.map((cell, index) => renderCell(index))}
        </div>
    );
};

export default Board;