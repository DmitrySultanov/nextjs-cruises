import React from 'react';
import Head from 'next/head';
import { Grid, Box, Container, Typography, Button, Alert, 
    Pagination, Card, CardContent, Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Dotdotdot from 'react-dotdotdot';
import Layout from '../../components/Layout';
import Breadcrumbs from '../../components/Breadcrumbs';
import APIService from '../../api/APIService';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDisplay, faRubleSign } from "@fortawesome/free-solid-svg-icons";
import styles from '../../styles/Cruises.module.scss';


export const getServerSideProps = async (context) => {
    try {
        if(!context.query.city) {
            return {
                redirect: {
                  destination: '/',
                  permanent: false,
                },
            }
        }

        const response = await APIService.getCruises(context.query)
        const data = await response.data;

        if (!data) {
            return {
              notFound: true,
            }
        }
    
        return {
            props: {
                cruises: data,
                statusCode: 200,
                statusText: null
            }
        }
    } catch(error) {
        return {
            props: {
                cruises: null,
                statusCode: error.response.status,
                statusText: error.response.statusText
            }
        }
    }
}

const RiverCruises = ({cruises, statusCode, statusText}) => {
    console.log(cruises)
    const router = useRouter()

    const handlePaginationChange = (event, value) => {
        router.push({
            pathname: '/cruises',
            query: { 
                city: router.query.city, 
                date: router.query.date, 
                duration: router.query.duration,
                limit: 32,
                page: value
            }
        })
    }

    return (
        <Layout pageClass="cruises">
            <Head>
                <title>Главная - КруизеШтерн</title>
            </Head>
            <Container maxWidth="lg">
                <Breadcrumbs />
                <Box className={styles.cruises}>
                    {statusCode === 200 
                        ?   <>
                                <Grid container spacing={2}>
                                    {cruises.data?.map((cruise) => 
                                        // <Grid item sm={6} md={4} lg={3} key={cruise.id} style={cruise.freeCabins ? {'': ''} : {display: 'none'}}>
                                        <Grid item sm={6} md={4} lg={3} key={cruise.id}>
                                            <Card className={styles.card}>
                                                <Box className={styles.cardMedia}>
                                                    {cruise.beautifulName ? <Box component="span" className={styles.cardBeatifulNameBadge} color="secondary">{cruise.beautifulName}</Box> : ''}
                                                    {cruise.ship.photo
                                                        ? <Link href={`/cruises/[id]`} as={`/cruises/${cruise.id}`}>
                                                            <a>
                                                                <Button variant="text">
                                                                    <Image 
                                                                        layout="fill" 
                                                                        src={cruise.ship?.photo?.path} 
                                                                        placeholder="blur" 
                                                                        blurDataURL="../img/blur-large.jpg" 
                                                                        alt={cruise.ship?.name} />
                                                                </Button>
                                                            </a>
                                                            </Link>
                                                        :   <Skeleton variant="rectangular" width="100%" height="100%" />
                                                    }
                                                </Box>
                                                <CardContent className={styles.cardContent}>
                                                    <Box>
                                                        <Link href={`/cruises/[id]`} as={`/cruises/${cruise.id}`}>
                                                            <a>
                                                                <Typography title={cruise.route} gutterBottom variant="h6" component="div" className={styles.cardTitle}>
                                                                    <Dotdotdot clamp={4}>
                                                                        {cruise.route}
                                                                    </Dotdotdot>
                                                                </Typography>
                                                            </a>
                                                        </Link>
                                                        {cruise.days
                                                            ?   <Typography className={styles.dates} variant="body2">
                                                                    {moment(cruise.dateStart).format('DD.MM.YYYY')}&nbsp;-&nbsp; 
                                                                    {moment(cruise.dateEnd).format('DD.MM.YYYY')} / 
                                                                    &nbsp;<Typography component="span" variant="body2" color="secondary" style={{fontWeight: '700'}}>{cruise.days} дней</Typography>
                                                                </Typography>
                                                            :   null
                                                        }
                                                        {cruise.freeCabins
                                                            ?   <Typography className={styles.freeCabins} variant="body2">
                                                                    Свободных кают - <Typography component="span" variant="body2" color="secondary" style={{fontWeight: '700'}}>{cruise.freeCabins}</Typography>
                                                                </Typography>
                                                            :   <Typography className={styles.freeCabins} variant="body2">
                                                                    Свободных кают нет
                                                                </Typography>
                                                        }
                                                    </Box>
                                                    <Box>
                                                        {cruise.min_price_rur
                                                            ?   <Typography variant="body2" className={styles.minPrice}>
                                                                    от <Typography component="span" variant="h6" color="#ef5350">{cruise.min_price_rur} <FontAwesomeIcon style={{fontSize: '1.05rem', fontWeight: 'normal'}} icon={faRubleSign} /></Typography>
                                                                </Typography>
                                                            :   null
                                                        }
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )}
                                </Grid>
                                <Pagination className={styles.pagination} count={cruises.pagination.pages.total} variant="outlined" color="primary" onChange={handlePaginationChange} />
                            </>
                        :   <Alert sx={{width: '100%', justifyContent: 'center', bgcolor: 'rgba(253, 237, 237, 1)!important' }} severity="error">Sorry, we got an error {statusText} {statusCode}</Alert>
                    }
                </Box>
            </Container>
        </Layout>
    );
}

export default RiverCruises;
