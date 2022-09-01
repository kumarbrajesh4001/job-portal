/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import noop from 'lodash/noop';
import BuyCreditPoints from './BuyCreditPoints';
import TransactionStatus from './TransactionStatus';
import PriceDetails from './PriceDetails';
import TRANSACTION_STATUS from './buyPoints.status';
import UI from '../../../constants/ui';
import { getFormattedCurrency } from '../../../formatter/number';
import COMMON_STYLE from '../../../constants/commonStyle';

function BuyCreditPointsDialog(props) {
  const { isDialogOpen, onCloseBuyPointDialog, onSuccessTransaction } = props;

  const [transactionStatus, setTransactionStatus] = useState();
  const [isPriceDetailsVisible, setIsPriceDetailsVisible] = useState(false);
  const [amount, setAmount] = useState();

  const handleDisplayPriceDetails = (formData) => {
    setIsPriceDetailsVisible(true);
    setAmount(+formData.amountforBuyPoints || 0);
  };

  return (
    isDialogOpen && (
      <Dialog open={isDialogOpen}>
        <DialogTitle>
          {transactionStatus ? (
            <div className="d-flex align-items-center justify-content-center">
              {transactionStatus?.statuscode === TRANSACTION_STATUS.SUCCESS ? (
                <CheckCircleIcon
                  color="success"
                  fontSize="large"
                  sx={COMMON_STYLE.PAYMENT_ICON}
                />
              ) : (
                <ErrorIcon
                  color="error"
                  fontSize="large"
                  sx={COMMON_STYLE.PAYMENT_ICON}
                />
              )}
            </div>
          ) : isPriceDetailsVisible ? (
            UI.PRICE_DETAILS
          ) : (
            UI.BUY_CREDIT
          )}
          <IconButton
            onClick={
              transactionStatus?.statuscode === TRANSACTION_STATUS.SUCCESS
                ? onSuccessTransaction
                : onCloseBuyPointDialog
            }
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <div className="d-flex justify-content-center headline-3-bold mt-1">
            {getFormattedCurrency(transactionStatus?.amount)}
          </div>
          <div className="d-flex justify-content-center headline-6 mb-1">
            {transactionStatus?.statuscode === TRANSACTION_STATUS.SUCCESS
              ? UI.SUCCESSFUL
              : UI.FAILED}
          </div>
        </DialogTitle>

        {transactionStatus ? (
          <TransactionStatus
            transactionStatus={transactionStatus}
            onCloseBuyPointDialog={onCloseBuyPointDialog}
            onSuccessTransaction={onSuccessTransaction}
          />
        ) : isPriceDetailsVisible ? (
          <PriceDetails
            onBack={setIsPriceDetailsVisible}
            amount={amount}
            setTransactionStatus={setTransactionStatus}
          />
        ) : (
          <BuyCreditPoints
            onHandleDisplayPriceDetails={handleDisplayPriceDetails}
          />
        )}
      </Dialog>
    )
  );
}

BuyCreditPointsDialog.propTypes = {
  isDialogOpen: PropTypes.bool,
  onCloseBuyPointDialog: PropTypes.func,
  onSuccessTransaction: PropTypes.func,
};

BuyCreditPointsDialog.defaultProps = {
  isDialogOpen: false,
  onCloseBuyPointDialog: noop,
  onSuccessTransaction: noop,
};

export default BuyCreditPointsDialog;
