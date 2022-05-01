import * as React from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import LanguageIcon from '@mui/icons-material/Language';

const shapeStyles = { width: 50, height: 50 };

export default function GenerationsLabelling( props ) {
  return (
    <Box sx={{ width: 250, textAlign :"right" }}>
      <Badge color="primary" badgeContent={ props.currentValue } showZero max={ 1000000000000000 }>
        <LanguageIcon sx={shapeStyles} />
      </Badge>
    </Box>
  );
}