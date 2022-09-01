import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getRequest } from '../../../services';
import URL from '../../../constants/urls';
import STATUS_CODE from '../../../constants/statusCode';
import REGEX_PATTERN from '../../../constants/regex';
import ERROR_MESSAGE from '../../../constants/errorMsgs';
import UI from '../../../constants/ui';
import Dialog from '../../../components/dialog';

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isVisibleResetPasswordMailLink, setIsVisibleResetPasswordMailLink] =
    useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [responseTitle, setResponseTitle] = useState('');

  const handleResponse = (resCode, resMsg) => {
    if (resCode === STATUS_CODE.PASSWORD_RESET_MAIL_SENT) {
      setResponseTitle(UI.PASSWORD_RESET_LINK_SENT_SUCCESSFULLY);
    } else if (
      resCode ===
      STATUS_CODE.EXCEEDED_ATTEMPTS_TO_GENERATE_TOKEN_FOR_PASSWORD_RESET
    ) {
      setResponseTitle(UI.PASSWORD_RESET_ATTEMPTS_EXCEEDED);
    } else if (resCode === STATUS_CODE.USRE_NOTFOUND) {
      setResponseTitle(UI.USER_NOT_FOUND);
    }
    setMessage(resMsg);
    setIsVisibleResetPasswordMailLink(true);
  };

  const handleDialogClose = () => {
    setIsVisibleResetPasswordMailLink(false);
    navigate(URL.LOGIN);
  };

  const onClickBtn = (data) => {
    const newData = new URLSearchParams(data.emailid.toLowerCase());
    const convertedEmailId = newData.toString().split('=')[0];
    setIsLoading(true);
    getRequest(
      `/register/resetpassword?email=${convertedEmailId.toLowerCase()}`
    )
      .then((res) => {
        handleResponse(res.code, res.msg);
      })
      .catch((error) => {
        handleResponse(error.code, error.msg);
      })
      .finally(() => setIsLoading(false));
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
          {isVisibleResetPasswordMailLink ? (
            <Dialog
              isDialogOpen={isVisibleResetPasswordMailLink}
              title={responseTitle}
              content={message}
              primaryLabel={UI.CLOSE}
              primaryAction={handleDialogClose}
            />
          ) : (
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
                {UI.FORGOT_PASSWORD_}
              </Typography>
              <Box>{UI.ENTER_YOUR_REGISTERED_EMAIL}</Box>
              <TextField
                {...register('emailid', {
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
                placeholder={UI.ENTER_YOUR_REGISTERED_EMAIL}
                name="emailid"
                error={!!errors.emailid?.message}
              />
              <FormHelperText error>
                <span>&nbsp;</span>
                {errors.emailid?.message}
              </FormHelperText>
              <Button
                onClick={handleSubmit(onClickBtn)}
                fullWidth
                size="large"
                variant="contained"
                type="submit"
                sx={{ mb: 2, mt: 1 }}
                disabled={isLoading}
                startIcon={
                  isLoading && <CircularProgress size="1rem" color="inherit" />
                }
              >
                {UI.SEND}
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default ForgotPassword;
