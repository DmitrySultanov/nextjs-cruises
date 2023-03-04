import React, { useState, useEffect, useMemo } from 'react';
import { useFetching } from '../api/useFetching';
import APIService from '../api/APIService';
import Loader from './Loader';
import { Typography, List, ListItem, Alert } from '@mui/material';


const ServicesOnBoard = () => {
    const [services, setServices] = useState([])

    const [fetchServices, isServicesLoading, servicesError] = useFetching( async() => {
        const response = await APIService.getServicesOnBoard()
        const data = await response.data;
        setServices(data)
    })
    
    useEffect(() => {
        fetchServices()
    }, [fetchServices])

    const servicesMemo = useMemo(() => (
        {services, setServices}
    ), [services])

    return (
        <>
            {servicesError
                ?   <Alert sx={{width: '100%', justifyContent: 'center' }} severity="error">Sorry, we got an error {servicesError}</Alert>
                :   isServicesLoading
                ?   <Loader />
                :   <>
                        {servicesMemo.services.data 
                            ?   <>
                                    <Typography style={{fontWeight: '700'}} variant="subtitle1">Услуги на борту:</Typography>
                                    <List sx={{display: 'flex', flexWrap: 'wrap'}}>
                                        {servicesMemo.services.data?.map((service) => 
                                            <ListItem sx={{py: .25, py: .5, flexWrap: 'wrap'}} key={service.id}>
                                                <Typography sx={{width: '100%'}} variant="body2">— {service.name}</Typography>
                                                {service.description ? <Typography variant="body2" sx={{color: '#949494', fontSize: '.8rem'}}>{service.description}</Typography> : null}
                                            </ListItem>
                                        )}
                                    </List>
                                </>
                            :   null
                        }
                    </>
            }
        </>
    );
}

export default ServicesOnBoard;
