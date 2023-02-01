import React, { useState, useMemo, useCallback } from 'react';
import Head from 'next/head';
import { Grid, Box, Container, Typography, Button, Alert, 
    Pagination, Card, CardContent, Skeleton, List, ListItem, Chip, Radio, RadioGroup, FormControlLabel, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import Breadcrumbs from '../../components/Breadcrumbs';
import APIService from '../../api/APIService';
import { useForm, Controller } from "react-hook-form";
import styles from '../../styles/Cruises.module.scss';


export const getServerSideProps = async (context) => {
    const response = await APIService.getCruiseCabinSearch(context.query);
    const data = await response.data;

    if (!data) {
        return {
            props: {
                cabins: null,
                statusCode: response.status ? response.status : null,
                statusText: response.message
            }
        }
    }

    return {
        props: {
            cabins: data,
            statusCode: 200,
            statusText: null
        }
    }
}


const CabinsSearchResult = ({cabins, statusCode, statusText}) => {
    const router = useRouter()
    const [openModal, setOpenModal] = useState(false)
    const [formdata, setFormData] = useState([])
    // document.body.style.cursor='default'

    const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        mode: "onBlur",
        defaultValues: {
            accessible_cabin: '',
        }
    })

    const onSubmit = (data) => {
        console.log(data)
        setFormData(data)
        setOpenModal(true)
    }

    return (
        <Layout>
            <Head>
                <title>КруизеШтерн - Подбор кают</title>
            </Head>
            <Container maxWidth="lg">
                <Breadcrumbs />
                {cabins
                    ?   <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                            <Box>Количество вариантов: {Object.keys(cabins[0]).length}</Box>

                            <Grid container spacing={1}>
                                <Grid item lg={8} md={7} sm={6} xs={12}>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue=""
                                        name="radio-buttons-group"
                                    >
                                        {Object.entries(cabins[0]).map((item) =>
                                                <Controller
                                                    id="accessible_cabin"
                                                    name="accessible_cabin"
                                                    control={control}
                                                    key={item[1].cabin_id} 
                                                    render={({ field }) => 
                                                    
                                                    <FormControlLabel 
                                                        {...field} 
                                                        value={item[1].cabin_id} 
                                                        control={<Radio />} 
                                                        label={
                                                            `${item[1].cabin_name} - ${item[1].category.name} - ${item[1].deck.name}
                                                            - ${item[1].places.length} мест(а), Итого: ${item[1].total} руб.`
                                                        } />
                                                    } 
                                                />
                                        )}
                                    </RadioGroup>
                                </Grid>
                                <Grid item lg={4} md={5} sm={6} xs={12}>
                                    <Button sx={{  mt: 2 }} style={{ 'position': 'sticky', 'top': '5rem', 'width': 'auto'}} type={'submit'} fullWidth variant="contained" color="primary" size="large">Отправить заявку</Button>
                                </Grid>
                            </Grid>


                        </Box>
                    :   <Alert sx={{width: '100%', justifyContent: 'center', bgcolor: 'rgba(253, 237, 237, 1)!important' }} severity="error">Sorry, we got an error — {statusText}</Alert>
                }
                <Modal openModal={openModal} setOpenModal={setOpenModal} data={formdata}/>
            </Container>
        </Layout>
    );
}

export default CabinsSearchResult;
