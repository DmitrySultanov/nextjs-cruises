import React, { FC, useState } from 'react';
// @ts-ignore
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
// @ts-ignore
import ProgressBar from "@ramonak/react-progress-bar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRubleSign, faShip, faWater, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import styles from '../../styles/Cruises.module.scss';
import BookingCabinsModal from '../../components/Cruise/BookingCabinsModal';
import { ICruise } from '../../types';


export const getServerSideProps = async ( context:any ) => {
  const response:any = await APIService.getCruise(context.query.id)
  const data = await response.data;

  if (!data) {
    return {
      notFound: true,
      props: {
        cruise: null,
        statusCode: response.status ? response.status : null,
        statusText: response.message
      }
    }
  }

  return {
    props: { 
      cruise: data,
      statusCode: 200,
      statusText: null
    }
  }
}

interface ICruisesProps {
  cruise: ICruise
  statusCode: number | null
  statusText: string | null
}

const Cruise: FC<ICruisesProps> = ({cruise, statusCode, statusText}) => {
  moment.locale('ru')
  const [openBookingModal, setOpenBookingModal] = useState(false)
  const handleOpenBookingModal = () => {
    setOpenBookingModal(true)
  } 
  let preapredRiversArray: string[] = []

  Object.keys(cruise.rivers).forEach(function(key) {
    preapredRiversArray.push(cruise.rivers[key].name)
  })


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
                                completed={Number(cruise.cabinCapacity.busy)} 
                                maxCompleted={Number(cruise.cabinCapacity.total)}
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
                                completed={Number(cruise.cabinCapacity.free)} 
                                maxCompleted={Number(cruise.cabinCapacity.total)}
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
                          <TableCell sx={{width: '50%', pl: 0, colspan: 2}}>
                          <Typography variant="body1">
                              <FontAwesomeIcon icon={faShip} /> {cruise.ship?.name}
                          </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow sx={{ '& > td': { border: 0 } }}>
                          <TableCell sx={{pl: 0, colspan: 2}}>
                            <FontAwesomeIcon icon={faWater} />&nbsp;
                            {Object.values(preapredRiversArray).map((item, idx) => 
                                <Typography key={idx} variant="body2" component="span" style={{marginRight: '.25rem'}}>
                                  {item},
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

                    <CruisePorts portStartId={cruise.portStart} portEndId={cruise.portEnd} />
                    
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
                    <ShipInfo shipId={cruise.ship.id} />
                    
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

export default Cruise;

// export async function getStaticProps(context) {
//   const response = await APIService.getCruise(context.params.id)
//   const data = await response.data;

//   return {
//     props: { 
//       cruise: data,
//       statusCode: 200,
//       statusText: null
//     }
//   }
// }

// export async function getStaticPaths() {
//   const response = await APIService.getCruises({})
//   const cruises = await response.data;
  
//   const paths = cruises.map((cruise) => ({
//     params: {id: cruise.id}
//   }))

//   return {
//     paths,
//     fallback: false
//   }
// }