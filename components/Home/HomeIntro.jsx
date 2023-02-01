import React from 'react';
import { Grid, Box, Container, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import CruisesSearch from '../Cruise/CruisesSearch';
import styles from '../../styles/Home.module.scss';


const HomeIntro = ({cities}) => {
    return (
        <Box className={styles.intro} component="section">
            <Container maxWidth="lg">
                <Typography component="h1" className={styles.title}>Речные круизы по России вместе с Круизештерн</Typography>
                <CruisesSearch cities={cities} />
            </Container>
        </Box>
    );
}

export default HomeIntro;
