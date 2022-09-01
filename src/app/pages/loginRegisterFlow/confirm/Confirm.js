import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { getRequest } from '../../../services';
import URL from '../../../constants/urls';
import ErrorSnackBar from '../../../components/snackBar/ErrorSnackBar';
import STATUS_CODE from '../../../constants/statusCode';
import UI from '../../../constants/ui';
import {
  EMPTY_ARRAY,
  REDIRECT_TIME_OUT_FOR_VIEW_COMPONENTS,
} from '../../../constants';
import Dialog from '../../../components/dialog';

/**
 * Token has 3 states
 * Success - Get token from email
 * Invalid - User can enter wrong token
 * Expire - token after expiry time
 * @returns
 */

function Confirm() {
  const [isVisibleInvalidTokenDialog, setIsVisibleInvalidTokenDialog] =
    useState(false);
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleResendTokenMessage, setIsVisibleResendTokenMessage] =
    useState(false);
  const [opensnackbar, setSnackbarOpen] = useState();

  const token = searchParams.get('token');

  const navigate = useNavigate();

  const handleInvalidDialogClose = () => {
    setIsVisibleInvalidTokenDialog(false);
    navigate(URL.HOME);
  };
  const handleExpireDialogClose = () => {
    setIsVisibleResendTokenMessage(false);
    navigate(URL.HOME);
  };

  const handleResendToken = () => {
    setIsLoading(true);
    getRequest(`/register/resendtoken?existingToken=${token}`)
      .then((res) => {
        if (res.code === STATUS_CODE.CONFIRM_RESEND_OLD_TOKEN_SUCCESS) {
          setSnackbarOpen({
            setopen: true,
            message: res.msg,
            severity: 'success',
          });
          setTimeout(() => {
            navigate(URL.HOME);
          }, 3000);
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

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen({ setopen: false });
  };

  useEffect(() => {
    getRequest(`/register/confirm?token=${token}`)
      .then((res) => {
        setSnackbarOpen({
          setopen: true,
          message: res.msg,
          severity: 'success',
        });
        if (res.code === STATUS_CODE.CONFIRM_TOKEN_SUCCESS) {
          setIsSuccess(true);
          navigate(URL.CONFIRM_EMAIL);
          setTimeout(() => {
            navigate(URL.LOGIN);
          }, REDIRECT_TIME_OUT_FOR_VIEW_COMPONENTS);
        }
      })
      .catch((error) => {
        if (error.code === STATUS_CODE.INVALID_TOKEN) {
          setIsVisibleInvalidTokenDialog(true);
          setMessage(error.msg);
        } else if (error.code === STATUS_CODE.EXPIRE_TOKEN) {
          setIsVisibleResendTokenMessage(true);
          setMessage(error.msg);
        } else {
          setSnackbarOpen({
            setopen: true,
            message: error.msg,
            severity: 'error',
          });
        }
      });
  }, EMPTY_ARRAY);

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: '#fafdff', height: '80vh' }}
      >
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Box
              component="div"
              sx={{
                boxShadow: '0px 0px 3px #48B2FF29',
                backgroundColor: '#fff',
                borderRadius: '8px',
                p: 4,
              }}
            >
              {isSuccess && (
                <Typography align="center" fontSize="3rem" mb={4}>
                  {UI.CONFIRM_TOKEN_REDIRECT_PAGE}
                </Typography>
              )}

              <Dialog
                isDialogOpen={isVisibleInvalidTokenDialog}
                title={UI.TOKEN_NOT_VALID}
                content={message}
                primaryLabel={UI.CLOSE}
                primaryAction={handleInvalidDialogClose}
              />

              <Dialog
                isLoading={isLoading}
                isDialogOpen={isVisibleResendTokenMessage}
                title={UI.EXPIRED_TOKEN}
                content={message}
                primaryLabel={UI.GENERATE_NEW_TOKEN}
                primaryAction={handleResendToken}
                secondaryLabel={UI.CLOSE}
                secondaryAction={handleExpireDialogClose}
              />
            </Box>
            <ErrorSnackBar
              opensnackbar={opensnackbar}
              handleClose={handleClose}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Confirm;
