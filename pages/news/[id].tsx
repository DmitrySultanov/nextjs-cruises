import React, { FC } from 'react';
import Layout from '../../components/Layout';
import { Box, Container, Typography, Badge } from '@mui/material';
import APIService from '../../api/APIService';
import Breadcrumbs from '../../components/Breadcrumbs';
import styles from '../../styles/News.module.scss';
import Image from 'next/image';
import Head from 'next/head';
import { INews } from '../../types/index';


export async function getStaticPaths() {
  const response:any = await APIService.getAllNews()
  const allNews = await response.data;

  const paths = allNews.data.map((news: INews) => ({
    params: { 
      id: news.id.toString() 
    },
  }))

  return { 
    paths, 
    fallback: false 
  }
}

export async function getStaticProps({ params }: any) {
  const response: any = await APIService.getNews(params.id)
  const news = await response.data;

  return {
    props: {
      news
    }
  }
}

interface INewsProps {
  news: INews
}


const News: FC<INewsProps> = ({news}) => {
  return (
    <Layout>
      <Head>
        <title>КруизеШтерн - {news.name}</title>
      </Head>
      <Container maxWidth="lg">
        <Breadcrumbs />
        <Box className={styles.newsSingle}>
          <Badge overlap="rectangular" color="primary" badgeContent={news.dateNews} className={styles.date}></Badge>
          <Typography variant="h4" component="h1">{news.name}</Typography>
          {news.image
            ? <Box className={styles.picture}>
                <Image layout="fill" src={news.image} alt="" />
              </Box>
            : null
          }
          <Typography variant="body1" component="p" dangerouslySetInnerHTML={{ __html: news.text }} />
        </Box>
      </Container>
    </Layout>
  )
}

export default News;
