import React from 'react';
import Layout from '../../components/Layout';
import { Box, Container, Typography, Badge, Skeleton, Grid, Avatar, Chip  } from '@mui/material';
import APIService from '../../api/APIService';
import Breadcrumbs from '../../components/Breadcrumbs';
import Head from 'next/head';
import styles from '../../styles/Ships.module.scss';
import Image from 'next/image';
import Slider from '../../components/Slider';

export async function getStaticPaths() {
  const response = await APIService.getShips()
  const ships = await response.data;

  const paths = ships.data.map((ship) => ({
    params: { 
      id: ship.id.toString() 
    },
  }))

  return { 
      paths, 
      fallback: false 
  }
}

export async function getStaticProps({ params }) {
  const response = await APIService.getShip(params.id)
  const ship = await response.data;

  if (!ship) {
    return {
        props: {
            ship: null,
            status: response.status ? response.status : 404,
            statusText: response.message ? response.message : ''
        }
    }
}

  return {
    props: {
      ship,
      statusCode: 200,
      statusText: null
    }
  }
}


const Ship = ({ship, statusCode, statusText}) => {
  console.log(ship, statusCode, statusText)
  return (
    <Layout>
      <Head>
        <title>КруизеШтерн - Теплоход {ship.name}</title>
      </Head>
      <Container maxWidth="lg">
      <Breadcrumbs />
      <Box className={styles.Ship}>
        <Grid container spacing={3}>
          <Grid item lg={6} md={6}>
            {ship.photos
              ?   <Slider photos={ship.photos} slidesPerView={1} autoplay="true" />
              :   <Skeleton variant="rectangular" width="100%" height="100%" />
            }
          </Grid>
          <Grid item lg={6} md={6}>
            <Typography component="h1" className={styles.title}>{ship.name} <Typography component="span">{ship.typeName ? ship.typeName : ''}</Typography></Typography>
            {ship.files.captainPhoto
              ? <Box className={styles.captain}>
                  <Avatar alt={ship.captain} src={ship.files.captainPhoto.path} sx={{ width: 56, height: 56 }} />
                  <Box sx={{ml: 1}}>
                    <Chip size="small" label="Капитан" />
                    <Typography component="p" sx={{mt: 1}}>{ship.captain}</Typography>
                  </Box>
                </Box>
              : null
            }
          </Grid>
        </Grid>
      </Box>
      </Container>
    </Layout>
  );
}

export default Ship;
