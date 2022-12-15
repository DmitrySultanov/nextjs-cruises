import React from 'react';
import { Grid, Box, Container, Typography, Button, Alert, 
    Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const Modal = ({openModal, setOpenModal, data}) => {
    console.log(data)

    const handleModalClose = () => {
        setOpenModal(false);
    };

    return (
        <Dialog
            open={openModal}
            onClose={handleModalClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>
            </DialogTitle>
            <DialogContent>
                {data.accessible_cabin
                    ? <Alert sx={{width: '100%', justifyContent: 'center' }} severity="success">Заявка менеджеру успешно отправлена!</Alert>
                    : <Alert sx={{width: '100%', justifyContent: 'center' }} severity="error">Вы не выбрали каюту, пожалуйста выберите желаемую каюту</Alert>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleModalClose}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
}

export default Modal;
