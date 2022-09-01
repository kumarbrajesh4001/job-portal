import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { getFormattedDateTime } from '../../../formatter/date';
import UI from '../../../constants/ui';
import { EMPTY_OBJECT } from '../../../constants';
import TRANSACTION_STATUS from './buyPoints.status';
import PaymentInformationLabelValueView from '../PaymentInformationLabelValueView';

function TransactionStatus(props) {
  const { transactionStatus, onCloseBuyPointDialog, onSuccessTransaction } =
    props;

  return (
    <>
      <DialogContent>
        <PaymentInformationLabelValueView
          condition={transactionStatus.gwtxnid}
          label={UI.GATEWAY_TRANSACTION_ID}
          value={transactionStatus.gwtxnid}
        />

        <PaymentInformationLabelValueView
          condition={transactionStatus.banktxnid}
          label={UI.BANK_TRANSACTION_ID}
          value={transactionStatus.banktxnid}
        />

        <PaymentInformationLabelValueView
          condition={transactionStatus.orderid}
          label={UI.ORDERID}
          value={transactionStatus.orderid}
        />

        <PaymentInformationLabelValueView
          condition={transactionStatus.txndate}
          label={UI.TRANSACTION_TIME}
          value={getFormattedDateTime(transactionStatus.txndate)}
        />

        <PaymentInformationLabelValueView
          condition={transactionStatus.message}
          label={UI.MESSAGE}
          value={transactionStatus.message}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={
            transactionStatus.statuscode === TRANSACTION_STATUS.SUCCESS
              ? onSuccessTransaction
              : onCloseBuyPointDialog
          }
        >
          {transactionStatus.statuscode === TRANSACTION_STATUS.SUCCESS
            ? UI.OK
            : UI.TRY_AGAIN}
        </Button>
      </DialogActions>
    </>
  );
}

TransactionStatus.propTypes = {
  transactionStatus: PropTypes.object,
  onCloseBuyPointDialog: PropTypes.func,
  onSuccessTransaction: PropTypes.func,
};

TransactionStatus.defaultProps = {
  transactionStatus: EMPTY_OBJECT,
  onCloseBuyPointDialog: noop,
  onSuccessTransaction: noop,
};

export default TransactionStatus;
