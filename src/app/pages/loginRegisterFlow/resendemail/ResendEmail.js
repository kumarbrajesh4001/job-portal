import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorSnackBar from '../../../components/snackBar/ErrorSnackBar';
import URL from '../../../constants/urls';
import { getRequest } from '../../../services';
import UI from '../../../constants/ui';

function ResendEmail() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [opensnackbar, setSnackbarOpen] = useState();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen({ setopen: false });
  };
  const onClickBtn = (data) => {
    getRequest(`/register/resendregistermail?email=${data.email}`)
      .then((res) => {
        setSnackbarOpen({
          setopen: true,
          message: res.msg,
          severity: 'success',
        });
        if (res.code === 150) {
          navigate(URL.VERIFY_EMAIL);
        }
      })
      .catch((error) => {
        setSnackbarOpen({
          setopen: true,
          message: error.msg,
          severity: 'error',
        });
      });
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
                p: 4,
                borderRadius: '8px',
              }}
            >
              <Typography align="left" fontSize="2rem" mb={4}>
                {UI.RESEND_EMAIL}
              </Typography>
              <Box>{UI.ENTER_YOUR_REGISTER_EMAIL}</Box>
              <TextField
                {...register('email')}
                fullWidth
                type="text"
                id="email"
                variant="outlined"
                placeholder={UI.ENTER_YOUR_REGISTER_EMAIL}
                name="email"
                sx={{ mb: 3 }}
              />

              <Button
                onClick={handleSubmit(onClickBtn)}
                fullWidth
                size="large"
                variant="contained"
                type="submit"
                sx={{ mb: 2 }}
              >
                {UI.SEND}
              </Button>
            </Box>
          </Grid>
          <ErrorSnackBar
            opensnackbar={opensnackbar}
            handleClose={handleClose}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ResendEmail;
