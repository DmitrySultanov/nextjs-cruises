import React, { useState, useEffect, useMemo } from 'react';
import { Grid, Box, Button, TextField, 
    FormControl, FormHelperText } from '@mui/material/';
import { useForm, Controller } from "react-hook-form";
import classNames from 'classnames';
import moment from 'moment';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useRouter } from 'next/router';
import LoaderModal from '../LoaderModal';
import { useFetching } from '../../api/useFetching';
import APIService from '../../api/APIService';
import styles from '../../styles/CruisesSearch.module.scss';


const CruisesSearch = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [cities, setCities] = useState([])

    const [fetchCities, isCitiesLoading, citiesError] = useFetching( async() => {
        const response = await APIService.getCities()
        const data = await response.data;
        setCities(data)
    })

    useEffect(() => {
        fetchCities()
    }, [])

    useEffect(() => {
        router.prefetch('/cruises')
    }, [router])

    
    const citiesMemo = useMemo(() => (
        {cities, setCities}
    ), [cities])
        
    let citiesDepartures = []
    if(citiesMemo.cities.data) {
        citiesMemo.cities.data.map((obj) => {
            const newObject = {};
            delete Object.assign(newObject, obj, {['label']: obj['name'], ['value']: obj['id'] })['name', 'id'];
            citiesDepartures.push(newObject)
        })
    }

    const durationOptions = [
        { value: '1', label: 'Менее 5 дней' },
        { value: '2', label: '5—10 дней' },
        { value: '3', label: 'Более 11 дней' },
    ]

    const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        mode: "onBlur",
        defaultValues: {
            city: [],
            duration: durationOptions[1],
            date: moment(new Date()).format('YYYY-MM-DD')
        }
    })

    const validateDate = (e) => {
        if(!moment(moment(new Date()).subtract(1,'d').format('YYYY-MM-DD')).isBefore(e.target.value) || 
        e.target.value.length > 10) {
            console.log(moment(new Date()).format('YYYY-MM-DD'))
            setValue('date', moment(new Date()).format('YYYY-MM-DD'));
        }
    }

    const onSubmit = (data) => {
        setLoading(true)
        router.push({
            pathname: '/cruises',
            query: { 
                city: data.city.value, 
                date: data.date, 
                duration: data.duration.value,
                limit: 34,
                page: 1
            }
        })
    }

    return (
        <>
            <Box component="section" className={styles.searchFormSection}>
                <Box component="form" className={classNames(styles.searchForm, 'form')} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container alignItems="flex-end" spacing={1} justifyContent="center">
                        <Grid item lg={2} md={4} sm={6} xs={12}>
                            <FormControl fullWidth className="whiteFormControl">
                                <FormHelperText>Город отправления</FormHelperText>
                                <Controller
                                    
                                    name="city"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => 
                                    <CreatableSelect
                                        {...field}
                                        className={styles.select}
                                        options={citiesDepartures}
                                        isClearable
                                        placeholder="Выберите город"
                                        isSearchable
                                        loadingMessage="Идет загрузка..."
                                    />
                                } />
                                {errors.city?.type === 'required' && <span className={styles.fieldError}>Обязательно для заполнения</span>}
                            </FormControl>
                        </Grid>
                        <Grid item lg={2} md={4} sm={6} xs={12}>
                            <FormControl fullWidth className="whiteFormControl">
                                <FormHelperText>Продолжительность</FormHelperText>
                                <Controller
                                    id="duration"
                                    name="duration"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => 
                                    <Select
                                        {...field}
                                        className={styles.select}
                                        options={durationOptions}
                                    />
                                } />
                                {errors.duration?.type === 'required' && <span className='field-error'>Select is required</span>}
                            </FormControl>
                        </Grid>
                        <Grid item lg={2} md={4} sm={6} xs={12}>
                            <Controller
                                name="date"
                                control={control}
                                rules={{ 
                                    required: true, 
                                }}
                                render={({ field }) => 
                                <TextField 
                                {...field} 
                                fullWidth
                                label="Дата отправления c"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    className: styles.dateInput,
                                    min: moment(new Date()).format("YYYY-MM-DD"),
                                    onBlur: e => validateDate(e),
                                }} 
                                />}
                            />
                            {errors.date?.type === 'required' && <span className='field-error'>Field is required</span>}
                        </Grid>
                        <Grid item lg={2} md={4} sm={6} xs={12}>
                            <Button sx={{  mt: 2 }} type={'submit'} fullWidth variant="contained" color="primary" size="large">Поиск</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {/* { loading && <LoaderModal/>} */}
        </>
    );
}

export default CruisesSearch;
