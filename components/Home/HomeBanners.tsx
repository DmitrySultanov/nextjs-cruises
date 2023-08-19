import React from 'react';
import { Grid, Box, Container } from '@mui/material';
import Slider from '../Slider';


const banners = [
    {
        id: 0,
        filename: '/img/7cd24012f9de36b103f601570e023b550645cba5.jpg'
    },
    {
        id: 1,
        filename: '/img/b559a921733122fa5669e1ccf8cc32eaec9938e6.jpg'
    },
    {
        id: 2,
        filename: '/img/370b70e86a06d30214259891f03bf2b1c5061c52.jpg'
    },
    {
        id: 4,
        filename: '/img/475cc4600cb4c8cb0f5752987f4e5ea0a65b1e57.jpg'
    },
]

const HomeBanners = () => {
    return (
        <Box className="banners" component="section">
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Slider photos={banners} slidesPerView={1} autoplay={true}/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default HomeBanners;
