import React, { useState, useEffect } from 'react';
import { Grid, Box, Container, Typography, Card, CardMedia, CardContent  } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import Image from 'next/image';
import Link from 'next/link';
import { useFetching } from '../../api/useFetching';
import APIService from '../../api/APIService';
import moment from 'moment';
import { useRouter } from 'next/router';
import Sidebar from '../Sidebar';
import FeedbackForm from '../FeedbackForm';
import styles from '../../styles/Home.module.scss';

const HomeSearchBoxes = () => {
    const router = useRouter()
    const curDate = moment().format('YYYY-MM-DD')
    // const [popularRouteById, setPopularRouteById] = useState([])
    // const [popularRoutes, setPopularRoutes] = useState([])

    useEffect(() => {
        router.prefetch('/cruises')
    }, [router])

    const searchBoxesData = [
        { 
            id: 0, 
            title: 'Валаам или Кижи',
            imgSrc: '/img/valaam.jpeg', 
            imgHeight: '240',
            href: {
                pathname: '/popular-routes', 
                query: { 
                    date: curDate,
                    popularRouteId: 6
                }
            }
        },
        { 
            id: 1, 
            title: 'Карелия',
            imgSrc: '/img/karelia.jpg', 
            imgHeight: '200',
            href: {
                pathname: '/popular-routes', 
                query: { 
                    date: curDate,
                    popularRouteId: 7
                }
            }
        },
        { 
            id: 2, 
            title: 'Круизы выходного дня',
            imgSrc: '/img/vyhodnoy_tur.jpg', 
            imgHeight: '260',
            href: {
                pathname: '/popular-routes', 
                query: { 
                    date: curDate,
                    popularRouteId: 3
                }
            }
        },
        { 
            id: 3, 
            title: 'Золотое кольцо России',
            imgSrc: '/img/zolotoe_kolco.jpg', 
            imgHeight: '180',
            href: {
                pathname: '/popular-routes', 
                query: { 
                    date: curDate,
                    popularRouteId: 4
                }
            }
        },
        { 
            id: 4, 
            title: 'Черноморские круизы',
            imgSrc: '/img/chernomorskii_kruiz.png', 
            imgHeight: '240',
            href: {
                pathname: '/popular-routes', 
                query: { 
                    date: curDate,
                    popularRouteId: 20
                }
            }
        },
        { 
            id: 5, 
            title: 'Круизы в/из Москвы',
            imgSrc: '/img/moskva_kruiz.jpg', 
            imgHeight: '200',
            href: {
                pathname: '/popular-routes', 
                query: { 
                    date: curDate,
                    popularRouteId: 18
                }
            }
        },
        { 
            id: 6, 
            title: 'Круизы в/из Санкт-Петербурга',
            imgSrc: '/img/peterburg_kruiz.jpg', 
            imgHeight: '240',
            href: {
                pathname: '/popular-routes', 
                query: { 
                    date: curDate,
                    popularRouteId: 41
                }
            }
        },
        { 
            id: 7, 
            title: 'Круизы из Нижнего Новгорода',
            imgSrc: '/img/46a7e6d94295b85e445d794f0df7bd1b.jpg', 
            imgHeight: '220',
            href: {
                pathname: '/popular-routes', 
                query: { 
                    date: curDate,
                    popularRouteId: 77
                }
            }
        },
        { 
            id: 8, 
            title: 'Обь и Иртыш',
            imgSrc: '/img/ob.jpg', 
            imgHeight: '200',
            href: {
                pathname: '/popular-routes',  
                query: { 
                    date: curDate,
                    popularRouteId: 84
                }
            }
        },
        { 
            id: 9, 
            title: 'Круизы в Ростов-на-Дону и Астрахань',
            imgSrc: '/img/rnd.webp', 
            imgHeight: '180',
            href: {
                pathname: '/popular-routes', 
                query: { 
                    date: curDate,
                    popularRouteId: 13
                }
            }
        },
        { 
            id: 10, 
            title: 'Круизы в Пермь и/или Уфу',
            imgSrc: '/img/underperm-2-1024x649_5c230d99518aa.jpg', 
            imgHeight: '240',
            href: {
                pathname: '/popular-routes', 
                query: { 
                    date: curDate,
                    popularRouteId: 12
                }
            }
        },
        { 
            id: 11, 
            title: 'Байкал',
            imgSrc: '/img/baikal.jpg', 
            imgHeight: '200',
            href: {
                pathname: '/popular-routes', 
                query: { 
                    date: curDate,
                    popularRouteId: 21
                }
            }
        },
        { 
            id: 12, 
            title: 'Енисей',
            imgSrc: '/img/enisei.webp', 
            imgHeight: '180',
            href: {
                pathname: '/popular-routes', 
                query: { 
                    date: curDate,
                    popularRouteId: 22
                }
            }
        },
    ]

    // const [fetchPopularRouteById, isPopularRoutebyIdLoading, popularRouteByIdError] = useFetching( async() => {
    //     const response = await APIService.getPopularRouteByIds(6)
    //     const data = await response.data;
    //     setPopularRouteById(data)
    // })

    // const [fetchPopularRoutes, isPopularRoutesLoading, popularRoutesError] = useFetching( async() => {
    //     const response = await APIService.getPopularRoutes()
    //     const data = await response.data;
    //     setPopularRoutes(data)
    // })
    
    // useEffect(() => {
    //     fetchPopularRoutes()
    //     fetchPopularRouteById()
    // }, [])

    // console.log(popularRouteById)
    // console.log(popularRoutes)

    return (
        <>
            <Box className={styles.searchBoxesSection} component="section">
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        <Grid item lg={9} md={8} sm={7} xs={12}>
                            <Grid container spacing={1}>
                                <Masonry columns={3} spacing={3} className={styles.masonry}>
                                    {searchBoxesData && searchBoxesData.map((item, index) => 
                                        <Card key={item.id} className={styles.card}>
                                            <Link href={{
                                                pathname: item.href.pathname,
                                                query: item.href.query
                                            }}><a></a></Link>    
                                            <CardMedia
                                                component="img"
                                                height={item.imgHeight ? item.imgHeight : '180'}
                                                image={item.imgSrc}
                                                alt=""
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h6" component="div" className={styles.title}>
                                                    {item.title}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    )}
                                </Masonry>
                            </Grid>
                        </Grid>
                        <Grid item lg={3} md={4} sm={5} xs={12}>
                            <Sidebar />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <FeedbackForm />
        </>
    );
}

export default HomeSearchBoxes;
