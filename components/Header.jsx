import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Grid, Box, Container, AppBar, Slide, useScrollTrigger, } from '@mui/material';
import styles from '../styles/Header.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faVk, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';


const Header = (props) => {

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
                        <Grid item xs={3}>
                            <Link href="/" passHref><a><Image className={styles.logo} src="/img/logo_arland.png" alt="logo" width="128" height="40" /></a></Link>
                        </Grid>
                        <Grid item xs={9}>
                            <Grid container justifyContent="flex-end" alignItems="center">
                                <Box className={styles.phones}>
                                    <FontAwesomeIcon icon={faPhone} />
                                    <Box>
                                        <Link href="tel:+78126027503"><a>+7 (812) 602-75-03</a></Link>
                                    </Box>
                                    <Box>
                                        <Link href="tel:+78007076342"><a>+7 (800) 707 63 42</a></Link>
                                    </Box>
                                </Box>
                                <Box className={styles.socLinks}>
                                    <Link href="https://vk.com/arlandtravel">
                                        <a className={styles.vk} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faVk} /></a>
                                    </Link>
                                    <Link href="https://t.me/arland_tours">
                                        <a className={styles.telegram} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTelegram} /></a>
                                    </Link>
                                    <Link href="https://wa.me/79633260086">
                                        <a className={styles.whatsapp} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsapp} /></a>
                                    </Link>
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
