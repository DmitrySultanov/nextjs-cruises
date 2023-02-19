import React, { useState } from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';

var stylingObject = {
    container: {
      padding: '20px 30px',
      width: '20rem'
    }, 
    text: {
      marginLeft: "15px",
      fontSize: '1.15rem'
    }
  }

const LoaderModal = () => {
    const [open, setOpen] = useState(true);

    return (
        <Dialog open={open}  maxWidth="xs">
            <Grid item xs={12}>
                <Grid container alignItems="center" style={stylingObject.container}>
                    <Grid item><CircularProgress /></Grid>
                    <Grid item><Typography component="span" style={stylingObject.text}>Загрузка...</Typography></Grid>
                </Grid>
            </Grid>
        </Dialog>
    );
}

export default LoaderModal;
