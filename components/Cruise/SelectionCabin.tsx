// import React, { useState, useEffect, FC } from 'react';
// import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
// import APIService from '../../api/APIService';
// import { useFetching } from '../../api/useFetching';
// import Loader from '../Loader';

// interface ISelectionCabinProps {
//     id: number
// }

// const SelectionCabin: FC<ISelectionCabinProps> = ({ id }) => {
//     const [cabinsInfo, setCabinsInfo] = useState({})

//     const [fetchCabinsInfo, isCabinsInfoLoading, cabinsInfoError] = useFetching( async() => {
//         const response = await APIService.getCruiseCabins(id)
//         const data = await response.data;
//         setCabinsInfo(data)
//     })
    
//     useEffect(() => {
//         fetchCabinsInfo()
//     }, [])

//     console.log(cabinsInfo)

//     return (
//         <div>
//             {isCabinsInfoLoading
//                 ?   <Loader />
//                 :   Object.keys(cabinsInfo).length
//                     ?   <>
//                             <RadioGroup
//                                 aria-labelledby="demo-radio-buttons-group-label"
//                                 defaultValue="female"
//                                 name="radio-buttons-group"
//                             >
//                                 {Object.entries(cabinsInfo.prices).map(([key, value]) => 
//                                     <FormControlLabel key={key} value={key} control={<Radio />} label={value.type_name} />
//                                 )}
//                             </RadioGroup>
//                         </>
//                     :   null
//             }
//         </div>
//     );
// }

// export default SelectionCabin;
