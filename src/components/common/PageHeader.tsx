import React from 'react';
import { Box, Typography } from '@mui/material';

interface PageHeaderProps {
    title: string;
    helpText?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, helpText }) => {
    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="h4" component="h1">
                {title}
            </Typography>
            {helpText && (
                <Typography variant="body2" color="text.secondary">
                    {helpText}
                </Typography>
            )}
        </Box>
    );
};

export default PageHeader;
