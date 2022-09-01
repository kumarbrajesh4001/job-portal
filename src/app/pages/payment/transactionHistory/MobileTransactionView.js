import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getTransactionType } from '../../../formatter/commonBootstrap';
import { getFormattedDateTime } from '../../../formatter/date';
import { transactionTypeColor } from '../../../helpers/colorCode';
import { CommonSkeleton } from '../../../components/skeleton';
import { DEFAULT_SELECTED_PAGE, EMPTY_ARRAY } from '../../../constants';
import UI from '../../../constants/ui';
import PaginationInfo from './PaginationInfo';
import { getFormattedNumber } from '../../../formatter/number';

function MobileTransactionView(props) {
  const {
    setOpen,
    transaction,
    isTransactionSkeletonShow,
    open,
    selectedPage,
    transactionDataShow,
  } = props;

  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow onClick={() => setOpen(!open)}>
            <TableCell>
              <span className="headline-6 color-5B5B5B">
                {UI.VIEW_TRANSACTION_HISTORY}
              </span>
            </TableCell>
            <TableCell align="right">
              <IconButton size="small">
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto">
                {isTransactionSkeletonShow ? (
                  <CommonSkeleton />
                ) : (
                  <Box>
                    <PaginationInfo
                      totalCount={transaction.length}
                      currentPageCount={transactionDataShow.length}
                      selectedPage={selectedPage}
                    />
                    <Table size="small">
                      <TableHead>
                        <TableRow
                          sx={{
                            [`& .${tableCellClasses.root}`]: {
                              borderBottom: 'none',
                            },
                          }}
                        >
                          <TableCell>
                            <span className="subtitle-2-bold color-000000">
                              {UI.DETAILS}
                            </span>
                          </TableCell>

                          <TableCell align="right">
                            <span className="subtitle-2-bold color-000000">
                              {UI.POINTS}
                            </span>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {transactionDataShow?.map((row, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              [`& .${tableCellClasses.root}`]: {
                                borderBottom: 'none',
                              },
                            }}
                          >
                            <TableCell>
                              <span className={transactionTypeColor(row.type)}>
                                {getTransactionType(row.type)}
                              </span>
                              <div className="text-truncate">
                                {row.description.slice(0, 26)}
                              </div>
                              {getFormattedDateTime(row.time)}
                            </TableCell>

                            <TableCell align="center">
                              {getFormattedNumber(row.point)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                )}
              </Collapse>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

MobileTransactionView.propTypes = {
  transaction: PropTypes.array,
  isTransactionSkeletonShow: PropTypes.bool,
  setOpen: PropTypes.func,
  open: PropTypes.bool,
  selectedPage: PropTypes.number,
  transactionDataShow: PropTypes.array,
};
MobileTransactionView.defaultProps = {
  transaction: EMPTY_ARRAY,
  isTransactionSkeletonShow: false,
  setOpen: noop,
  open: false,
  selectedPage: DEFAULT_SELECTED_PAGE,
  transactionDataShow: EMPTY_ARRAY,
};

export default MobileTransactionView;
