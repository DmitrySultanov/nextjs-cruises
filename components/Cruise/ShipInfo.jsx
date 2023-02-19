import React, { useState, useEffect, useMemo } from 'react';
import { Box, Alert, Typography } from '@mui/material/';
import { useFetching } from '../../api/useFetching';
import APIService from '../../api/APIService';
import Slider from '../Slider';
import Image from 'next/image';
import CabinTypes from '../Cruise/CabinTypes';
import Loader from '../Loader';
import styles from '../../styles/Cruises.module.scss';


const ShipInfo = (shipId) => {
    const [ship, setShip] = useState([])

    const [fetchShip, isShipLoading, shipError] = useFetching( async() => {
        const response = await APIService.getShip(shipId.ship)
        const data = await response.data;
        setShip(data)
    })

    useEffect(() => {
        fetchShip()
    }, [fetchShip])

    const shipMemo = useMemo(() => (
        {ship}
    ), [ship])

    return (
        <>
            {shipError
                ?   <Alert sx={{width: '100%', justifyContent: 'center' }} severity="error">Sorry, we got an error {shipError}</Alert>
                :   isShipLoading
                ?   <Loader />
                :   <Box className={styles.shipInfo}>
                        <Typography variant="subtitle1"><Typography variant="caption" sx={{fontWeight: 'bold', fontSize: '1rem'}}>{shipMemo.ship.name}</Typography> {shipMemo.ship.typeName ? shipMemo.ship.typeName : ''}</Typography>

                        {shipMemo.ship.photos
                            ?   <Slider photos={shipMemo.ship.photos} slidesPerView={3} customClass={styles.slider} />
                            :   null
                        }
                        {shipMemo.ship.descriptionBig
                            ?   <Typography className={styles.incommingText} variant="caption" dangerouslySetInnerHTML={{ __html: shipMemo.ship.descriptionBig }}></Typography>
                            :   null
                        }
                        {shipMemo.ship.cabinTypes 
                            ?   <CabinTypes types={shipMemo.ship.cabinTypes} />
                            :   null
                        }
                        {shipMemo.ship.files?.scheme?.path
                            ?   <Box sx={{mt: 3}}><Image layout="responsive" 
                                       objectFit='contain'
                                       width={1920} 
                                       height={1200} 
                                       src={shipMemo.ship.files?.scheme?.path} 
                                       alt={shipMemo.ship.files?.scheme?.name} 
                                       placeholder="blur" 
                                       blurDataURL="../img/blur-large.jpg"
                                    /></Box>
                            :   null
                        }
                    </Box>
            }
        </>
    );
}

export default ShipInfo;
