import React from 'react';
import { Typography, Container, Box, Card, CardContent, Skeleton, Grid, Alert } from '@mui/material/';
import APIService from '../../api/APIService';
import Layout from '../../components/Layout';
import Breadcrumbs from '../../components/Breadcrumbs';
import Image from 'next/image';
import styles from '../../styles/PublicPlaces.module.scss';


export const getStaticProps = async () => {
    try {
        const response = await APIService.getPublicPlaces()
        const data = await response.data

        return {
            props: {
                places: data,
                statusCode: 200,
                statusText: null
            }
        }
    } catch(error) {
        return {
            props: {
                places: null,
                statusCode: error.response.status,
                statusText: error.response.statusText
            }
        }
    }
}

const PublicPlaces = ({places, statusCode, statusText}) => {
    console.log(places, statusCode, statusText)

    return (
        <Layout>
            <Container maxWidth="lg">
                <Breadcrumbs />
                {statusCode === 200
                    ?   <Box className={styles.publicPlaces}>
                            <Grid container spacing={2}>
                                {places.data && places.data.map((place) => 
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
