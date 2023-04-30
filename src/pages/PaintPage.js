import React, { useState, useRef } from 'react';
import { Stage, Layer, Line, Rect, Circle, RegularPolygon } from 'react-konva';
import Toolbar from '../components/Toolbar';
// import eraserIcon from './eraser-icon.jpg';

function PaintPage() {
    const [tool, setTool] = useState('pen');
    const [brushColor, setColor] = useState('#000');
    const [brushSize, setBrushSize] = useState(5);
    const [shape, setShape] = useState('round');
    const [lines, setLines] = useState([]);
    const [shapes, setShapes] = useState([]);
    const isDrawing = useRef(false);
    const [showSidebar, setShowSidebar] = useState(false);

    function handleMouseDown(e) {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        if (tool === 'pen' || tool === 'eraser') {
            setLines([...lines, { tool, brushColor, brushSize, shape, points: [pos.x, pos.y] }]);
        } else if (tool === 'rectangle') {
            setShapes([...shapes, { tool, brushColor, brushSize, shape, x: pos.x, y: pos.y, width: 0, height: 0 }]);
        } else if (tool === 'circle') {
            setShapes([...shapes, { tool, brushColor, brushSize, shape, x: pos.x, y: pos.y, radius: 0 }]);
        } else if (tool === 'triangle') {
            setShapes([...shapes, { tool, brushColor, brushSize, shape, x: pos.x, y: pos.y, sides: 3, radius: 0 }]);
        }
    }

    function handleMouseMove(e) {
        if (!isDrawing.current) return;
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();

        if (tool === 'pen' || tool === 'eraser') {
            let lastLine = lines[lines.length - 1];
            lastLine.points = lastLine.points.concat([point.x, point.y]);
            lines.splice(lines.length - 1, 1, lastLine);
            setLines([...lines]);
        } else if (tool === 'rectangle') {
            let lastShape = shapes[shapes.length - 1];
            lastShape.width = point.x - lastShape.x;
            lastShape.height = point.y - lastShape.y;
            setShapes([...shapes]);
        } else if (tool === 'circle') {
            let lastShape = shapes[shapes.length - 1];
            let radius = Math.sqrt(Math.pow(point.x - lastShape.x, 2) + Math.pow(point.y - lastShape.y, 2));
            lastShape.radius = radius;
            setShapes([...shapes]);
        } else if (tool === 'triangle') {
            let lastShape = shapes[shapes.length - 1];
            let radius = Math.sqrt(Math.pow(point.x - lastShape.x, 2) + Math.pow(point.y - lastShape.y, 2));
            lastShape.radius = radius;
            setShapes([...shapes]);
        }
    }

    function handleMouseUp() {
        isDrawing.current = false;
    }

    function handleToolChange(newTool) {
        setTool(newTool);
        if (newTool === 'eraser') {
            document.body.classList.add('eraser-cursor');
        } else {
            document.body.classList.remove('eraser-cursor');
        }
    }

    function handleColorChange(e) {
        setColor(e.target.value);
    }

    function handleBrushSizeChange(newSize) {
        setBrushSize(newSize);
    }

    function handleShapeChange(newShape) {
        setShape(newShape);
    }

    function handleSidebarToggle() {
        setShowSidebar(!showSidebar);
    }

    return (
        <>
            <div className="paint-page">
                <div className="paint-page-toolbar">
                    <Toolbar
                        tool={tool}
                        brushSize={brushSize}
                        brushColor={brushColor}
                        shape={shape}
                        onToolChange={handleToolChange}
                        onShapeChange={handleShapeChange}
                        onBrushColorChange={handleColorChange}
                        onBrushSizeChange={handleBrushSizeChange} />
                </div>
                <div className={`paint-page-stage ${tool === 'eraser' ? 'eraser-cursor' : ''}`}>
                    <Stage
                        className={tool === 'eraser' ? 'eraser-cursor' : ''}
                        width={window.innerWidth}
                        height={window.innerHeight - 64}
                        onMouseDown={handleMouseDown}
                        onMousemove={handleMouseMove}
                        onMouseup={handleMouseUp}
                        style={{
                            cursor: tool === 'pen' ? 'crosshair' : tool === 'eraser' ? '' : 'default'
                        }}
                    >
                        <Layer>
                            {lines.map((line, i) => {

                                if (line.tool === 'pen') {
                                    return (
                                        <Line
                                            key={i}
                                            points={line.points}
                                            stroke={line.brushColor}
                                            strokeWidth={line.brushSize}
                                            globalCompositeOperation={'source-over'}
                                            lineCap={line.shape}
                                            lineJoin={line.shape}
                                        />
                                    );
                                } else if (line.tool === 'eraser') {
                                    return (
                                        <Line
                                            key={i}
                                            points={line.points}
                                            stroke={line.brushColor}
                                            strokeWidth={20}
                                            globalCompositeOperation={'destination-out'}
                                            lineCap={line.shape}
                                            lineJoin={line.shape}
                                        />
                                    );
                                } else if (line.tool === 'rectangle') {
                                    const [x1, y1, x2, y2] = line.points;
                                    const rectProps = {
                                        x: x1,
                                        y: y1,
                                        width: x2 - x1,
                                        height: y2 - y1,
                                        fill: line.brushColor,
                                        stroke: line.brushColor,
                                        strokeWidth: line.brushSize,
                                    };
                                    return <Rect key={i} {...rectProps} />;
                                } else if (line.tool === 'circle') {
                                    const [x1, y1, x2, y2] = line.points;
                                    const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                                    const circleProps = {
                                        x: x1,
                                        y: y1,
                                        radius: radius,
                                        fill: line.brushColor,
                                        stroke: line.brushColor,
                                        strokeWidth: line.brushSize,
                                    };
                                    return <Circle key={i} {...circleProps} />;
                                } else if (line.tool === 'triangle') {
                                    const [x1, y1, x2, y2] = line.points;
                                    const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                                    const triangleProps = {
                                        x: x1,
                                        y: y1,
                                        sides: 3,
                                        radius: radius,
                                        fill: line.brushColor,
                                        stroke: line.brushColor,
                                        strokeWidth: line.brushSize,
                                    };
                                    return <RegularPolygon key={i} {...triangleProps} />;
                                }
                            })}
                            {shapes && shapes.map((shape, i) => {
                                if (shape.tool === 'rectangle') {
                                    const rectProps = {
                                        x: shape.x,
                                        y: shape.y,
                                        width: shape.width,
                                        height: shape.height,
                                        fill: shape.brushColor,
                                        stroke: shape.brushColor,
                                        strokeWidth: shape.brushSize,
                                    };
                                    return <Rect key={i} {...rectProps} />;
                                } else if (shape.tool === 'circle') {
                                    const circleProps = {
                                        x: shape.x,
                                        y: shape.y,
                                        radius: shape.radius,
                                        fill: shape.brushColor,
                                        stroke: shape.brushColor,
                                        strokeWidth: shape.brushSize,
                                    };
                                    return <Circle key={i} {...circleProps} />;
                                } else if (shape.tool === 'triangle') {
                                    const triangleProps = {
                                        x: shape.x,
                                        y: shape.y,
                                        sides: shape.sides,
                                        radius: shape.radius,
                                        fill: shape.brushColor,
                                        stroke: shape.brushColor,
                                        strokeWidth: shape.brushSize,
                                    };
                                    return <RegularPolygon key={i} {...triangleProps} />;
                                }
                            })}
                        </Layer>
                    </Stage>
                </div>
                {showSidebar && (
                    <div className="paint-page-sidebar">
                        {/* Add your sidebar components here */}
                    </div>
                )}
            </div>
        </>
    );
}

export default PaintPage;
