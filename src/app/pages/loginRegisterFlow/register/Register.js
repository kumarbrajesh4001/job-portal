import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Typography,
  Container,
  TextField,
  Box,
  Link,
  Grid,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
// import GoogleIcon from '@mui/icons-material/Google';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate, NavLink } from 'react-router-dom';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';
import Select from '../../../components/select';
import ErrorSnackBar from '../../../components/snackBar/ErrorSnackBar';
import { postRequest } from '../../../services';
import URL from '../../../constants/urls';
import { getRoleList } from '../../../formatter/commonBootstrap';
import REGEX_PATTERN from '../../../constants/regex';
import ERROR_MESSAGE from '../../../constants/errorMsgs';
import VALIDATION_VALUES from '../../../constants/validationValues';
import UI from '../../../constants/ui';

export function requestDTO(formData, email, base64Encode) {
  return { ...formData, email, password: base64Encode };
}
function Register() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

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
    const email = data.email.toLowerCase();
    const requestPayload = requestDTO(data, email, base64Encode);
    setIsLoading(true);
    postRequest('/register/user', requestPayload)
      .then((res) => {
        setSnackbarOpen({
          setopen: true,
          message: res.msg,
          severity: 'success',
        });
        navigate(`${URL.VERIFY_EMAIL}?email=${requestPayload.email}`);
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
              <form onSubmit={handleSubmit(onClickBtn)}>
                <Typography align="left" fontSize="2rem" mb={4}>
                  {UI.REGISTER}
                </Typography>
                <Box>{UI.FULL_NAME_COMPANY_NAME}</Box>
                <TextField
                  {...register('name', {
                    required: ERROR_MESSAGE.REQ_ERROR_MSG,
                    pattern: {
                      value: REGEX_PATTERN.NAME_FORMAT,
                      message: ERROR_MESSAGE.NAME_VALIDATION_MESSAGE,
                    },
                  })}
                  fullWidth
                  type="text"
                  id="name"
                  variant="outlined"
                  placeholder={UI.FULL_NAME_COMPANY_NAME}
                  name="name"
                />
                {errors.name && (
                  <Box>
                    <span className="mandatory">{errors.name.message}</span>
                  </Box>
                )}
                <Box>{UI.EMAIL}</Box>
                <TextField
                  {...register('email', {
                    required: ERROR_MESSAGE.REQ_ERROR_MSG,
                    pattern: {
                      value: REGEX_PATTERN.EMAIL_FORMAT,
                      message: ERROR_MESSAGE.EMAIL_VALIDATION,
                    },
                  })}
                  fullWidth
                  type="email"
                  id="email"
                  variant="outlined"
                  placeholder={UI.ENTER_EMAIL}
                  name="email"
                />
                {errors.email && (
                  <Box>
                    <span className="mandatory">{errors.email.message}</span>
                  </Box>
                )}
                <div className="d-flex align-items-center">
                  {UI.PASSWORD}
                  <Tooltip title={ERROR_MESSAGE.PASSWORD_INFO}>
                    <HelpOutlineIcon
                      sx={{ fontSize: 16, ms: 4 }}
                      color="disabled"
                    />
                  </Tooltip>
                </div>
                <OutlinedInput
                  fullWidth
                  {...register('password', {
                    required: ERROR_MESSAGE.REQ_ERROR_MSG,
                    pattern: {
                      value: REGEX_PATTERN.PASSWORD_FORMAT,
                      message: ERROR_MESSAGE.PASSWORD_MESSAGE,
                    },
                    maxLength: {
                      value: VALIDATION_VALUES.MAX_VALUE_16,
                      message:
                        ERROR_MESSAGE.MAX_ERROR_MSG +
                        VALIDATION_VALUES.MAX_VALUE_16,
                    },
                  })}
                  id="outlined-adornment-password"
                  variant="outlined"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  placeholder={UI.ENTER_PASSWORD}
                  name="password"
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment
                      position="end"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      <IconButton
                        aria-label="toggle password visibility"
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
                <Box>{UI.PHONE_NUMBER}</Box>
                <TextField
                  {...register('mobile', {
                    required: ERROR_MESSAGE.REQ_ERROR_MSG,
                    pattern: {
                      value: REGEX_PATTERN.NUMERIC_FORMAT,
                      message: ERROR_MESSAGE.PHONE_VALIDATION_MESSAGE,
                    },
                    minLength: {
                      value: VALIDATION_VALUES.MIN_VALUE,
                      message:
                        ERROR_MESSAGE.MIN_ERROR_MSG +
                        VALIDATION_VALUES.MIN_VALUE,
                    },
                    maxLength: {
                      value: VALIDATION_VALUES.MAX_VALUE_15,
                      message:
                        ERROR_MESSAGE.MAX_ERROR_MSG +
                        VALIDATION_VALUES.MAX_VALUE_15,
                    },
                  })}
                  fullWidth
                  type="text"
                  id="number"
                  inputProps={{
                    maxLength: VALIDATION_VALUES.MAX_VALUE_15,
                    minLength: VALIDATION_VALUES.MAX_VALUE_10,
                  }}
                  variant="outlined"
                  placeholder={UI.ENTER_PHONE_NUMBER}
                  name="mobile"
                />
                {errors.mobile && (
                  <Box>
                    <span className="mandatory">{errors.mobile.message}</span>
                  </Box>
                )}
                <Box>{UI.ROLE}</Box>
                <Select
                  inputId="role"
                  name="role"
                  control={control}
                  options={getRoleList()}
                  isRequired
                  fullWidth
                  id="role"
                  defaultValue={UI.SELECT_OPTION}
                  {...register('role')}
                />
                {errors.role && (
                  <span className="mandatory">{errors.role.message}</span>
                )}
                <Typography
                  align="center"
                  sx={{
                    fontSize: '10px',
                    mt: 2,
                    mb: 2,
                    letterSpacing: '1px',
                  }}
                >
                  {UI.BY_CLICKING_AGREE_JOIN_YOU_AGREE_TO_THE_COMPANY_IN}{' '}
                  <Link href="/" underline="none" target="_blank">
                    {UI.PRIVACY_POLICY}{' '}
                  </Link>
                  <br />
                  {UI.AND}{' '}
                  <Link href="/" underline="none" target="_blank">
                    {UI.TERM_AND_CONDITIONS}
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
                  {UI.REGISTER}
                </Button>
              </form>
              {/* <Box component="div" textAlign="center">
                Or
              </Box> */}
              {/* <Button
                fullWidth
                startIcon={<GoogleIcon />}
                size="large"
                variant="outlined"
                type="submit"
                sx={{ color: 'gray', mt: 2,  }}
              >
                Continue with Google
              </Button>
              <br />
              <Button
                fullWidth
                startIcon={<LinkedInIcon />}
                size="large"
                variant="outlined"
                type="submit"
                sx={{ color: 'gray', mt: 2,  }}
              >
                Continue with LinkedIn
              </Button> */}
            </Box>
            <Typography
              sx={{ color: 'gray', mx: 4, mt: 1, textAlign: 'center' }}
            >
              {UI.ALREADY_ON_COMPANY_IN}{' '}
              <Link
                sx={{ color: '#1976d2' }}
                underline="none"
                as={NavLink}
                to={URL.LOGIN}
              >
                {UI.LOGIN}
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
export default Register;
