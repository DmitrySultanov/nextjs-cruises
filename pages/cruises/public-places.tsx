import React, { FC } from 'react';
import { Typography, Container, Box, Card, CardContent, Skeleton, Grid, Alert } from '@mui/material/';
import APIService from '../../api/APIService';
import Layout from '../../components/Layout';
import Breadcrumbs from '../../components/Breadcrumbs';
import Image from 'next/image';
import Head from 'next/head';
import styles from '../../styles/PublicPlaces.module.scss';


export const getStaticProps = async () => {
    const response: any = await APIService.getPublicPlaces()
    const data = await response.data.data

    return {
        props: {
            places: data,
            statusCode: 200,
            statusText: null
        }
    }
}

interface IPublicPlace {
    id: number
    name: string
    description: string
    photo?: string
}

interface IPublicPlacesProps {
    places: IPublicPlace[]
    statusCode: number | null
    statusText: string | null
}

const PublicPlaces: FC<IPublicPlacesProps> = ({places, statusCode, statusText}) => {
    console.log(places, statusCode, statusText)

    return (
        <Layout>
            <Head>
                <title>КруизеШтерн - Общественные места</title>
            </Head>
            <Container maxWidth="lg">
                <Breadcrumbs />
                {statusCode === 200
                    ?   <Box className={styles.publicPlaces}>
                            <Grid container spacing={2}>
                                {places.map((place) => 
                                <>
                                    <Grid item lg={3} key={place.id}>
                                        <Card className={styles.card}>
                                            <Box className={styles.cardMedia}>
                                                {place.photo
                                                    ?   <Image  placeholder="blur" 
                                                                blurDataURL="../img/blur.png" 
                                                                layout="fill" 
                                                                src={place?.photo} 
                                                                alt={place?.name} />
                                                    :   <Skeleton variant="rectangular" width="100%" height="100%" />
                                                }
                                            </Box>
                                            <CardContent className={styles.cardContent}>
                                                <Box>
                                                    <Typography variant="h6" sx={{
                                                        lineHeight: '1.25',
                                                        mb: 1,
                                                        fontSize: '1.1rem',
                                                        fontWeight: 600
                                                    }}>{place.name}</Typography>
                                                    <Typography variant="body2" sx={{mb: 0, color: '#777'}}>
                                                        place.description
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </>
                                )}
                            </Grid>
                        </Box>
                    :   <Alert sx={{width: '100%', justifyContent: 'center', bgcolor: 'rgba(253, 237, 237, 1)!important' }} severity="error">Sorry, we got an error {statusText} {statusCode}</Alert>
                }
            </Container>
        </Layout>
    )
}

export default PublicPlaces;
