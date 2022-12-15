import React from 'react';
import Layout from '../../components/Layout';
import { Box, Container, Typography, Badge } from '@mui/material';
import APIService from '../../api/APIService';
import Breadcrumbs from '../../components/Breadcrumbs';
import styles from '../../styles/News.module.scss';
import Image from 'next/image';

export async function getStaticPaths() {
  const response = await APIService.getAllNews()
  const allNews = await response.data;

  const paths = allNews.data.map((news) => ({
    params: { 
      id: news.id.toString() 
    },
  }))

  return { 
      paths, 
      fallback: false 
  }
}

export async function getStaticProps({ params }) {
  const response = await APIService.getNews(params.id)
  const news = await response.data;

  return {
    props: {
      news
    }
  }
}

const News = (news) => {
    return (
      <Layout>
        <Container maxWidth="lg">
          <Breadcrumbs />
          <Box className={styles.newsSingle}>
            <Badge overlap="rectangular" color="primary" badgeContent={news.news?.dateNews} className={styles.date}></Badge>
            <Typography variant="h4" component="h1">{news.news?.name}</Typography>
            <Box className={styles.picture}>
              <Image layout="fill" src={news.news?.image} alt="" />
            </Box>
            <Typography variant="body1" component="p" dangerouslySetInnerHTML={{ __html: news.news?.text }} />
          </Box>
        </Container>
      </Layout>
    );
}

export default News;
