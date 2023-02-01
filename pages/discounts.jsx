import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import APIService from '../api/APIService';
import { Grid, Box, Container, Typography, Button, Alert, 
    Pagination, Card, CardContent, Skeleton, List, ListItem, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import Breadcrumbs from '../components/Breadcrumbs';


export const getStaticProps = async () => {
    const response = await APIService.getDiscounts(9)
    const data = await response.data

    if (!data) {
        return {
            // props: {
            //     discounts: null,
            //     status: response.status ? response.status : 404,
            //     statusText: response.message ? response.message : ''
            // }
            notFound: true,
        }
    }

    return {
        // props: {
        //     discounts: data,
        //     statusCode: 200,
        //     statusText: null
        // }
        notFound: true,
    }
}


const Discounts = ({discounts, statusCode, statusText}) => {
    console.log(discounts, statusCode, statusText)


    return (
        <Layout>
             <Head>
                <title>КруизеШтерн - Скидки</title>
            </Head>
            <Container maxWidth="lg">
                <Breadcrumbs />
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="h1" sx={{ mb: 3}}>Скидки</Typography>
                        {statusCode === 200
                            ?   <>
                                    <Grid container spacing={2}>
                                        {discounts.data != null && discounts.data.map((item, idx) =>
                                            <Grid item sm={4} md={4} lg={3} key={idx}>
                                                <Card>
                                                    <CardContent>
                                                        <Typography color="text.secondary" gutterBottom>
                                                            {item.name}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        )}
                                    </Grid>
                                </>
                            :   <Alert sx={{width: '100%', justifyContent: 'center', bgcolor: 'rgba(253, 237, 237, 1)!important' }} severity="error">Sorry, we got an error {statusText} {statusCode}</Alert>
                        }
                       
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
}

export default Discounts;
