import React, { FC, ReactNode } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, IconButton } from '@mui/material';
import SearchCabinForm from './SearchCabinForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from '../../styles/Modal.module.scss';


interface IBookingCabinsModalProps {
  openBookingModal: boolean
  setOpenBookingModal: (boolean: boolean ) => void
  cruiseId: number
}

interface ICustomDialogTitle {
  id?: string
  className?: string
  children: ReactNode
  onClose: (boolean: boolean) => void
}

const BookingCabinsModal: FC<IBookingCabinsModalProps> = ({openBookingModal, setOpenBookingModal, cruiseId}) => {

    const CustomDialogTitle = (props: ICustomDialogTitle) => {
      const { children, onClose, ...other } = props;
    
      return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
          {children}
          {handleClose ? (
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
          <CustomDialogTitle id="customized-dialog-title" onClose={handleClose} className={styles.modalTitle}>
            Подбор кают для пассажиров и расчет стоимости
          </CustomDialogTitle>
          <DialogContent>

              <SearchCabinForm />
              
          </DialogContent>
          <DialogActions>
              <Button onClick={handleClose}>Закрыть</Button>
          </DialogActions>
        </Dialog>
    );
}

export default BookingCabinsModal;
