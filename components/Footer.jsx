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
                        <Grid item xs={12} md={3}>
                            <Link href="/" passHref><a className={styles.logo}>LOGOTYPE</a></Link>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Box className={styles.footerItem}>
                                        <Box className={styles.footerItemTitle}>Санкт-Петербург</Box>
                                        <Box className={styles.footerItemRow}><FontAwesomeIcon icon={faLocationDot} />ул. Большая Монетная, 144</Box>
                                        <Box className={styles.footerItemRow}><FontAwesomeIcon icon={faPhone} />
                                            <Link href="/">+7 (999) 999-99-99</Link>
                                        </Box>
                                        <Box className={styles.footerItemRow}><FontAwesomeIcon icon={faPhone} />
                                            <Link href="/">+7 (888) 888-88-88</Link>
                                        </Box>
                                        <Box className={styles.footerItemRow}><FontAwesomeIcon icon={faEnvelope} />
                                            <Link href="/">cruiseshtern@mail.com</Link>
                                        </Box>
                                        <Box className={styles.footerItemRow}>
                                            <FontAwesomeIcon icon={faCircleInfo} />
                                            <Box component="p">пн-пт: с 11:00 до 19:00,</Box>
                                            <Box component="p">сб-вс: выходные</Box>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
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
                            <Box>ООО «Круизештерн» <FontAwesomeIcon icon={faCopyright} /> 2023</Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default Footer;
