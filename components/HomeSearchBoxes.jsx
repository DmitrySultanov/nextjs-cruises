import React, { useEffect } from 'react';
import { Grid, Box, Container, Typography } from '@mui/material';
import styles from '../styles/Home.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';

const HomeSearchBoxes = () => {
    const router = useRouter()

    useEffect(() => {
        router.prefetch('/cruises')
    }, [router])

    const searchBoxesData = [
        { 
            id: 0, 
            imgSrc: '/img/0f7ae72113ac95ba9b0749177e12fb52f72a330f.jpg', 
            href: {
                pathname: '/cruises', 
                query: { keyword: 'this way' }
            }
        },
        { 
            id: 1, 
            imgSrc: '/img/0465256b264239f8cd018626a016cb2b5d50cfc0.jpg', 
            href: {
                pathname: '/cruises', 
                query: { keyword: 'this way' }
            }
        },
        { 
            id: 2, 
            imgSrc: '/img/c38213a8ab084b2dd0acc0c65718a2a4f942a392.jpg', 
            href: {
                pathname: '/cruises', 
                query: { keyword: 'this way' }
            }
        },
        { 
            id: 3, 
            imgSrc: '/img/8fb1bc498f7f4390bde3cc60c880fae3b80d589f.jpg', 
            href: {
                pathname: '/cruises', 
                query: { keyword: 'this way' }
            }
        },
        { 
            id: 4, 
            imgSrc: '/img/56fe04fbb63673c2d2b631d4623fc1e52a58b029.jpg', 
            href: {
                pathname: '/cruises', 
                query: { keyword: 'this way' }
            }
        },
        { 
            id: 5, 
            imgSrc: '/img/afe3067149fb604a68d1620adc82c8bd8a8b9596.jpg', 
            href: {
                pathname: '/cruises', 
                query: { keyword: 'this way' }
            }
        },
        { 
            id: 6, 
            imgSrc: '/img/7d05f69f0c5864ffd62e5f07b71ec19ba5fecbd9.jpg', 
            href: {
                pathname: '/cruises', 
                query: { keyword: 'this way' }
            }
        },
        { 
            id: 7, 
            imgSrc: '/img/9bb1fdc7fa8f6059b478967d1ad55b3923165bed.jpg', 
            href: {
                pathname: '/cruises', 
                query: { keyword: 'this way' }
            }
        },
        { 
            id: 8, 
            imgSrc: '/img/7fb6021a06e8dd7c63c0c0d8ce5861e96fa55a9e.jpg', 
            href: {
                pathname: '/cruises', 
                query: { keyword: 'this way' }
            }
        },
        { 
            id: 9, 
            imgSrc: '/img/a4c0653525715bc482c4eacb7c63e322ff8351d5.jpg', 
            href: {
                pathname: '/cruises', 
                query: { keyword: 'this way' }
            }
        },
    ]

    return (
        <Box className={styles.searchBoxesSection} component="section">
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item lg={3} md={4} sm={5} xs={12}>
                        <Sidebar />
                    </Grid>
                    <Grid item lg={9} md={8} sm={7} xs={12}>
                        <Grid container spacing={1}>
                            {searchBoxesData.map((item, index) => 
                                <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
                                    <Box className={styles.searchBox}>
                                        <Link href={ item.href }><a></a></Link>
                                        <Image layout="fill" src={item.imgSrc} alt="" />
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default HomeSearchBoxes;
