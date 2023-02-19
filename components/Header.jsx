import React, { useState } from 'react';
import Link from 'next/link';
import { Grid, Box, Container, AppBar, Slide, useScrollTrigger, List, ListItem, SwipeableDrawer, IconButton  } from '@mui/material';
import styles from '../styles/Header.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faPhone, faBars } from "@fortawesome/free-solid-svg-icons";
import { faVk, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useRouter } from 'next/router';


const Header = (props) => {
    const router = useRouter()
    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)

    const [stateDrawer, setStateDrawer] = useState(false)

    const toggleDrawer = (state) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
    
        setStateDrawer(state);
    }

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
        <>
            <HideOnScroll {...props}>
                <AppBar color="inherit" className={styles.header}>
                    <Container maxWidth="lg">
                        <Grid container spacing={0} className={styles.headerRow} alignItems="center">
                            <Grid item xs={3} lg={2} xl={2}>
                                {/* <Link href="/" passHref><a><Image className={styles.logo} src="/img/logo_arland.png" alt="logo" width="128" height="40" /></a></Link> */}
                                <Link href="/" passHref><a className={styles.logo}>LOGOTYPE</a></Link>
                            </Grid>
                            <Grid item xs={9} lg={10} xl={10}>
                                <Grid container justifyContent={{xl: 'space-between', xs: 'flex-end'}} alignItems="center">
                                    <Grid item xs={12} md={8} lg={7} sx={{ display: { xs: 'none', lg: 'block' } }}>
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
                                            {/* <ListItem className={router.pathname == "/ships" ? styles.active : ""}>
                                                <Link  href="/ships"><a>Теплоходы</a></Link>
                                            </ListItem> */}
                                        </List>
                                    </Grid>
                                    <Grid item xs={12} md={4} lg={5}>
                                        <Grid container spacing={2} alignItems="center" justifyContent={{ xs: 'flex-end', lg: 'flex-start' }}>
                                            <Grid item sx={{ display: { xs: 'none', lg: 'block' } }}>
                                                <Box className={styles.phones}>
                                                    <FontAwesomeIcon icon={faPhone} />
                                                    <Box>
                                                        <Link href="/"><a>+7 (999) 999-99-99</a></Link>
                                                    </Box>
                                                    <Box>
                                                        <Link href="/"><a>+7 (888) 888-88-88</a></Link>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item>
                                                <Box sx={{ display: 'flex'}}>
                                                    <Box className={styles.socLinks} sx={{ display: { xs: 'none', sm: 'flex' }}} alignItems="center">
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
                                                    <IconButton className={styles.menuToggler} onClick={toggleDrawer(true)} sx={{ display: { xs: 'flex', lg: 'none' }, ml: 2 }}>
                                                        <FontAwesomeIcon icon={faBars} />
                                                    </IconButton>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </AppBar>
            </HideOnScroll>
            <SwipeableDrawer
                anchor="right"
                open={stateDrawer}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <Box className={styles.mobileMenu}>
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
                        {/* <ListItem className={router.pathname == "/ships" ? styles.active : ""}>
                            <Link  href="/ships"><a>Теплоходы</a></Link>
                        </ListItem> */}
                    </List>
                    <Box className={styles.phones} sx={{ display: { xs: 'none', sm: 'flex' }}}>
                        <Box>
                            <Link href="/"><a>+7 (999) 999-99-99</a></Link>
                        </Box>
                        <Box>
                            <Link href="/"><a>+7 (888) 888-88-88</a></Link>
                        </Box>
                    </Box>
                    <Box className={styles.socLinks} sx={{ display: { xs: 'flex', sm: 'none' }}} alignItems="center">
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
            </SwipeableDrawer>
        </>
    );
}

export default Header;
