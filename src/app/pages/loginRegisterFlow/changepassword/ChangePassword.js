import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ErrorSnackBar from '../../../components/snackBar/ErrorSnackBar';
import URL from '../../../constants/urls';
import { postRequest } from '../../../services';
import STATUS_CODE from '../../../constants/statusCode';
import ERROR_MESSAGE from '../../../constants/errorMsgs';
import REGEX_PATTERN from '../../../constants/regex';
import UI from '../../../constants/ui';
import { REDIRECT_TIME_OUT } from '../../../constants';

export function requestDTO(formData, base64Encode, token) {
  return { ...formData, newpassword: base64Encode, token };
}
function ChangePassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [opensnackbar, setSnackbarOpen] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen({ setopen: false });
  };

  const onClickBtn = (data) => {
    const base64Encode = btoa(data.newpassword);
    const requestPayload = requestDTO(data, base64Encode, token);
    setIsLoading(true);
    postRequest(`/register/savepassword`, requestPayload)
      .then((res) => {
        setSnackbarOpen({
          setopen: true,
          message: res.msg,
          severity: 'success',
        });
        if (res.code === STATUS_CODE.SAVE_A_NEW_PASSWORD) {
          setTimeout(() => {
            navigate(URL.LOGIN);
          }, REDIRECT_TIME_OUT);
        }
      })
      .catch((error) => {
        setSnackbarOpen({
          setopen: true,
          message: error.msg,
          severity: 'error',
        });
        if (error.code === STATUS_CODE.INVALID_PASSWORD_RESET_TOKEN) {
          setTimeout(() => {
            navigate(URL.FORGOT_PASSWORD);
          }, REDIRECT_TIME_OUT);
        }
      })
      .finally(() => setIsLoading(false));
  };
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container-lg">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: '#fafdff', height: '80vh' }}
      >
        <Grid item xs={12} md={4}>
          <Box
            component="form"
            sx={{
              boxShadow: '0px 0px 3px #48B2FF29',
              backgroundColor: '#fff',
              p: 4,
              borderRadius: '8px',
            }}
          >
            <Typography align="left" fontSize="2rem" mb={4}>
              {UI.CHANGE_PASSWORD}
            </Typography>
            <Box>{UI.NEW_PASSWORD}</Box>
            <OutlinedInput
              fullWidth
              {...register('newpassword', {
                required: ERROR_MESSAGE.REQ_ERROR_MSG,
                pattern: {
                  value: REGEX_PATTERN.PASSWORD_FORMAT,
                  message: ERROR_MESSAGE.PASSWORD_MESSAGE,
                },
              })}
              id="outlined-adornment-password"
              variant="outlined"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              placeholder={UI.ENTER_NEW_PASSWORD}
              name="newpassword"
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              error={!!errors.newpassword?.message}
            />
            <div className="field_space">
              {errors.newpassword && (
                <Box>
                  <span className="mandatory">
                    {errors.newpassword.message}
                  </span>
                </Box>
              )}
            </div>

            <Button
              onClick={handleSubmit(onClickBtn)}
              fullWidth
              size="large"
              variant="contained"
              type="submit"
              sx={{ mb: 2 }}
              disabled={isLoading}
              startIcon={
                isLoading && <CircularProgress size="1rem" color="inherit" />
              }
            >
              {UI.SUBMIT}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
    </div>
  );
}

export default ChangePassword;
