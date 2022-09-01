import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import noop from 'lodash/noop';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import ErrorSnackBar from '../../components/snackBar/ErrorSnackBar';
import { getRequest } from '../../services';
import { API_URL, getCouponUrl } from '../../constants/apiUrls';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../constants';
import VALIDATION_VALUES from '../../constants/validationValues';
import getTotalAvailablePoints from '../../helpers/totalAvailablePoints';
import ERROR_MESSAGE from '../../constants/errorMsgs';
import { CommonSkeleton } from '../../components/skeleton';
import TransactionHistory from './transactionHistory/TransactionHistory';
import { getFormattedNumber } from '../../formatter/number';
import UI from '../../constants/ui';

function PointsSummary(props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { onOpenBuyPointDialog, isNewPointUpdated, onHandlePoints } = props;
  const [points, setPoints] = useState(EMPTY_OBJECT);

  const [isPointsSkeletonShow, setIsPointsSkeletonShow] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isTransactionSkeletonShow, setIsTransactionSkeletonShow] =
    useState(true);
  const [isTransactionHistoryTableOpen, setIsTransactionHistoryTableOpen] =
    useState(false);

  const [transaction, setTransaction] = useState(EMPTY_ARRAY);

  const [opensnackbar, setSnackbarOpen] = useState();

  const getTransactionHistory = () => {
    setIsTransactionSkeletonShow(true);
    getRequest(API_URL.HISTORY)
      .then(setTransaction)
      .catch((error) => {
        setSnackbarOpen({
          setopen: true,
          message: error.msg,
          severity: 'error',
        });
      })
      .finally(() => {
        setIsTransactionSkeletonShow(false);
      });
  };

  useEffect(() => {
    if (isTransactionHistoryTableOpen) {
      getTransactionHistory();
    }
  }, [isTransactionHistoryTableOpen]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen({ setopen: false });
  };

  const getPointsByCouponCode = (data) => {
    setIsLoading(true);

    getRequest(getCouponUrl(data.redeemfreepoints))
      .then((res) => {
        setPoints(res);
        onHandlePoints(res);
        if (isTransactionHistoryTableOpen) {
          getTransactionHistory();
        }
        setValue('redeemfreepoints', undefined);
      })
      .catch((error) => {
        setSnackbarOpen({
          setopen: true,
          message: error.msg,
          severity: 'error',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getPoints = () => {
    if (isTransactionHistoryTableOpen) {
      getTransactionHistory();
    }

    setIsPointsSkeletonShow(true);

    getRequest(API_URL.POINTS)
      .then((res) => {
        setPoints(res);
        onHandlePoints(res);
      })
      .catch((error) => {
        setSnackbarOpen({
          setopen: true,
          message: error.msg,
          severity: 'error',
        });
      })
      .finally(() => {
        setIsPointsSkeletonShow(false);
      });
  };

  useEffect(() => {
    getPoints();
  }, EMPTY_ARRAY);

  useEffect(() => {
    if (isNewPointUpdated) {
      getPoints();
    }
  }, [isNewPointUpdated]);

  return (
    <div className="container">
      {isPointsSkeletonShow ? (
        <CommonSkeleton />
      ) : (
        <div>
          <div className="headline-5-bold color-000000 my-2">
            {UI.CREDIT_POINTS}
          </div>
          <div className="card-border">
            <div className="row">
              <div className="col-sm-4 mb-3">
                <div className="d-flex justify-content-center body-2 color-000000 mt-4">
                  {UI.AVAILABLE_POINTS}
                </div>
                <div className="d-flex justify-content-center mt-3 headline-3 color-000000">
                  {getFormattedNumber(getTotalAvailablePoints(points))}
                </div>

                <div className="d-flex justify-content-center pt-3 mt-sm-2 mt-md-4">
                  <Button
                    onClick={() => {
                      onOpenBuyPointDialog(true);
                    }}
                    variant="contained"
                  >
                    {UI.BUY_POINTS}
                  </Button>
                </div>
              </div>
              <div className="col-sm-8 mb-3">
                <div className="body-2 color-000000 mt-4 text-center text-md-start">
                  {UI.FREE_POINTS}
                </div>

                <div className="mt-3 headline-3 color-000000 text-center text-md-start">
                  {getFormattedNumber(points?.freepoints?.point) || 0}
                </div>

                <div className="row px-4 px-md-0 ">
                  <label
                    htmlFor="free-points"
                    className="mt-3 subtitle-1 color-000000 mb-1"
                  >
                    {UI.REDEEM_FREE_POINTS}
                  </label>

                  <div className="col-sm-6">
                    <TextField
                      {...register('redeemfreepoints', {
                        required: ERROR_MESSAGE.REQ_ERROR_MSG,

                        maxLength: {
                          value: VALIDATION_VALUES.MAX_VALUE_40,
                          message:
                            ERROR_MESSAGE.MAX_ERROR_MSG +
                            VALIDATION_VALUES.MAX_VALUE_40,
                        },
                      })}
                      placeholder={UI.FREE_CODE_PLACEHOLDER}
                      fullWidth
                      id="free-points"
                      size="small"
                      error={!!errors.redeemfreepoints?.message}
                    />
                    <FormHelperText error>
                      <span> </span>
                      {errors.redeemfreepoints?.message}
                    </FormHelperText>
                  </div>

                  <div className="col-sm-4 ps-md-0 mt-2 mt-md-0">
                    <Button
                      onClick={handleSubmit(getPointsByCouponCode)}
                      type="button"
                      variant="outlined"
                      disabled={isLoading}
                      startIcon={
                        isLoading && (
                          <CircularProgress size="1rem" color="inherit" />
                        )
                      }
                    >
                      {UI.APPLY_BUTTON}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <TransactionHistory
            setOpen={setIsTransactionHistoryTableOpen}
            transaction={transaction}
            isTransactionSkeletonShow={isTransactionSkeletonShow}
            opensnackbar={opensnackbar}
            handleClose={handleClose}
            open={isTransactionHistoryTableOpen}
          />
        </div>
      )}
      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
    </div>
  );
}

PointsSummary.propTypes = {
  onOpenBuyPointDialog: PropTypes.func,
  isNewPointUpdated: PropTypes.bool,
  onHandlePoints: PropTypes.func,
};
PointsSummary.defaultProps = {
  onOpenBuyPointDialog: noop,
  isNewPointUpdated: false,
  onHandlePoints: noop,
};
export default PointsSummary;
