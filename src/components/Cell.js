import React from 'react';

const Cell = ({ value, onClick, index }) => {
    return (
        <div
            className="game__cell"
            onClick={() => onClick(index)}
        >
            {value}
        </div>
    );
};

export default Cell;