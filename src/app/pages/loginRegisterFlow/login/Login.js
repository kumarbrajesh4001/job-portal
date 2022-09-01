import React, { useState } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Button,
  Typography,
  TextField,
  Box,
  Link,
  Grid,
  Container,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
// import GoogleIcon from '@mui/icons-material/Google';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import URL from '../../../constants/urls';
import ErrorSnackBar from '../../../components/snackBar/ErrorSnackBar';
import STATUS_CODE from '../../../constants/statusCode';
import { setLoginDetailInSession } from '../../../helpers/sessionDetails';
import { getRequest } from '../../../services';
import REGEX_PATTERN from '../../../constants/regex';
import ERROR_MESSAGE from '../../../constants/errorMsgs';
import { API_URL } from '../../../constants/apiUrls';
import { getDefaultUrlBasedOnRoleAndStatus } from '../../../helpers/getRedirectUrl';
import UI from '../../../constants/ui';
import { REDIRECT_TIME_OUT } from '../../../constants';

export function requestDTO(formData, username, base64Encode) {
  return { ...formData, username, password: base64Encode };
}
function Login(props) {
  const { setLoggedInUserRole, onHandlePoints } = props;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    setValue,
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
    const base64Encode = btoa(data.password);
    const username = data.username.toLowerCase();
    const requestPayload = requestDTO(data, username, base64Encode);
    const requestPayloads = new URLSearchParams(requestPayload);
    const finalPayload = requestPayloads.toString();
    setIsLoading(true);
    axios
      .post(API_URL.LOGIN, finalPayload, {
        withCredentials: true,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((res) => {
        setSnackbarOpen({
          setopen: true,
          message: res?.data?.msg,
          severity: 'success',
        });
        if (res.data.code === STATUS_CODE.SUCCESSFULLY_LOGIN) {
          getRequest(API_URL.POINTS).then((response) => {
            onHandlePoints(response);
          });

          setIsLoading(true);
          getRequest(API_URL.CREDENTIAL)
            .then((resp) => {
              const loggedInUserRole = resp.role;
              setLoggedInUserRole(loggedInUserRole);
              setLoginDetailInSession(resp);
              let navigateUrl = searchParams.get('redirectTo');
              if (!navigateUrl) {
                navigateUrl = getDefaultUrlBasedOnRoleAndStatus(
                  loggedInUserRole,
                  resp.profileupdated
                );
              }
              navigate(navigateUrl, { replace: true });
            })
            .finally(() => setIsLoading(false));
        }
      })
      .catch((error) => {
        setSnackbarOpen({
          setopen: true,
          message: error.response?.data?.msg,
          severity: 'error',
        });
        if (
          error.response.data.code ===
          STATUS_CODE.RESEND_EMAIL_OF_DISABLE_ACCOUNTS
        ) {
          setTimeout(() => {
            navigate(`${URL.VERIFY_EMAIL}?email=${data.username}`);
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
    const password = event.target.value;
    setValues({ ...values, [prop]: password });
    setValue('password', password);
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
    <Container maxWidth="lg">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: '#fafdff', marginTop: '2rem' }}
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
              <form onSubmit={handleSubmit(onClickBtn)} autoComplete="on">
                <div className="headline-5 mb-3">{UI.LOGIN}</div>
                <div className="my-2">{UI.EMAIL}</div>
                <TextField
                  {...register('username', {
                    required: ERROR_MESSAGE.REQ_ERROR_MSG,
                    pattern: {
                      value: REGEX_PATTERN.EMAIL_FORMAT,
                      message: ERROR_MESSAGE.EMAIL_VALIDATION,
                    },
                  })}
                  fullWidth
                  type="email"
                  id="username"
                  variant="outlined"
                  placeholder={UI.ENTER_EMAIL}
                  name="username"
                  autoComplete="username"
                />

                {errors.username && (
                  <Box>
                    <span className="mandatory">{errors.username.message}</span>
                  </Box>
                )}
                <div className="my-2">{UI.PASSWORD}</div>
                <OutlinedInput
                  {...register('password', {
                    required: ERROR_MESSAGE.REQ_ERROR_MSG,
                  })}
                  fullWidth
                  id="password"
                  variant="outlined"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  placeholder={UI.ENTER_PASSWORD}
                  name="password"
                  autoComplete="current-password"
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.password && (
                  <Box>
                    <span className="mandatory">{errors.password.message}</span>
                  </Box>
                )}
                <Typography sx={{ mb: 2 }}>
                  <Link
                    // sx={{ color: 'gray' }}
                    as={NavLink}
                    to={URL.FORGOT_PASSWORD}
                    underline="none"
                  >
                    <span className="subtitle-2 color-1D8FF2">
                      {UI.FORGOT_PASSWORD}
                    </span>
                  </Link>
                </Typography>

                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  type="submit"
                  sx={{ mb: 2 }}
                  disabled={isLoading}
                  startIcon={
                    isLoading && (
                      <CircularProgress size="1rem" color="inherit" />
                    )
                  }
                >
                  {UI.LOGIN}
                </Button>
              </form>
              {/* <Box component="div" textAlign="center">
                Or
              </Box>
              <Box component="div">
                <Button
                  fullWidth
                  startIcon={<GoogleIcon />}
                  size="large"
                  variant="outlined"
                  type="submit"
                  sx={{ color: 'gray', mt: 2,  }}
                >
                  Login with Google
                </Button>
              </Box>

              <Button
                fullWidth
                startIcon={<LinkedInIcon />}
                size="large"
                variant="outlined"
                type="submit"
                sx={{ color: 'gray', mt: 2,  }}
              >
                Login with LinkedIn
              </Button> */}
            </Box>
            <Typography
              sx={{ color: 'gray', mx: 4, mt: 1, textAlign: 'center' }}
            >
              {UI.NEW_TO_COMPANY_IN}&nbsp;
              <Link
                sx={{ color: '#1976d2' }}
                as={NavLink}
                to={URL.REGISTER}
                underline="none"
              >
                {UI.REGISTER_FOR_FREE}
              </Link>
            </Typography>
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

Login.propTypes = {
  setLoggedInUserRole: PropTypes.func,
  onHandlePoints: PropTypes.func,
};

Login.defaultProps = {
  setLoggedInUserRole: noop,
  onHandlePoints: noop,
};

export default Login;
