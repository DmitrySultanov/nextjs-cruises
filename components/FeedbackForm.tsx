import React, { FC } from 'react';
import { Grid, Box, Button, TextField, Typography, Container } from '@mui/material/';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import classNames from 'classnames';
// @ts-ignore
import InputMask from "react-input-mask";
import styles from '../styles/Form.module.scss';


interface IFeedbackForm {
    name: string
    phone: string
}

const FeedbackForm: FC = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onBlur",
        defaultValues: {
            name: '',
            phone: '',
        }
    })

    const phoneValidate = (value: string) => {
        if(value.includes('_')) {
            return false
        } else {
            return true
        }
    }

    const onSubmit: SubmitHandler<IFeedbackForm> = (data) => {
        // console.log(data)
    }

    return (
        <Box className={styles.feedbackFormContainer} component="section">
            <Container maxWidth="lg">
                <Typography className={styles.title} variant="h5" mb={2} align='center' >Форма обратной связи</Typography>
                <Box component="form" className={classNames(styles.feedbackForm, 'form')} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item lg={4} md={4} sm={6} xs={12}>
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
                        <Grid item lg={4} md={4} sm={6} xs={12}>
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
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Button type={'submit'} fullWidth variant="contained" size="large" color="primary" className={styles.button}>Поиск</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}

export default FeedbackForm;
