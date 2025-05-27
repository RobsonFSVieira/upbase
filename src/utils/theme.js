import { createTheme, alpha } from '@mui/material/styles';

// Design tokens - A modern, sophisticated color palette
const tokens = {
    prussianBlue: {
        100: '#E3E8ED',
        200: '#B9C6D3',
        300: '#8FA4B8',
        400: '#64829E',
        500: '#3A6084',
        600: '#2E4D6A',
        700: '#223A4F',
        800: '#162635',
        900: '#0B131A',
    },
    coral: {
        100: '#FFE8E1',
        200: '#FFC7B8',
        300: '#FFA68F',
        400: '#FF8566',
        500: '#FF643D',
        600: '#CC5031',
        700: '#993C25',
        800: '#662818',
        900: '#33140C',
    },
    neutral: {
        100: '#F8FAFC',
        200: '#EEF2F6',
        300: '#E3E8EF',
        400: '#CDD5DF',
        500: '#9AA4B2',
        600: '#697586',
        700: '#4B5565',
        800: '#364152',
        900: '#202939',
    },
};

// Foundational styles
const foundations = {
    typography: {
        fontFamily: [
            'Inter',
            '-apple-system',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Roboto',
            'Helvetica Neue',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.2,
        },
        h4: {
            fontSize: '1.25rem',
            fontWeight: 600,
            lineHeight: 1.2,
        },
        h5: {
            fontSize: '1.125rem',
            fontWeight: 600,
            lineHeight: 1.2,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1.2,
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 12,
    },
};

// Theme configuration
const getTheme = (mode) => {
    const isLight = mode === 'light';

    // Common palette values
    const palette = {
        mode,
        primary: {
            main: isLight ? tokens.prussianBlue[600] : tokens.prussianBlue[400],
            light: isLight ? tokens.prussianBlue[400] : tokens.prussianBlue[300],
            dark: isLight ? tokens.prussianBlue[800] : tokens.prussianBlue[600],
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: isLight ? tokens.coral[500] : tokens.coral[400],
            light: isLight ? tokens.coral[400] : tokens.coral[300],
            dark: isLight ? tokens.coral[600] : tokens.coral[500],
            contrastText: '#FFFFFF',
        },
        background: {
            default: isLight ? tokens.neutral[100] : tokens.neutral[900],
            paper: isLight ? '#FFFFFF' : tokens.neutral[800],
            elevated: isLight ? '#FFFFFF' : tokens.neutral[700],
        },
        text: {
            primary: isLight ? tokens.neutral[900] : tokens.neutral[100],
            secondary: isLight ? tokens.neutral[600] : tokens.neutral[400],
        },
        divider: isLight ? tokens.neutral[200] : tokens.neutral[700],
        action: {
            hover: isLight
                ? alpha(tokens.prussianBlue[500], 0.04)
                : alpha(tokens.prussianBlue[300], 0.08),
            selected: isLight
                ? alpha(tokens.prussianBlue[500], 0.08)
                : alpha(tokens.prussianBlue[300], 0.12),
        },
    };

    return createTheme({
        ...foundations,
        palette,
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        scrollbarWidth: 'thin',
                        '&::-webkit-scrollbar': {
                            width: '6px',
                            height: '6px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: isLight ? tokens.neutral[200] : tokens.neutral[800],
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: isLight ? tokens.neutral[400] : tokens.neutral[600],
                            borderRadius: '3px',
                        },
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: palette.background.paper,
                        color: palette.text.primary,
                        boxShadow: isLight
                            ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                            : '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
                        borderBottom: `1px solid ${palette.divider}`,
                        '@supports (backdrop-filter: blur(12px))': {
                            backgroundColor: isLight
                                ? alpha('#FFFFFF', 0.9)
                                : alpha(tokens.neutral[800], 0.9),
                            backdropFilter: 'blur(12px)',
                        },
                    },
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        backgroundColor: isLight ? tokens.prussianBlue[800] : tokens.neutral[900],
                        color: '#FFFFFF',
                        backgroundImage: isLight
                            ? `linear-gradient(to bottom, ${tokens.prussianBlue[800]}, ${tokens.prussianBlue[900]})`
                            : `linear-gradient(to bottom, ${tokens.neutral[800]}, ${tokens.neutral[900]})`,
                        '& .MuiListItemIcon-root': {
                            color: '#FFFFFF',
                        },
                        '& .MuiListItemText-root': {
                            color: '#FFFFFF',
                        },
                        '& .MuiSvgIcon-root': {
                            color: '#FFFFFF',
                        }
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 16,
                        border: `1px solid ${palette.divider}`,
                        boxShadow: isLight
                            ? '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)'
                            : '0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: isLight
                                ? '0 6px 12px -2px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)'
                                : '0 6px 12px -2px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
                        },
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        padding: '8px 16px',
                        fontWeight: 500,
                        textTransform: 'none',
                        transition: 'all 0.2s ease-in-out',
                    },
                    contained: {
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: isLight
                                ? '0 3px 6px -2px rgba(0, 0, 0, 0.12)'
                                : '0 3px 6px -2px rgba(0, 0, 0, 0.3)',
                            transform: 'translateY(-1px)',
                        },
                    },
                    outlined: {
                        borderColor: palette.divider,
                        '&:hover': {
                            borderColor: palette.primary.main,
                            backgroundColor: palette.action.hover,
                        },
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        borderBottom: `1px solid ${palette.divider}`,
                    },
                    head: {
                        fontWeight: 600,
                        backgroundColor: isLight ? tokens.neutral[50] : tokens.neutral[800],
                    },
                },
            },
            MuiTableRow: {
                styleOverrides: {
                    root: {
                        '&:hover': {
                            backgroundColor: palette.action.hover,
                        },
                    },
                },
            },
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        transition: 'all 0.2s ease-in-out',
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: palette.divider,
                            transition: 'all 0.2s ease-in-out',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: palette.primary.main,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderWidth: 2,
                        },
                    },
                },
            },
            MuiSwitch: {
                styleOverrides: {
                    root: {
                        width: 42,
                        height: 26,
                        padding: 0,
                    },
                    switchBase: {
                        padding: 1,
                        '&.Mui-checked': {
                            transform: 'translateX(16px)',
                            color: '#fff',
                            '& + .MuiSwitch-track': {
                                backgroundColor: palette.primary.main,
                                opacity: 1,
                                border: 0,
                            },
                        },
                    },
                    thumb: {
                        width: 24,
                        height: 24,
                    },
                    track: {
                        borderRadius: 13,
                        border: `1px solid ${isLight ? '#E9E9EA' : '#39393D'}`,
                        backgroundColor: isLight ? '#E9E9EA' : '#39393D',
                        opacity: 1,
                        transition: 'all 0.2s ease-in-out',
                    },
                },
            },
        },
    });
};

export default getTheme;
