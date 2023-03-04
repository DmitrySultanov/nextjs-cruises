import React, { useState, useEffect, useMemo } from 'react';
import { Box, List, ListItem, Typography, Alert } from '@mui/material';
import { useFetching } from '../api/useFetching';
import APIService from '../api/APIService';
import Link from 'next/link';
import styles from '../styles/News.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Loader from './Loader';


const News = ({title}) => {
    const [news, setNews] = useState([])

    const [fetchNews, isNewsLoading, newsError] = useFetching( async() => {
        const response = await APIService.getAllNews(4)
        const data = await response.data;
        setNews(data)
    })

    useEffect(() => {
        fetchNews()
    }, [])


    const newsMemo = useMemo(() => (
        {news, setNews}
    ), [news])

    return (
        <>
            <Box className={styles.newsComponent}>
                {title && <Typography component="h3" variant="h6">{title}</Typography>}
                {newsError
                    ?   <Alert sx={{width: '100%', justifyContent: 'center' }} severity="error">Sorry, we got an error {newsError}</Alert>
                    :   isNewsLoading
                    ?   <Loader />
                    :   <List className={styles.newsComponentList}>
                            {newsMemo.news.data?.map((item, idx) => 
                                <ListItem key={idx}>
                                    <Typography className={styles.dateNews} variant="body1">{item.dateNews}</Typography>
                                    <Link href={`/news/[id]`} as={`/news/${item.id}`}><a>{item.name}</a></Link>    
                                </ListItem>
                            )}
                        </List>
                }
                <Link href="/news"><a>Все новости <FontAwesomeIcon icon={faArrowRight} /></a></Link>
            </Box>
        </>
    );
}

export default News;
