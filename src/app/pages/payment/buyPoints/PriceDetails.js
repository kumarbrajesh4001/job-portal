import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import noop from 'lodash/noop';
import CircularProgress from '@mui/material/CircularProgress';
import makePayment from '../paymentHelper';
import { EMPTY_ARRAY } from '../../../constants';
import PRODUCTS from '../../../constants/products';
import { addScript } from '../../../helpers/addScript';
import { postRequest, getRequest } from '../../../services';
import {
  getTxnTokenUrl,
  getPaytmScriptUrl,
  API_URL,
} from '../../../constants/apiUrls';
import ErrorSnackBar from '../../../components/snackBar/ErrorSnackBar';
import { getMid } from '../../../formatter/paymentBootstrap';
import { docId } from '../payment.constants';
import UI from '../../../constants/ui';
import { getFormattedCurrency } from '../../../formatter/number';

function PriceDetails(props) {
  const { onBack, amount, setTransactionStatus } = props;

  const loaded = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [opensnackbar, setSnackbarOpen] = useState();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen({ setopen: false });
  };
  useEffect(() => {
    const mid = getMid();
    const scriptSrc = getPaytmScriptUrl(mid);
    addScript(loaded, scriptSrc, docId);
  }, EMPTY_ARRAY);

  const handleTransactionStatus = (data) => {
    postRequest(API_URL.PAYMENT_UPDATE, data)
      .then((res) => {
        setTransactionStatus(res);

        if (res.httpCode === 'OK') {
          setSnackbarOpen({
            setopen: true,
            message: res.msg,
            severity: 'success',
          });
        } else {
          setSnackbarOpen({
            setopen: true,
            message: res.msg,
            severity: 'warning',
          });
        }
      })
      .catch((err) => {
        setSnackbarOpen({
          setopen: true,
          message: err.msg,
          severity: 'error',
        });
      })
      .finally(() => {
        setIsLoading(false);
        window.Paytm.CheckoutJS.close();
      });
  };
  const handleMerchant = () => {
    setIsLoading(false);
    // Call the handleMerchant Action to notify the Merchant about the eventName (eventName)
  };

  const handlePayment = () => {
    setIsLoading(true);
    getRequest(getTxnTokenUrl(PRODUCTS.POINTS, amount))
      .then((txnData) => {
        makePayment(txnData, amount, handleMerchant, handleTransactionStatus)
          .then(() => {
            window.Paytm.CheckoutJS.invoke();
          })
          .catch(() => {
            setIsLoading(false);
          });
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <DialogContent>
        <div className="row">
          <div className="col-8 body-1 color-000000 mt-3 mb-3">{UI.TOTAL}</div>
          <div className="col-4 body-1 color-000000 mt-3 mb-3">
            {getFormattedCurrency(amount)}
          </div>

          {/* this line/comment use farther */}

          {/* <div className="col-8 body-1 color-F25C05 mt-3 mb-3">
            Discount (10% off)
          </div> 
          <div className="col-4 body-1 color-000000 mt-3 mb-3">0</div> */}

          <hr />
          <div className="col-8 mb-2">{UI.TOTAL_PAYABLE_AMOUNT}</div>
          <div className="col-4 mb-2">{getFormattedCurrency(amount)}</div>
        </div>
      </DialogContent>
      <div className="d-flex justify-content-end mt-4">
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              onBack(false);
            }}
          >
            <ArrowBackIcon fontSize="small" /> {UI.BACK_BUTTON}
          </Button>
        </DialogActions>
        <DialogActions>
          <Button
            variant="contained"
            fullWidth
            disabled={isLoading}
            startIcon={
              isLoading && <CircularProgress size="1rem" color="inherit" />
            }
            onClick={handlePayment}
          >
            {UI.MAKE_PAYMENT}
          </Button>
        </DialogActions>
      </div>
      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
    </>
  );
}

PriceDetails.propTypes = {
  onBack: PropTypes.func,
  amount: PropTypes.number,
  setTransactionStatus: PropTypes.func,
};
PriceDetails.defaultProps = {
  onBack: noop,
  amount: 0,
  setTransactionStatus: noop,
};

export default PriceDetails;
