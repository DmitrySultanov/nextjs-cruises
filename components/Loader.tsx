import React, { FC } from 'react';
import { Grid, CircularProgress } from '@mui/material';

const Loader: FC = () => {
    return (
        <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="center">
                <CircularProgress />
            </Grid>
        </Grid>
    );
}

export default Loader;
