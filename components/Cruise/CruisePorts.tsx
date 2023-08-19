import React, { useState, useEffect, FC } from 'react';
import { Typography, Table, TableBody, TableCell, TableRow, Alert } from '@mui/material';
import APIService from '../../api/APIService';
import { useFetching } from '../../api/useFetching';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnchor } from "@fortawesome/free-solid-svg-icons";
import Loader from '../Loader';


interface IPortsIdProps {
    portStartId: number
    portEndId: number
}

interface IPortInfo {
    id: number
    name: string
    docks: []
    country: string
    city: string
    address: string
}


const CruisePorts: FC<IPortsIdProps> = ({portStartId, portEndId}) => {
    const [portStart, setPortStart] = useState<IPortInfo>({id: 0, name: '', docks: [], country: '', city: '', address: ''})
    const [portEnd, setPortEnd] = useState<IPortInfo>({id: 0, name: '', docks: [], country: '', city: '', address: ''})

    const [fetchPortStart, isPortStartLoading, PortStartError] = useFetching( async() => {
        if(!portStartId) return
        const response = await APIService.getPort(portStartId)
        const data = await response.data;
        setPortStart(data)
    })

    const [fetchPortEnd, isPortEndLoading, PortEndError] = useFetching( async() => {
        if(!portEndId) return
        const response = await APIService.getPort(portEndId)
        const data = await response.data;
        setPortEnd(data)
    })

    useEffect(() => {
        fetchPortStart()
        fetchPortEnd()
    }, [])

    return (
        <Table aria-label="simple table" size="small">
            <TableBody>
                <TableRow sx={{ '& > td': { border: 0 } }}>
                    <TableCell sx={{pl: 0}}>
                        {PortStartError
                            ?   <Alert 
                                    sx={{width: '100%', justifyContent: 'center' }} 
                                    severity="error">Failed to load port information</Alert>
                            :   isPortStartLoading
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
                        {PortEndError
                            ?   <Alert 
                                    sx={{width: '100%', justifyContent: 'center' }} 
                                    severity="error">Failed to load port information</Alert>
                            :   isPortEndLoading
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
