import React, { useState, useEffect, FC, FocusEvent } from 'react';
import { Grid, Box, Button, TextField, 
    FormControl, FormHelperText } from '@mui/material/';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import classNames from 'classnames';
import moment from 'moment';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useRouter } from 'next/router';
import { useFetching } from '../../api/useFetching';
import APIService from '../../api/APIService';
import styles from '../../styles/CruisesSearch.module.scss';


interface ICity {
    id?: number
    name: string
    name_en: string
}

interface ICitiesDepartures {
    name: string
    name_en: string
    label: string
    value: number
}

interface ISearchCruise {
    city: ICitiesDepartures | [] | any
    date: string
    duration: {
        value: string
        label: string
    }
}


const CruisesSearch: FC = () => {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [cities, setCities] = useState<ICity | []>([])
    const loadingMessage = 'Идет загрузка...' as const;
    const citiesDepartures:ICitiesDepartures[] = []

    const [fetchCities, isCitiesLoading, citiesError] = useFetching( async() => {
        const response: any = await APIService.getCities()
        const data = await response.data.data;
        setCities(data)
    })

    useEffect(() => {
        fetchCities()
    }, [])

    useEffect(() => {
        router.prefetch('/cruises')
    }, [router])

    if(!isCitiesLoading) {
        // let key: keyof typeof cities;
        // for (key in cities) {
        //     let newObject:object = {};
        //     delete Object.assign(newObject, cities[key], {['label']: cities[key]['name'], ['value']: cities[key]['id'] })['name', 'id'];
        //     citiesDepartures.push(newObject)
        // } 

        for (const item of Object.values(cities)) {
            let newObject:ICitiesDepartures = {label: '', name: '', name_en: '', value: 0};
            delete Object.assign(newObject, item, {['label']: item['name'], ['value']: item['id'] })['id'];
            citiesDepartures.push(newObject)
        }
    }

    const durationOptions: { value: string, label: string }[] = [
        { value: '1', label: 'Менее 5 дней' },
        { value: '2', label: '5—10 дней' },
        { value: '3', label: 'Более 11 дней' },
    ]

    const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm<ISearchCruise>({
        mode: "onBlur",
        defaultValues: {
            // city: {
            //     label: '',
            //     name: '',
            //     name_en: '',
            //     value: 0
            // },
            city: [],
            duration: durationOptions[1],
            date: moment().format('YYYY-MM-DD')
        }
    })

    const validateDate = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if(!moment(moment(new Date()).subtract(1,'d').format('YYYY-MM-DD')).isBefore(e.target.value) || 
        e.target.value.length > 10) {
            setValue('date', moment(new Date()).format('YYYY-MM-DD'));
        }
    }

    const onSubmit: SubmitHandler<ISearchCruise> = (data) => {
        setLoading(true)
        router.push({
            pathname: '/cruises',
            query: { 
                city: data.city.value, 
                date: data.date, 
                duration: data.duration.value,
                limit: 32,
                page: 1
            }
        })
    }

    return (
        <>
            <Box component="section" className={styles.searchFormSection}>
                <Box component="form" className={classNames(styles.searchForm, 'form')} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container alignItems={{xs: 'flex-end', md: 'flex-end'}} spacing={1} justifyContent="center">
                        <Grid item xs={12} sm={6} md={3} lg={2}>
                            <FormControl fullWidth className={classNames(styles.formControl, 'whiteFormControl')}>
                                <FormHelperText>Город отправления</FormHelperText>
                                <Controller
                                    name="city"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => 
                                    <CreatableSelect
                                        {...field}
                                        instanceId="city"
                                        classNamePrefix="city"
                                        className={styles.select}
                                        options={citiesDepartures}
                                        isClearable
                                        placeholder="Выберите город"
                                        isSearchable
                                        loadingMessage={() => loadingMessage}
                                    />
                                } />
                                {String(errors.city?.type) === 'required' && <span className={styles.fieldError}>Поле обязательное</span>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={2}>
                            <FormControl fullWidth className={classNames(styles.formControl, 'whiteFormControl')}>
                                <FormHelperText>Продолжительность</FormHelperText>
                                <Controller
                                    name="duration"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => 
                                    <Select
                                        {...field}
                                        instanceId="duration"
                                        className={styles.select}
                                        options={durationOptions}
                                    />
                                } />
                                {String(errors.duration?.type) === 'required' && <span className={styles.fieldError}>Поле обязательное</span>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={2}>
                            <FormControl fullWidth className={classNames(styles.formControl, 'whiteFormControl')}>
                                <FormHelperText>Дата отправления c</FormHelperText>
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
                                        // label="Дата отправления c"
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
                                {String(errors.date?.type) === 'required' && <span className={styles.fieldError}>Поле обязательное</span>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={2} sm={6} md={3}>
                            <Button className={styles.searchButton} type={'submit'} fullWidth variant="contained" color="primary" size="large">Поиск</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default CruisesSearch;
