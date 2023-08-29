import React, { FC, useState } from 'react';
import Head from 'next/head';
import { Grid, Box, Container, Button, Alert, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import Breadcrumbs from '../../components/Breadcrumbs';
import APIService from '../../api/APIService';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import styles from '../../styles/Cruises.module.scss';
import { ICabins } from '../../types';


export const getServerSideProps = async (context: any) => {
    const response: any = await APIService.getCruiseCabinSearch(context.query);
    const data = await response.data[0];

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

interface ICabinsSearchResultProps {
    cabins: ICabins[]
    statusCode: number | null
    statusText: string | null
}

interface ISelectedCabinForm {
    accessible_cabin: string
}


const CabinsSearchResult: FC<ICabinsSearchResultProps> = ({cabins, statusCode, statusText}) => {
    const [openModal, setOpenModal] = useState(false)
    const [formdata, setFormData] = useState<ISelectedCabinForm>({accessible_cabin: ''})
    let preapredCabinsArray: ICabins[] = []
    // document.body.style.cursor='default'

    const { control, handleSubmit } = useForm({
        mode: "onBlur",
        defaultValues: {
            accessible_cabin: '',
        }
    })

    const onSubmit: SubmitHandler<ISelectedCabinForm> = (data) => {
        setFormData(data)
        setOpenModal(true)
    }

    Object.entries(cabins).map(item => {
        preapredCabinsArray.push(item[1])
    })

    return (
        <Layout>
            <Head>
                <title>КруизеШтерн - Подбор кают</title>
            </Head>
            <Container maxWidth="lg">
                <Breadcrumbs />
                {cabins
                    ?   <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                            <Box>Количество вариантов: {Object.keys(cabins).length}</Box>

                            <Grid container spacing={1}>
                                <Grid item lg={8} md={7} sm={6} xs={12}>
                                    <Box className={styles.variantsBox}>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue=""
                                            name="radio-buttons-group"
                                        >
                                            {Object.entries(preapredCabinsArray).map((item) =>
                                                    <Controller
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
                                    </Box>
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
