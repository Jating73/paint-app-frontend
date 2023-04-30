import React from 'react';

const ShapePicker = ({ selectedShape, onShapeChange }) => {
    const shapes = ['triangle', 'rectangle', 'circle'];

    return (
        <div className="shape-tools">
            {shapes.map((shape) => (
                <button key={shape} className={selectedShape === shape ? 'active' : ''} onClick={() => onShapeChange(shape)}>
                    {shape}
                </button>
            ))}
        </div>
    );
};

export default ShapePicker;
