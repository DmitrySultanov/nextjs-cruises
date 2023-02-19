import React from 'react';
import { Box, Divider } from '@mui/material';
import styles from '../styles/Sidebar.module.scss';
import News from './News';


const Sidebar = () => {
    return (
        <Box className={styles.sidebar} component="aside">
            <News title={'Последние новости'}/>
            <Divider sx={{my: 2}} />
        </Box>
    );
}

export default Sidebar;
