import React from 'react';
import { Grid, Box, Typography } from '@mui/material/';
import CabinType from './CabinType';


const CabinTypes = ({types}) => {
    return (
        <>  
            {types
                ?   <Box className="CabinTypes" sx={{mt: 1}}>
                        <Typography variant="h6">Типы кают</Typography>
                        <Grid container spacing={2}>
                            {types?.map((type, idx) => 
                                <CabinType type={type} key={idx} />
                            )}
                        </Grid>
                    </Box>
                :   null
            }
            
        </>
    );
}

export default CabinTypes;
