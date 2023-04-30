import React from 'react';

const ColorPicker = ({ color, onBrushColorChange }) => {
    return (
        <div className="color-picker">
            <input type="color" value={color} onChange={onBrushColorChange} />
        </div>
    );
};

export default ColorPicker;
