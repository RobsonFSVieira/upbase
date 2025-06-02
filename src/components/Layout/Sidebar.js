import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HistoryIcon from '@mui/icons-material/History';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [openMenus, setOpenMenus] = useState({});

    // Adicionar useEffect para manter menus abertos baseado na rota atual
    useEffect(() => {
        const path = location.pathname;
        const parentPaths = menuItems.reduce((acc, item) => {
            if (item.subItems?.some(sub => path.includes(sub.path))) {
                acc[item.id] = true;
            }
            return acc;
        }, {});
        setOpenMenus(prev => ({
            ...prev,
            ...parentPaths
        }));
    }, [location.pathname]);

    const handleMenuClick = (menuId, path) => {
        setOpenMenus(prev => ({
            ...prev,
            [menuId]: !prev[menuId]
        }));
        if (path) {
            navigate(path);
        }
    };

    const isActive = (path) => location.pathname.includes(path);

    const MenuItem = ({ item }) => (
        <>
            <ListItem
                button
                onClick={() => handleMenuClick(item.id, item.path)}
                sx={{
                    bgcolor: isActive(item.path) ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                    borderRight: isActive(item.path) ? '4px solid #1976d2' : 'none',
                    '&:hover': {
                        bgcolor: 'rgba(25, 118, 210, 0.12)',
                    }
                }}
            >
                <ListItemIcon
                    sx={{
                        color: isActive(item.path) ? '#1976d2' : 'inherit'
                    }}
                >
                    {item.icon}
                </ListItemIcon>
                <ListItemText
                    primary={item.text}
                    sx={{
                        color: isActive(item.path) ? '#1976d2' : 'inherit'
                    }}
                />
                {item.subItems && (openMenus[item.id] ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>

            {item.subItems && (
                <Collapse in={openMenus[item.id]} timeout="auto">
                    <List component="div" disablePadding>
                        {item.subItems.map((subItem) => (
                            <ListItem
                                button
                                key={subItem.path}
                                onClick={() => navigate(subItem.path)}
                                sx={{
                                    pl: 4,
                                    bgcolor: isActive(subItem.path) ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                                    borderRight: isActive(subItem.path) ? '4px solid #1976d2' : 'none',
                                    '&:hover': {
                                        bgcolor: 'rgba(25, 118, 210, 0.12)',
                                    }
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: isActive(subItem.path) ? '#1976d2' : 'inherit'
                                    }}
                                >
                                    {subItem.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={subItem.text}
                                    sx={{
                                        color: isActive(subItem.path) ? '#1976d2' : 'inherit'
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );

    return (
        <Box sx={{ width: 240, flexShrink: 0 }}>
            <List>
                {menuItems.map((item) => (
                    <MenuItem key={item.id} item={item} />
                ))}
                {
                    userProfile?.role === 'lider' && (
                        <ListItem>
                            <ListItemButton component={Link} to="/audit-logs">
                                <ListItemIcon>
                                    <HistoryIcon />
                                </ListItemIcon>
                                <ListItemText primary="Logs de Auditoria" />
                            </ListItemButton>
                        </ListItem>
                    )
                }
            </List>
        </Box>
    );
};

export default Sidebar;