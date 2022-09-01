import React, { useState } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import PointsSummary from './PointsSummary';
import BuyCreditPointsDialog from './buyPoints';

function Payment(props) {
  const { onHandlePoints } = props;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNewPointUpdated, setIsNewPointUpdated] = useState(false);

  const handleOpenBuyPointDialog = () => {
    setIsDialogOpen(true);
    setIsNewPointUpdated(false);
  };

  const handleCloseBuyPointDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSuccessTransaction = () => {
    setIsNewPointUpdated(true);
    handleCloseBuyPointDialog();
  };

  return (
    <>
      {isDialogOpen && (
        <BuyCreditPointsDialog
          isDialogOpen={isDialogOpen}
          onCloseBuyPointDialog={handleCloseBuyPointDialog}
          onSuccessTransaction={handleSuccessTransaction}
        />
      )}

      <PointsSummary
        onOpenBuyPointDialog={handleOpenBuyPointDialog}
        isNewPointUpdated={isNewPointUpdated}
        onHandlePoints={onHandlePoints}
      />
    </>
  );
}

Payment.propTypes = {
  onHandlePoints: PropTypes.func,
};
Payment.defaultProps = {
  onHandlePoints: noop,
};

export default Payment;
