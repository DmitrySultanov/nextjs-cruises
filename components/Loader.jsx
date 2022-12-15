import React from 'react';
import { Grid, CircularProgress, Box } from '@mui/material';

const Loader = () => {
    return (
        <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="center">
                <CircularProgress />
            </Grid>
        </Grid>
    );
}

export default Loader;
