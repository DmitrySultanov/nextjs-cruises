import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableRow } from '@mui/material';
import APIService from '../../api/APIService';
import { useFetching } from '../../api/useFetching';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnchor } from "@fortawesome/free-solid-svg-icons";
import Loader from '../Loader';


const CruisePorts = ({cruise}) => {
    const [portStart, setPortStart] = useState({})
    const [portEnd, setPortEnd] = useState({})

    const [fetchPortStart, isPortStartLoading, PortStartError] = useFetching( async() => {
        if(!cruise.portStart) return
        const response = await APIService.getPort(cruise.portStart)
        const data = await response.data;
        setPortStart(data)
    })

    const [fetchPortEnd, isPortEndLoading, PortEndError] = useFetching( async() => {
        if(!cruise.portEnd) return
        const response = await APIService.getPort(cruise.portEnd)
        const data = await response.data;
        setPortEnd(data)
    })

    useEffect(() => {
        fetchPortStart()
        fetchPortEnd()
    }, [fetchPortStart, fetchPortEnd])

    return (
        <Table aria-label="simple table" size="small">
            <TableBody>
                <TableRow sx={{ '& > td': { border: 0 } }}>
                    <TableCell sx={{pl: 0}}>
                    {isPortStartLoading
                        ?   <Loader />
                        :   Object.keys(portStart).length
                                ?   <>
                                        <FontAwesomeIcon icon={faAnchor} />
                                        <Typography variant="body2" component="span" style={{marginLeft: '.25rem'}}>
                                        {portStart.city}, {portStart.name}, {portStart.address}
                                        </Typography>
                                    </>
                                :   null
                    }
                    </TableCell>
                    <TableCell sx={{pl: 0}}>
                    {isPortEndLoading
                        ?   <Loader />
                        :   Object.keys(portEnd).length
                                ?   <>
                                        <FontAwesomeIcon icon={faAnchor} />
                                        <Typography variant="body2" component="span" style={{marginLeft: '.25rem'}}>
                                        {portEnd.city}, {portEnd.name}, {portEnd.address}
                                        </Typography>
                                    </>
                                :   null
                    }
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export default CruisePorts;
