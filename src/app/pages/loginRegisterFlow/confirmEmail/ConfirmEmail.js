import React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import URL from '../../../constants/urls';
import UI from '../../../constants/ui';

function ConfirmEmail() {
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
                {UI.CONFIRM_EMAIL_SUCCESSFULL}
              </Typography>
              <Typography
                align="center"
                color="#AAAAAA"
                fontSize="1.25rem"
                mb={4}
              >
                {UI.YOUR_EMAIL_ID_IS_REGISTERD}
              </Typography>
              <Typography
                fontSize="1.2rem"
                sx={{ color: 'gray', mx: 4, mt: 1, textAlign: 'center' }}
              >
                {UI.NOW_CLICK_GOING_TO_LOGIN_SECTION}{' '}
                <Link
                  sx={{ color: '#1976d2' }}
                  underline="none"
                  as={NavLink}
                  to={URL.LOGIN}
                >
                  {UI.LOGIN}
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ConfirmEmail;
