import React, { useState, useEffect, useMemo } from 'react';
import { useFetching } from '../api/useFetching';
import APIService from '../api/APIService';


const PublicPlaces = () => {
    const [places, setPlaces] = useState([])

    const [fetchPlaces, isPlacesLoading, placesError] = useFetching( async() => {
        const response = await APIService.getPublicPlaces()
        const data = await response.data;
        setPlaces(data)
    })
    
    useEffect(() => {
        fetchPlaces()
    }, [fetchPlaces])

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
