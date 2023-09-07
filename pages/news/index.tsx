import React, { FC } from 'react';
import { Grid, Box, Container, Typography, Card, CardContent } from '@mui/material';
import styles from '../../styles/News.module.scss';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import APIService from '../../api/APIService';
import Layout from '../../components/Layout';
import Breadcrumbs from '../../components/Breadcrumbs';
import Dotdotdot from 'react-dotdotdot';
import { INews } from '../../types';


export const getStaticProps = async () => {
    const response: any = await APIService.getAllNews(20)
    const data = await response.data.allNews

    return {
        props: {allNews: data}
    }
}

interface IAllNewsProps {
    allNews: {
        count: number
        data: INews[]
    }
}

const News: FC<IAllNewsProps> = ({allNews}) => {
    return (
        <Layout>
            <Head>
                <title>КруизеШтерн - Все новости</title>
            </Head>
            <Box className={styles.newsList}>
                <Container maxWidth="lg">
                    <Breadcrumbs />
                    <Typography variant="h4" component="h1">Все новости</Typography>
                    <Grid container spacing={2}>
                        {allNews.data?.map((news, idx) => 
                            <Grid item lg={3} key={idx}>
                                <Card className={styles.card}>
                                    <Box className={styles.cardMedia}>
                                        <Link href={`/news/[id]`} as={`/news/${news.id}`}>
                                            <a>
                                                <Image layout="fill" src={news?.image} alt="" />
                                            </a>
                                        </Link>
                                    </Box>
                                    <CardContent>
                                        <Link href={`/news/[id]`} as={`/news/${news.id}`}>
                                            <a>
                                                <Typography gutterBottom variant="h6" component="div" className={styles.cardTitle}>
                                                    <Dotdotdot clamp={4}>
                                                        {news.name}
                                                    </Dotdotdot>
                                                </Typography>
                                            </a>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                </Container>
            </Box>
        </Layout>
    );
}

export default News;
