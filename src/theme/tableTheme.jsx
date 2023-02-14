import { createTheme } from 'react-data-table-component';

export const theme = createTheme('solarized', {
    text: {
        primary: '#FFF',
        secondary: '#FFF',
    },
    background: {
        default: '#131516',
    },
    context: {
        background: '#131516',
        text: '#FFF',
    },
    divider: {
        default: '#FFF opacity 92%',
    },
    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
    },
});