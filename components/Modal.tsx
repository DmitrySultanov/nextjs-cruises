import React, { FC } from 'react';
import { Button, Alert, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface IModal {
    accessible_cabin: string
}

interface IModalProps {
    openModal: boolean
    setOpenModal: (boolean: boolean) => void
    data: IModal
}


const Modal:FC<IModalProps> = ({openModal, setOpenModal, data}) => {

    const handleModalClose = () => {
        setOpenModal(false);
    }

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
                    ? <Alert sx={{width: '100%', justifyContent: 'center' }} severity="success">Тестовая заявка тестовому менеджеру успешно отправлена!</Alert>
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
