import React, { FC, useState } from 'react';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Grid, Box, Alert, Button, TextField, 
    FormControl, FormHelperText } from '@mui/material/';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Select from 'react-select';
import styles from '../../styles/Modal.module.scss';


interface OptionType {
    value: string
    label: string
}

interface ISearchCabin {
    adult_count: OptionType
    child_place_count: OptionType
    child_without_place_count: OptionType
    children_age: string
    children_age_without_place: string
}


const SearchCabinForm: FC = () => {
    const router = useRouter()
    
    const adultCountOptions: OptionType[] = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
    ]

    const childPlaceCountOptions: OptionType[] = [
        { value: '0', label: '0' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
    ]

    const childWithoutPlaceCount: OptionType[] = [
        { value: '0', label: '0' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
    ]

    const { control, handleSubmit, formState: { errors }, setValue, getValues, clearErrors, reset } = useForm({
        mode: "onBlur",
        defaultValues: {
            adult_count: adultCountOptions[0],
            child_place_count: childPlaceCountOptions[0],
            child_without_place_count: childWithoutPlaceCount[0],
            children_age: '',
            children_age_without_place: ''
        }
    })

    const [childrenAgeDisabled, setChildrenAgeDisabled] = useState(true)
    const [childrenAgeWithoutPlaceDisabled, setChildrenAgeWithoutPlaceDisabled] = useState(true)


    const handleChildPlaceCountChange = (selectedOption: OptionType) => {
        if(+selectedOption.value !== 0) {
            setChildrenAgeDisabled(false)
            clearErrors('children_age')
        } else {
            setChildrenAgeDisabled(true)
            clearErrors('children_age')
            setValue('children_age', '')
        }
        setValue('child_place_count', selectedOption)
    }

    const handleChildWithoutPlaceCountChange = (selectedOption: OptionType) => {
        if(+selectedOption.value !== 0) {
            setChildrenAgeWithoutPlaceDisabled(false)
            clearErrors('children_age_without_place')
        } else {
            setChildrenAgeWithoutPlaceDisabled(true)
            clearErrors('children_age_without_place')
            setValue('children_age_without_place', '')
        }
        setValue('child_without_place_count', selectedOption)
    }

    const isChildrenAgeValid = (value: string, elem: any) => {
        const array = value.length != 0 ? value.split(',') : [];
        if(+getValues(elem).value !== array.length) {
            return false
        } else {
            return true
        }
    }

    // const [cabinSearchResult, setCabinSearchResult] = useState([])
    // const [formData, setFormData] = useState({})

    const [loading, setLoading] = useState(false)

    // const [fetchCabinSearch, isCabinSearchLoading, cabinSearchError] = useFetching( async() => {
    //     const response = await APIService.getCruiseCabinSearch(formData, +router.query.id)
    //     const data = await response.data;
    //     setCabinSearchResult(data)
    // })
    
    // useEffect(() => {
    //     fetchCabinSearch()
    // }, [formData])

    const onSubmit: SubmitHandler<ISearchCabin> = (data) => {
        // setFormData(data)
        setLoading(true)
        router.push({
            pathname: '/cabins',
            query: { 
                adult_count: data.adult_count.value, 
                child_place_count: data.child_place_count.value, 
                child_without_place_count: data.child_without_place_count.value,
                children_age: data.children_age,
                children_age_without_place: data.children_age_without_place,
                id: router.query.id,
                limit: 34,
                page: 1
            }
        })
        // document.body.style.cursor='wait'
    }


    return (
        <Box>
            <Box component="form" className={classNames(styles.searchCabinForm, 'form')} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={1} justifyContent="center">
                    <Grid item lg={3} md={4} sm={4} xs={12}>
                        <FormControl fullWidth className={styles.formControl}>
                            <FormHelperText>Кол-во взрослых мест в каюте</FormHelperText>
                            <Controller
                                name="adult_count"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => 
                                <Select
                                    {...field}
                                    className={styles.select}
                                    options={adultCountOptions}
                                />
                            } />
                            {errors.adult_count?.type === 'required' && <span className='field-error'>Select is required</span>}
                        </FormControl>
                    </Grid>
                    <Grid item lg={3} md={4} sm={4} xs={12}>
                        <FormControl fullWidth className={styles.formControl}>
                            <FormHelperText>Кол-во детских мест</FormHelperText>
                            <Controller
                                name="child_place_count"
                                control={control}
                                render={({ field: { onChange, value} }) => 
                                <Select
                                    className={styles.select}
                                    options={childPlaceCountOptions}
                                    defaultValue={childPlaceCountOptions[0]}
                                    onChange={(option) => handleChildPlaceCountChange(option!)}
                                />
                            } />
                        </FormControl>
                        <hr/>
                        <FormControl fullWidth className={styles.formControl}>
                            <FormHelperText>Возраста детей, размещаемых на отдельных местах</FormHelperText>
                            <Controller
                                name="children_age"
                                control={control}
                                rules={
                                    !childrenAgeDisabled ? {
                                        required: true,
                                        pattern: {
                                            value: /^[0-9\,\s]+$/,
                                            message: "invalid"
                                        },
                                        validate: (val) => isChildrenAgeValid(val, 'child_place_count')
                                    } : {
                                        required: false
                                    }
                                }
                                render={({ field }) => 
                                <TextField 
                                    {...field} 
                                    fullWidth
                                    type="text"
                                    size="small"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    disabled={childrenAgeDisabled}
                                    inputProps={{
                                        // className: styles.dateInput,
                                        min: 1,
                                    }} 
                                />
                            } />
                            {errors.children_age?.type === 'required' && 
                            <span className='field-error'>Поле обязательно для заполнения</span>}

                            {errors.children_age?.type === 'pattern' && 
                            <span className='field-error'>В поле можно указывать только числа и запятые</span>} 

                            {errors.children_age?.type === 'validate' && 
                            <span className='field-error'>Количество детских мест должно равняться количеству возрастов</span>}
                            
                            <FormHelperText>Введите полный возраст ребенка через запятую</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item lg={3} md={4} sm={4} xs={12}>
                        <FormControl fullWidth className={styles.formControl}>
                            <FormHelperText>Кол-во детей, размещаемых без места</FormHelperText>
                            <Controller
                                name="child_without_place_count"
                                control={control}
                                render={({ field }) => 
                                <Select
                                    {...field}
                                    className={styles.select}
                                    options={childWithoutPlaceCount}
                                    onChange={(option) => handleChildWithoutPlaceCountChange(option!)}
                                />
                            } />
                        </FormControl>
                        <hr/>
                        <FormControl fullWidth className={styles.formControl}>
                            <FormHelperText>Возраста детей, размещаемых без отдельного места</FormHelperText>
                            <Controller
                                name="children_age_without_place"
                                control={control}
                                rules={
                                    !childrenAgeWithoutPlaceDisabled ? {
                                        required: true,
                                        pattern: {
                                            value: /^[0-9\,\s]+$/,
                                            message: "invalid"
                                        },
                                        validate: (val) => isChildrenAgeValid(val, 'child_without_place_count')
                                    } : {
                                        required: false
                                    }
                                }
                                render={({ field }) => 
                                <TextField 
                                    {...field} 
                                    fullWidth
                                    type="text"
                                    size="small"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    disabled={childrenAgeWithoutPlaceDisabled}
                                    inputProps={{
                                        // className: styles.dateInput,
                                        min: 1,
                                    }} 
                                />
                            } />
                            {errors.children_age_without_place?.type === 'required' && 
                            <span className='field-error'>Поле обязательно для заполнения</span>}

                            {errors.children_age_without_place?.type === 'pattern' && 
                            <span className='field-error'>В поле можно указывать только числа и запятые</span>} 

                            {errors.children_age_without_place?.type === 'validate' && 
                            <span className='field-error'>Количество детских мест должно равняться количеству возрастов</span>}

                            <FormHelperText>Введите полный возраст ребенка через запятую</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item lg={3} md={4} sm={4} xs={12}>
                        <Button className={styles.searchButton} type={'submit'} fullWidth variant="contained" color="primary" size="large">Поиск</Button>
                    </Grid>
                </Grid>
            </Box>
            <Box className={styles.modalContent}>
                <Alert sx={{width: '100%', justifyContent: 'center' }} severity="info">
                    Пожалуйста, выберите количество пассажиров для поиска
                </Alert>
            </Box>
        </Box>
    );
}

export default SearchCabinForm;
