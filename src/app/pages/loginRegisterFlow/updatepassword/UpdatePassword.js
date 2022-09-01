/* eslint-disable no-irregular-whitespace */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../../../services';
import ErrorSnackBar from '../../../components/snackBar/ErrorSnackBar';
import URL from '../../../constants/urls';
import STATUS_CODE from '../../../constants/statusCode';
import ERROR_MESSAGE from '../../../constants/errorMsgs';
import REGEX_PATTERN from '../../../constants/regex';
import requestDTO from './updatePassword.helper';
import UI from '../../../constants/ui';

function UpdatePassword() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [opensnackbar, setSnackbarOpen] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [oldPasswordValues, setOldPasswordValues] = useState({
    password: '',
    showPassword: false,
  });

  const [newPasswordValues, setNewPasswordValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen({ setopen: false });
  };

  const onClickBtn = (data) => {
    const oldpassword = btoa(data.oldpassword);
    const newpassword = btoa(data.newpassword);
    const requestPayload = requestDTO(oldpassword, newpassword);
    setIsLoading(true);
    postRequest(`/register/updatepassword`, requestPayload)
      .then((res) => {
        setSnackbarOpen({
          setopen: true,
          message: res.msg,
          severity: 'success',
        });
        if (res.code === STATUS_CODE.UPDATE_PASSWORD_SUCCESSFULLY) {
          setTimeout(() => navigate(URL.HOME), 2000);
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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (field) => (event) => {
    const password = event.target.value;
    if (field === 'oldpassword') {
      setOldPasswordValues({ ...oldPasswordValues, password });
    } else if (field === 'newpassword') {
      setNewPasswordValues({ ...newPasswordValues, password });
    }
    setValue(field, password);
  };

  const handleClickShowPassword = () => {
    setOldPasswordValues({
      ...oldPasswordValues,
      showPassword: !oldPasswordValues.showPassword,
    });
  };

  const newhandleClickShowPassword = () => {
    setNewPasswordValues({
      ...newPasswordValues,
      showPassword: !newPasswordValues.showPassword,
    });
  };

  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: '#fafdff', marginTop: '2rem' }}
      >
        <Grid item xs={12} md={4}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
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
              <div>{UI.OLD_PASSWORD}</div>
              <OutlinedInput
                {...register('oldpassword', {
                  required: ERROR_MESSAGE.REQ_ERROR_MSG,
                  pattern: {
                    value: REGEX_PATTERN.PASSWORD_FORMAT,
                    message: ERROR_MESSAGE.PASSWORD_MESSAGE,
                  },
                })}
                fullWidth
                id="password"
                variant="outlined"
                type={oldPasswordValues.showPassword ? 'text' : 'password'}
                value={oldPasswordValues.password}
                placeholder={UI.ENTER_OLD_PASSWORD}
                name="oldpassword"
                onChange={handleChange('oldpassword')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {oldPasswordValues.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                error={!!errors.oldpassword?.message}
              />
              <FormHelperText error>
                <span> ​</span>
                {errors.oldpassword?.message}
              </FormHelperText>
              <div className="mt-2">{UI.NEW_PASSWORD}</div>
              <OutlinedInput
                {...register('newpassword', {
                  required: ERROR_MESSAGE.REQ_ERROR_MSG,
                  pattern: {
                    value: REGEX_PATTERN.PASSWORD_FORMAT,
                    message: ERROR_MESSAGE.PASSWORD_MESSAGE,
                  },
                })}
                fullWidth
                id="password"
                variant="outlined"
                type={newPasswordValues.showPassword ? 'text' : 'password'}
                value={newPasswordValues.password}
                placeholder={UI.ENTER_NEW_PASSWORD}
                name="newpassword"
                onChange={handleChange('newpassword')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={newhandleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {newPasswordValues.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                error={!!errors.newpassword?.message}
              />
              <FormHelperText error>
                <span> ​</span>
                {errors?.newpassword?.message}
              </FormHelperText>

              <Button
                onClick={handleSubmit(onClickBtn)}
                fullWidth
                size="large"
                variant="contained"
                type="submit"
                sx={{ mt: 2, mb: 2 }}
                disabled={isLoading}
                startIcon={
                  isLoading && <CircularProgress size="1rem" color="inherit" />
                }
              >
                {UI.SUBMIT}
              </Button>
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

export default UpdatePassword;
