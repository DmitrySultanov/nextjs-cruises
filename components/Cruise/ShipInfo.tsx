import React, { useState, useEffect, useMemo, FC } from 'react';
import { Box, Alert, Typography } from '@mui/material/';
import { useFetching } from '../../api/useFetching';
import APIService from '../../api/APIService';
import Slider from '../Slider';
import Image from 'next/image';
import CabinTypes from './CabinTypes';
import Loader from '../Loader';
import styles from '../../styles/Cruises.module.scss';
import { IShipInfo } from '../../types';


interface IShipInfoProps {
    shipId: number
}


const ShipInfo: FC<IShipInfoProps> = ({shipId}) => {
    const [ship, setShip] = useState<IShipInfo>({ name: '', typeName: '', photos: [], descriptionBig: '', cabinTypes: [], files: {} })

    const [fetchShip, isShipLoading, shipError] = useFetching( async() => {
        const response: any = await APIService.getShip(shipId)
        const data = await response.data;
        setShip(data)
    })

    useEffect(() => {
        fetchShip()
    }, [])

    // const shipMemo = useMemo(() => (
    //     {ship}
    // ), [ship])

    return (
        <>
            {shipError
                ?   <Alert sx={{width: '100%', justifyContent: 'center' }} severity="error">Sorry, we got an error {shipError}</Alert>
                :   isShipLoading
                ?   <Loader />
                :   <Box className={styles.shipInfo}>
                        <Typography variant="subtitle1">
                            <Typography variant="caption" sx={{fontWeight: 'bold', fontSize: '1rem'}}>{ship.name}</Typography> 
                            {ship.typeName ? ship.typeName : ''}
                        </Typography>

                        {ship.photos
                            ?   <Slider photos={ship.photos} slidesPerView={3} customClass={styles.slider} />
                            :   null
                        }
                        {ship.descriptionBig
                            ?   <Typography 
                                    className={styles.incommingText} 
                                    variant="caption" 
                                    dangerouslySetInnerHTML={{ __html: ship.descriptionBig }}></Typography>
                            :   null
                        }
                        {ship.cabinTypes 
                            ?   <CabinTypes types={ship.cabinTypes} />
                            :   null
                        }
                        {ship.files?.scheme?.path
                            ?   <Box sx={{mt: 3}}>
                                    <Image layout="responsive" 
                                       objectFit='contain'
                                       width={1920} 
                                       height={1200} 
                                       src={ship.files?.scheme?.path} 
                                       alt={ship.files?.scheme?.name} 
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
