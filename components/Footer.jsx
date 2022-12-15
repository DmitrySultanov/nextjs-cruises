import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Grid, Box, Container } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone, faEnvelope, faCircleInfo, faCopyright } from "@fortawesome/free-solid-svg-icons";
import { faVk, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import styles from '../styles/Footer.module.scss';

const Footer = () => {
    
    return (
        <Box component="footer" className={styles.footer}>
            <Box className={styles.footerRow}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Link href="/" passHref><a><Image className={styles.logo} src="/img/logo_arland.png" alt="logo" width="128" height="40" /></a></Link>
                        </Grid>
                        <Grid item xs={9}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Box className={styles.footerItem}>
                                        <Box className={styles.footerItemTitle}>Санкт-Петербург</Box>
                                        <Box className={styles.footerItemRow}><FontAwesomeIcon icon={faLocationDot} />ул. Достоевского, 44Е</Box>
                                        <Box className={styles.footerItemRow}><FontAwesomeIcon icon={faPhone} />
                                            <Link href="tel:+78126027503">+7 (812) 602-75-03</Link>
                                        </Box>
                                        <Box className={styles.footerItemRow}><FontAwesomeIcon icon={faPhone} />
                                            <Link href="tel:+78007076342">+7 (800) 707 63 42</Link>
                                        </Box>
                                        <Box className={styles.footerItemRow}><FontAwesomeIcon icon={faEnvelope} />
                                            <Link href="mailto:tour@arland.pro">tour@arland.pro</Link>
                                        </Box>
                                        <Box className={styles.footerItemRow}>
                                            <FontAwesomeIcon icon={faCircleInfo} />
                                            <Box component="p">пн-пт: с 11:00 до 19:00,</Box>
                                            <Box component="p">сб-вс: выходные</Box>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
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
                    </Grid>
                </Container>
            </Box>
            <Box className={styles.footerCopyright}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box>ООО «Арланд» <FontAwesomeIcon icon={faCopyright} /> 2022</Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default Footer;
