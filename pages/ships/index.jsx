import React, {useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout';
import APIService from '../../api/APIService';
import { Grid, Box, Container, Typography, Button, Alert, 
    Pagination, Card, CardContent, Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import styles from '../../styles/Ships.module.scss';


export const getServerSideProps = async (context) => {
    const response = await APIService.getShips(context.query)
    const data = await response.data

    if (!data) {
        return {
            props: {
                ships: null,
                status: response.status ? response.status : 404,
                statusText: response.message ? response.message : ''
            }
        }
    }

    return {
        props: {
            ships: data,
            statusCode: 200,
            statusText: null
        }
    }
}


const Ships = ({ships, statusCode, statusText}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const router = useRouter()
    console.log(ships)

    const handlePaginationChange = (event, value) => {
        setCurrentPage(value)
        router.push({
            pathname: router.pathname,
            query: { 
                limit: 24,
                page: value
            }
        })
    }


    return (
        <Layout>
            <Head>
                <title>КруизеШтерн - Теплоходы</title>
            </Head>
            <Container maxWidth="lg">
                <Breadcrumbs />
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="h1" sx={{ mb: 3}}>Теплоходы</Typography>
                        {statusCode === 200
                            ?   <Box className={styles.Ships}>
                                    <Grid container spacing={2}>
                                        {ships.data != null && ships.data.map((ship, idx) =>
                                            <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                                                <Card className={styles.card}>
                                                    <Box className={styles.cardMedia}>
                                                        {ship.files?.photo?.path
                                                            ?   <Link href={`/ships/[id]`} as={`/ships/${ship.id}`}>
                                                                    <a>
                                                                        <Button variant="text">
                                                                            <Image  placeholder="blur" 
                                                                                blurDataURL="../img/blur.png" 
                                                                                layout="fill" 
                                                                                src={ship.files?.photo?.path} 
                                                                                alt={ship?.name} />
                                                                        </Button>
                                                                    </a>
                                                                </Link>
                                                            :   <Skeleton variant="rectangular" width="100%" height="100%" />
                                                        }
                                                    </Box>
                                                    <CardContent className={styles.cardContent}>
                                                        <Link href={`/ship/[id]`} as={`/ships/${ship.id}`}>
                                                            <a>
                                                                <Typography gutterBottom variant="h6" component="span" className={styles.cardTitle}>
                                                                    {ship.name}
                                                                </Typography>
                                                            </a>
                                                        </Link>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        )}
                                    </Grid>
                                    <Pagination count={ships.pagination.pages.total} page={currentPage} variant="outlined" color="primary" onChange={handlePaginationChange} sx={{mt: 3, display: 'flex', justifyContent: 'center'}} />
                                </Box>
                            :   <Alert sx={{width: '100%', justifyContent: 'center', bgcolor: 'rgba(253, 237, 237, 1)!important' }} severity="error">Sorry, we got an error {statusText} {statusCode}</Alert>
                        }
                       
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
}

export default Ships;
