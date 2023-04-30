import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#007ACC',
        },
        secondary: {
            main: '#FFA500',
        },
    },
});

function Theme({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme;
