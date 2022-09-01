import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import UI from '../../../constants/ui';
import FEEDBACK_SCHEMA from './feedBackForm.schema';
import { postRequest } from '../../../services';
import { API_URL } from '../../../constants/apiUrls';
import ErrorSnackBar from '../../snackBar/ErrorSnackBar';
import STATUS_CODE from '../../../constants/statusCode';
import COMMON_STYLE from '../../../constants/commonStyle';

function FeedBackForm(props) {
  const { isOpen, onClose } = props;
  const [opensnackbar, setSnackbarOpen] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen({ setopen: false });
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FEEDBACK_SCHEMA),
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    postRequest(API_URL.FEEDBACK, data)
      .then((res) => {
        setSnackbarOpen({
          setopen: true,
          message: res.msg,
          severity: 'success',
        });
        if (res.code === STATUS_CODE.FEEDBACK_SUBMITTED_SUCCESSFULLY) {
          onClose();
          setIsLoading(true);
        }
      })
      .catch((error) => {
        setSnackbarOpen({
          setopen: true,
          message: error.msg,
          severity: 'error',
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    reset();
  }, [isOpen]);

  return (
    <div>
      <Dialog open={isOpen} onClose={onClose} aria-labelledby="forms">
        <DialogTitle sx={{ minWidth: '400px' }}>
          {UI.FEEDBACK_FORM}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={COMMON_STYLE.DIALOG_HEADING}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ padding: '0px 20px' }}>
          <div>
            {UI.FULL_NAME}
            <Box component="span" sx={{ color: '#d32f2f' }}>
              *
            </Box>
          </div>
          <TextField
            {...register('name')}
            fullWidth
            size="small"
            type="text"
            id="name"
            variant="outlined"
            placeholder={UI.FULL_NAME}
            error={!!errors.name?.message}
            helperText={errors.name?.message ? errors.name.message : ' '}
          />
          <div>
            {UI.EMAIL}
            <Box component="span" sx={{ color: '#d32f2f' }}>
              *
            </Box>
          </div>
          <TextField
            {...register('email')}
            fullWidth
            size="small"
            type="email"
            id="email"
            variant="outlined"
            placeholder={UI.ENTER_EMAIL}
            name="email"
            error={!!errors.email?.message}
            helperText={errors.email?.message ? errors.email.message : ' '}
          />
          <div>
            {UI.PHONE_NUMBER}
            <Box component="span" sx={{ color: '#d32f2f' }}>
              *
            </Box>
          </div>
          <TextField
            {...register('phone')}
            fullWidth
            size="small"
            type="phone"
            id="phone"
            variant="outlined"
            placeholder={UI.ENTER_PHONE_NUMBER}
            name="phone"
            error={!!errors.phone?.message}
            helperText={errors.phone?.message ? errors.phone.message : ' '}
          />
          <div>
            {UI.COMMENTS}
            <Box component="span" sx={{ color: '#d32f2f' }}>
              *
            </Box>
          </div>
          <TextField
            {...register('comments')}
            fullWidth
            size="small"
            rows={4}
            type="comments"
            id="comments"
            variant="outlined"
            placeholder={UI.COMMENTS_PLACEHOLDER}
            name="comments"
            multiline
            error={!!errors.comments?.message}
            helperText={
              errors.comments?.message ? errors.comments.message : ' '
            }
          />
        </DialogContent>
        <DialogActions sx={{ marginRight: '12px' }}>
          <Button
            onClick={handleSubmit(onSubmit)}
            size="large"
            variant="contained"
            type="submit"
            disabled={isLoading}
            startIcon={
              isLoading && <CircularProgress size="1rem" color="inherit" />
            }
          >
            {UI.SUBMIT}
          </Button>
        </DialogActions>
      </Dialog>
      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
    </div>
  );
}

FeedBackForm.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

FeedBackForm.defaultProps = {
  isOpen: false,
  onClose: noop,
};

export default FeedBackForm;
