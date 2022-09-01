import React, { useState, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Pagination from '@mui/material/Pagination';
import DesktopViewTransaction from './DesktopViewTransaction';
import MobileTransactionView from './MobileTransactionView';
import ErrorSnackBar from '../../../components/snackBar/ErrorSnackBar';
import useMobileDevice from '../../../hooks/useMobileDevice';
import {
  DEFAULT_SELECTED_PAGE,
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  PAGINATION_ROWS,
} from '../../../constants';
import Content from '../../../components/content';
import { portalScrollTo } from '../../../utils/scroll';

export default function TransactionHistory(props) {
  const {
    setOpen,
    transaction,
    isTransactionSkeletonShow,
    opensnackbar,
    handleClose,
    open,
  } = props;

  const [selectedPage, setSelectedPage] = useState(DEFAULT_SELECTED_PAGE);
  const isMobileDevice = useMobileDevice();

  const transactionDataShow = useMemo(
    () =>
      transaction.slice(
        (selectedPage - 1) * PAGINATION_ROWS,
        (selectedPage - 1) * PAGINATION_ROWS + PAGINATION_ROWS
      ),
    [transaction, selectedPage]
  );

  const myRef = useRef();

  return (
    <div ref={myRef} className="mt-2 card-border">
      {isMobileDevice ? (
        <MobileTransactionView
          setOpen={setOpen}
          transaction={transaction}
          isTransactionSkeletonShow={isTransactionSkeletonShow}
          open={open}
          selectedPage={selectedPage}
          transactionDataShow={transactionDataShow}
        />
      ) : (
        <DesktopViewTransaction
          setOpen={setOpen}
          transaction={transaction}
          isTransactionSkeletonShow={isTransactionSkeletonShow}
          open={open}
          selectedPage={selectedPage}
          transactionDataShow={transactionDataShow}
        />
      )}

      {open && (
        <Content condition={transaction.length > PAGINATION_ROWS}>
          <Pagination
            count={Math.ceil(transaction.length / PAGINATION_ROWS)}
            className="justify-content-center d-flex py-2"
            onChange={(_, page) => {
              portalScrollTo(myRef);
              setSelectedPage(page);
            }}
            page={selectedPage}
          />
        </Content>
      )}
      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
    </div>
  );
}

TransactionHistory.propTypes = {
  transaction: PropTypes.array,
  isTransactionSkeletonShow: PropTypes.bool,
  opensnackbar: PropTypes.object,
  handleClose: PropTypes.func,
  setOpen: PropTypes.func,
  open: PropTypes.bool,
};

TransactionHistory.defaultProps = {
  transaction: EMPTY_ARRAY,
  isTransactionSkeletonShow: false,
  opensnackbar: EMPTY_OBJECT,
  handleClose: noop,
  setOpen: noop,
  open: false,
};
