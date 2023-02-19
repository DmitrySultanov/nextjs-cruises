import React, { useState } from 'react';
import { Grid, Box, Container, Badge, Typography, Button, Table, TableBody, TableCell, TableRow, Alert } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import moment from 'moment';
import 'moment/locale/ru';
import Layout from '../../components/Layout';
import Breadcrumbs from '../../components/Breadcrumbs';
import ShipInfo from '../../components/Cruise/ShipInfo';
import CruisePorts from '../../components/Cruise/CruisePorts';
import APIService from '../../api/APIService';
import ProgressBar from "@ramonak/react-progress-bar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRubleSign, faShip, faWater, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import styles from '../../styles/Cruises.module.scss';
import BookingCabinsModal from '../../components/Cruise/BookingCabinsModal';


export const getServerSideProps = async ({ params, res }) => {
  try {
    const response = await APIService.getCruise(params.id)
    const data = await response.data;

    if (!data) {
      return {
        notFound: true
      }
    }

    return {
      props: { 
        cruise: data,
        statusCode: 200,
        statusText: null
      }
    }
  } catch(error) {
    return {
      props: {
        cruise: null,
        statusCode: error.response.status,
        statusText: error.response.statusText
      }
    }
  }
}

export default function Cruise({cruise, statusCode, statusText}) {
  moment.locale('ru')
  const [openBookingModal, setOpenBookingModal] = useState(false)
  const handleOpenBookingModal = () => {
    setOpenBookingModal(true)
  } 

  console.log(cruise)

  return (
    <Layout>
      <Head>
        <title>КруизеШтерн - {cruise.routeShort ? cruise.routeShort : cruise.name}</title>
      </Head>
      <Container maxWidth="lg">
        <Breadcrumbs />
        {statusCode === 200
          ? <>
              <Box className={styles.cruise}>
                <Typography className={styles.title} variant="h5" component="h1">{cruise.route}</Typography>
                <Typography className={styles.dates} variant="body2">
                  {moment(cruise.dateStart).format('LLL')}&nbsp;—&nbsp;{moment(cruise.dateEnd).format('LLL')} / 
                  &nbsp;<Typography component="span" variant="body2" color="secondary">{cruise.days} дней</Typography>
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={6}>
                    <Box className={styles.image}>
                      {cruise.beautifulName
                        ? <Badge overlap="rectangular" badgeContent={cruise.beautifulName} className={styles.beautifulNameBadge} anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}></Badge>
                        : null
                      }
                      <Image layout="fill" src={cruise.ship?.photo?.path} alt={cruise.ship?.name} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Table aria-label="simple table" size="small" className={styles.table}>
                      <TableBody>
                        <TableRow sx={{ '& > td': { border: 0 } }}>
                          <TableCell sx={{pl: 0}}>
                            <Typography variant="body1" component="span">Занятых кают - </Typography>
                          </TableCell>
                          <TableCell>
                            <ProgressBar 
                                completed={cruise.cabinCapacity.busy} 
                                maxCompleted={cruise.cabinCapacity.total}
                                className={styles.progressBar}
                                bgColor="#f50057"
                                height="16px"
                                labelSize="13px"
                                animateOnRender={true}
                                labelAlignment="outside"
                                customLabel={String(cruise.cabinCapacity.busy)}
                                labelColor="#222" />
                          </TableCell>
                        </TableRow>
                        <TableRow sx={{ '& > td': { border: 0 } }}>
                          <TableCell sx={{pl: 0}}>
                            <Typography variant="body1" component="span">Свободных кают - </Typography>
                          </TableCell>
                          <TableCell>
                            <ProgressBar 
                                completed={cruise.cabinCapacity.free} 
                                maxCompleted={cruise.cabinCapacity.total}
                                className={styles.progressBar}
                                bgColor="rgb(76, 175, 80)"
                                height="16px"
                                labelSize="13px"
                                animateOnRender={true}
                                labelAlignment="outside"
                                customLabel={String(cruise.cabinCapacity.free)}
                                labelColor="#222" />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Table aria-label="simple table" size="small">
                      <TableBody>
                        <TableRow sx={{ '& > td': { border: 0 } }}>
                          <TableCell colSpan="2" sx={{width: '50%', pl: 0}}>
                          <Typography variant="body1">
                              <FontAwesomeIcon icon={faShip} /> {cruise.ship?.name}
                          </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow sx={{ '& > td': { border: 0 } }}>
                          <TableCell colSpan="2" sx={{pl: 0}}>
                          <FontAwesomeIcon icon={faWater} />&nbsp;
                          {cruise.rivers && cruise.rivers.map((river, idx) =>
                              <Typography key={idx} variant="body2" component="span" style={{marginRight: '.25rem'}}>
                              {river.name},
                              </Typography>
                          )}
                          </TableCell>
                        </TableRow>
                        <TableRow sx={{ '& > td': { border: 0 } }}>
                          <TableCell sx={{pl: 0}}>
                          {cruise.map
                              ? <Link href={cruise.map}>
                                  <a target="_blank" rel="noopener noreferrer">
                                      <FontAwesomeIcon icon={faLocationDot} />
                                      <Typography variant="body1" component="span" style={{marginLeft: '.25rem'}}>
                                      Смотреть маршрут
                                      </Typography>
                                  </a>
                              </Link>
                              : null
                          }
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <CruisePorts cruise={cruise} />
                    
                    <Box sx={{mt: 2}}>
                      {cruise.min_price_rur
                        ?  <Typography component="span" variant="h5" color="primary" style={{fontWeight: '700'}}><Typography component="span" variant="body1" color="primary">от</Typography> {cruise.min_price_rur} <FontAwesomeIcon style={{fontSize: '1.05rem', fontWeight: 'normal'}} icon={faRubleSign} /></Typography> 
                        :  cruise.min_price 
                          ?  <Typography component="span" variant="h5" color="primary" style={{fontWeight: '700'}}><Typography component="span" variant="body1" color="primary">от</Typography> {cruise.min_price} <FontAwesomeIcon style={{fontSize: '1.05rem', fontWeight: 'normal'}} icon={faRubleSign} /></Typography>
                          :  <Typography component="span" variant="h5" color="secondary">Поставщик не предоставил минимальную цену</Typography>
                      }
                      {cruise.max_price
                        ?  <Typography component="span" variant="h5" color="primary" style={{marginLeft: '1rem', fontWeight: '700'}}><Typography component="span" variant="body1" color="primary">до</Typography> {cruise.max_price} <FontAwesomeIcon style={{fontSize: '1.05rem', fontWeight: 'normal'}} icon={faRubleSign} /></Typography> 
                        :  null
                      }
                    </Box>
                    <Button sx={{ mt: 2 }} variant="contained" color="primary" size="large" onClick={handleOpenBookingModal}>Забронировать каюту</Button>
                      
                  </Grid>
                </Grid>

                <Grid container spacing={4}>
                  <Grid item xs={12} sx={{mt: 2}}>
                    {cruise.include
                      ? <>
                          <Typography className={styles.incommingText} style={{fontWeight: '700'}} variant="caption">Включено:</Typography>
                          <Typography className={styles.incommingText} component="div" variant="caption" dangerouslySetInnerHTML={{ __html: cruise.include }}></Typography>
                        </> 
                      : null
                    }
                  </Grid>

                  <Grid item xs={12}>
                    <ShipInfo ship={cruise.ship.id} />
                    
                    <Box sx={{textAlign: 'center', my: 4}}>
                      <Button sx={{ mt: 2 }} variant="contained" color="primary" size="large" onClick={handleOpenBookingModal}>Забронировать каюту</Button>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    {cruise.discountsText
                      ? <>
                          <Typography style={{fontWeight: '700', marginBottom: '.5rem'}} variant="subtitle1">Действующие скидки:</Typography>
                          <Typography className={styles.incommingText} component="div" variant="body2" dangerouslySetInnerHTML={{ __html: cruise.discountsText }}></Typography>
                        </>
                      : null
                    }
                  </Grid>
                </Grid>
              </Box>

              <BookingCabinsModal 
                openBookingModal={openBookingModal} 
                setOpenBookingModal={setOpenBookingModal}
                cruiseId={cruise.id} />
            </>
          : <Alert sx={{width: '100%', justifyContent: 'center', bgcolor: 'rgba(253, 237, 237, 1)!important' }} severity="error">Sorry, we got an error {statusText} {statusCode}</Alert>
        }
      </Container>
    </Layout>
  )
}