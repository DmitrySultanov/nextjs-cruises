import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { Grid, Box, Container, Typography, Button, Alert, 
    Pagination, Card, CardContent, List, ListItem, Chip, Radio, RadioGroup, FormControlLabel, ListItemText } from '@mui/material';
import Breadcrumbs from '../components/Breadcrumbs';


const About = () => {
    return (
        <Layout>
             <Head>
                <title>КруизеШтерн - О нас</title>
            </Head>
            <Container maxWidth="lg">
                <Breadcrumbs />
                <Grid container spacing={1}>
                    <Grid item lg={8} md={7} sm={6} xs={12}>
                        <Typography variant="h4" component="h1" sx={{ mb: 3}}>Почему мы?</Typography>
                        <Typography variant="body1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero earum, repellat et in facere itaque suscipit velit omnis maxime saepe quaerat pariatur sunt! Quaerat ratione laudantium perferendis nihil eius voluptates?</Typography>
                        <Typography variant="body1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero earum, repellat et in facere itaque suscipit velit omnis maxime saepe quaerat pariatur sunt! Quaerat ratione laudantium perferendis nihil eius voluptates?</Typography>
                        <Typography variant="body1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero earum, repellat et in facere itaque suscipit velit omnis maxime saepe quaerat pariatur sunt! Quaerat ratione laudantium perferendis nihil eius voluptates?</Typography>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
}

export default About;
