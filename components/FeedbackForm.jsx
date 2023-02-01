import React from 'react';
import { Grid, Box, Button, TextField, 
    FormControl, FormHelperText, Typography, Container } from '@mui/material/';
import { useForm, Controller } from "react-hook-form";
import { useRouter } from 'next/router';
import classNames from 'classnames';
import InputMask from "react-input-mask";
import styles from '../styles/Form.module.scss';


const FeedbackForm = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onBlur",
        defaultValues: {
            name: '',
            phone: '',
        }
    })

    const phoneValidate = (value) => {
        if(value.includes('_')) {
            return false
        } else {
            return true
        }
    }

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Grid container spacing={3} className={styles.feedbackFormContainer}>
            <Container maxWidth="lg">
                <Typography className={styles.title} variant="h5" mb={2} align='center' >Форма обратной связи</Typography>
                <Box component="form" className={classNames(styles.feedbackForm, 'form')} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item lg={4} md={4} sm={4} xs={12}>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ 
                                    required: true, 
                                    minLength: 3
                                }}
                                render={({ field }) => 
                                <TextField 
                                    {...field} 
                                    fullWidth
                                    label="Имя и фамилия"
                                    type="text"
                                />}
                            />
                            {errors.name?.type === 'required' && <span className='field-error'>Поле обязательное</span>}
                            {errors.name?.type === 'minLength' && <span className='field-error'>Поле должно содержать не менее 3 букв</span>}
                        </Grid>
                        <Grid item lg={4} md={4} sm={4} xs={12}>
                            <Controller
                                name="phone"
                                control={control}
                                rules={{ 
                                    required: true, 
                                    validate: value => phoneValidate(value)
                                }}
                                render={({ field }) => 
                                <InputMask
                                    {...field} 
                                    mask="+7(999)-999-99-99"
                                >
                                    {() => <TextField
                                        {...field} 
                                        fullWidth
                                        label="Телефон"
                                        type="tel"
                                    />}
                                </InputMask>
                                }
                            />
                            {errors.phone?.type === 'required' && <span className='field-error'>Поле обязательное</span>}
                            {errors.phone?.type === 'validate' && <span className='field-error'>Введите корректный номер телефона</span>}
                        </Grid>
                        <Grid item lg={4} md={4} sm={4} xs={12}>
                            <Button type={'submit'} fullWidth variant="contained" size="large" color="primary" className={styles.button}>Поиск</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Grid>
    );
}

export default FeedbackForm;
