import React, { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';
import CruisesSearch from '../Cruise/CruisesSearch';
import styles from '../../styles/Home.module.scss';


const HomeIntro: FC = () => {
    
    return (
        <Box className={styles.intro} component="section">
            <Container maxWidth="lg">
                <Typography component="h1" className={styles.title}>Речные круизы по России вместе с Круизештерн</Typography>
                <CruisesSearch />
            </Container>
        </Box>
    );
}

export default HomeIntro;
