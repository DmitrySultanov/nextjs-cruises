import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Grid, Box, Container, AppBar, Slide, useScrollTrigger, List, ListItem } from '@mui/material';
import styles from '../styles/Header.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faVk, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useRouter } from 'next/router';


const Header = (props) => {
    const router = useRouter()

    function HideOnScroll(props) {
        const { children, window } = props;
        // Note that you normally won't need to set the window ref as useScrollTrigger
        // will default to window.
        // This is only being set here because the demo is in an iframe.
        const trigger = useScrollTrigger({
          target: window ? window() : undefined,
        });
      
        return (
          <Slide appear={false} direction="down" in={!trigger}>
            {children}
          </Slide>
        );
    }

    return (
        <HideOnScroll {...props}>
            <AppBar color="inherit" className={styles.header}>
                <Container maxWidth="lg">
                    <Grid container spacing={0} className={styles.headerRow} alignItems="center">
                        <Grid item xs={3} lg={2}>
                            {/* <Link href="/" passHref><a><Image className={styles.logo} src="/img/logo_arland.png" alt="logo" width="128" height="40" /></a></Link> */}
                            <Link href="/" passHref><a className={styles.logo}>LOGOTYPE</a></Link>
                        </Grid>
                        <Grid item xs={9} lg={10}>
                            <Grid container justifyContent={{xl: 'space-between', xs: 'flex-end'}} alignItems="center">
                                <List className={styles.navbar}>
                                    <ListItem className={router.pathname == "/" ? styles.active : ""}>
                                        <Link href="/"><a>Главная</a></Link>
                                    </ListItem>
                                    <ListItem className={router.pathname == "/about" ? styles.active : ""}>
                                        <Link href="/about"><a>О нас</a></Link>
                                    </ListItem>
                                    <ListItem className={router.pathname == "/information" ? styles.active : ""}>
                                        <Link  href="/information"><a>Информация</a></Link>
                                    </ListItem>
                                    <ListItem className={router.pathname == "/ships" ? styles.active : ""}>
                                        <Link  href="/ships"><a>Теплоходы</a></Link>
                                    </ListItem>
                                </List>
                                <Box flexWrap="nowrap" sx={{ display: 'flex' }}>
                                    <Box className={styles.phones}>
                                        <FontAwesomeIcon icon={faPhone} />
                                        <Box>
                                            <Link href="/"><a>+7 (999) 999-99-99</a></Link>
                                        </Box>
                                        <Box>
                                            <Link href="/"><a>+7 (888) 888-88-88</a></Link>
                                        </Box>
                                    </Box>
                                    <Box className={styles.socLinks}>
                                        <Link href="/">
                                            <a className={styles.vk} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faVk} /></a>
                                        </Link>
                                        <Link href="/">
                                            <a className={styles.telegram} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTelegram} /></a>
                                        </Link>
                                        <Link href="/">
                                            <a className={styles.whatsapp} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsapp} /></a>
                                        </Link>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* <Grid container spacing={2} className={styles.navbar}>
                        <Grid item xs={12}>
                            <Box component="nav" className={styles.navbarNav}>
                                <Link href="/"><a>Главная</a></Link>
                                <Link href="/cruises"><a>Речные круизы</a></Link>
                            </Box>
                        </Grid>
                    </Grid> */}
                </Container>
            </AppBar>
        </HideOnScroll>
    );
}

export default Header;
