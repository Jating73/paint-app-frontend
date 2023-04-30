import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button, Divider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Pen, Eraser } from 'react-bootstrap-icons';
import BrushSizePicker from './BrushSizePicker';
import ColorPicker from './ColorPicker';
import ShapePicker from './ShapePicker';
import { useState, useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    iconButton: {
        marginRight: theme.spacing(1),
    },
    slider: {
        marginLeft: theme.spacing(2),
        width: '150px',
    },
    colorPicker: {
        marginLeft: theme.spacing(2),
    },
    shapeSelect: {
        marginLeft: theme.spacing(2),
        width: '100px',
    },
}));

const ToolbarComponent = ({ tool, brushSize, brushColor, shape, isAuthenticated, setAuthenticated, onToolChange, onBrushSizeChange, onBrushColorChange, onShapeChange }) => {
    const classes = useStyles();


    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuthenticated(false);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Paint App
                    </Typography>
                    <IconButton color={tool === 'pen' ? 'primary' : 'default'} style={{ backgroundColor: tool === 'pen' ? '#ff9800' : '#fff' }} className={classes.iconButton} onClick={() => onToolChange('pen')}>
                        <Pen />
                    </IconButton>
                    <IconButton color={tool === 'eraser' ? 'primary' : 'default'} style={{ backgroundColor: tool === 'eraser' ? '#ff9800' : '#fff' }} className={classes.iconButton} onClick={() => onToolChange('eraser')}>
                        <Eraser />
                    </IconButton>
                    <BrushSizePicker brushSize={brushSize} onBrushSizeChange={onBrushSizeChange} />
                    <ColorPicker brushColor={brushColor} onBrushColorChange={onBrushColorChange} />
                    {/* <ShapePicker shape={shape} onShapeChange={onShapeChange} /> */}
                    <Divider orientation="vertical" flexItem />
                    {isAuthenticated ? (
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    ) : (
                        <>
                            <Button color="inherit" href="/login">Login</Button>
                            <Button color="inherit" href="/register">Register</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default ToolbarComponent;
