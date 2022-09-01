import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import ErrorSnackBar from '../../../components/snackBar/ErrorSnackBar';
import { getRequest } from '../../../services';
import UI from '../../../constants/ui';

function VerifyEmail() {
  const { handleSubmit } = useForm();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const recentEmail = searchParams.get('email');

  const [opensnackbar, setSnackbarOpen] = useState();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen({ setopen: false });
  };

  const onClickBtn2 = () => {
    setIsLoading(true);
    getRequest(`/register/resendregistermail?email=${recentEmail}`)
      .then((res) => {
        setSnackbarOpen({
          setopen: true,
          message: res.msg,
          severity: 'success',
        });
        // navigate(URL.VERIFY_EMAIL);
        setIsVisible(true);
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
              <Typography align="center" fontSize="3rem" mb={4}>
                {UI.PLEASE_VERIFY_YOUR_EMAIL}
              </Typography>
              <Typography
                align="center"
                color="#AAAAAA"
                fontSize="1.25rem"
                mb={4}
              >
                {UI.ONCE_YOU_VERIFY_YOUR_EMAIL_ADDRESS}
              </Typography>
              {isVisible ? (
                <Typography
                  sx={{
                    color: 'gray',
                    mx: 4,
                    mt: 1,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: '#f0fffe',
                    textAlign: 'center',
                  }}
                >
                  {UI.RESEND_REGISTRATION_MAIL_SUCCESSFUL}
                </Typography>
              ) : null}
              <Typography
                fontSize="1.5rem"
                sx={{ color: 'gray', mx: 4, mt: 1, textAlign: 'center' }}
              >
                {UI.DIDNT_RECEIVE_AN_EMAIL}
                <Button
                  onClick={handleSubmit(onClickBtn2)}
                  disabled={isLoading}
                  startIcon={
                    isLoading && (
                      <CircularProgress size="1rem" color="inherit" />
                    )
                  }
                >
                  {UI.RESEND_EMAIL}
                </Button>
              </Typography>
              <ErrorSnackBar
                opensnackbar={opensnackbar}
                handleClose={handleClose}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default VerifyEmail;
