import React, { useState, useEffect, useMemo } from 'react';
import { useFetching } from '../api/useFetching';
import APIService from '../api/APIService';
import Loader from './Loader';
import { Typography, List, ListItem } from '@mui/material/';


const PublicPlaces = () => {
    const [places, setPlaces] = useState([])

    const [fetchPlaces, isPlacesLoading, placesError] = useFetching( async() => {
        const response = await APIService.getPublicPlaces()
        const data = await response.data;
        setPlaces(data)
    })
    
    useEffect(() => {
        fetchPlaces()
    }, [])

    const placesMemo = useMemo(() => (
        {places, setPlaces}
    ), [places])
    
    console.log(placesMemo)
    return (
        <div>
            
        </div>
    );
}

export default PublicPlaces;
