import React from 'react';

const BrushSizePicker = ({ size, onBrushSizeChange }) => {
    return (
        <div className="brush-size">
            <label>Brush Size:</label>
            <input type="range" min="1" max="100" value={size} onChange={(e) => onBrushSizeChange(e.target.value)} />
            <span>{size}</span>
        </div>
    );
};

export default BrushSizePicker;
