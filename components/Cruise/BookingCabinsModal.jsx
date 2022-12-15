import React from 'react';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, IconButton } from '@mui/material';
import SelectionCabin from './SelectionCabin';
import SearchCabinForm from './SearchCabinForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from '../../styles/Modal.module.scss';


const BookingCabinsModal = ({openBookingModal, setOpenBookingModal, cruiseId}) => {

    const CustomDialogTitle = (props) => {
        const { children, onClose, ...other } = props;
      
        return (
          <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </IconButton>
            ) : null}
          </DialogTitle>
        );
    };

    const handleClose = () => {
        setOpenBookingModal(false);
    }

    return (
        <Dialog open={openBookingModal} onClose={handleClose} maxWidth="md" fullWidth={true} className="modal modal-booking">
            <CustomDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Подбор кают для пассажиров и расчет стоимости
            </CustomDialogTitle>
            <DialogContent>

                <SearchCabinForm />
                {/* <SelectionCabin id={cruiseId} /> */}
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
}

export default BookingCabinsModal;
