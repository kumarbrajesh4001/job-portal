import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import { EMPTY_ARRAY } from '../../constants';
import useMobileDevice from '../../hooks/useMobileDevice';

function ActionMenu(props) {
  const { actions, onAction } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMobileDevice = useMobileDevice();

  const open = Boolean(anchorEl);

  const handleOpenActionMenu = (event) => {
    setAnchorEl(event.currentTarget);
    if (isMobileDevice) {
      event.stopPropagation();
    }
  };

  const handleCloseActionMenu = (event) => {
    setAnchorEl(null);
    if (isMobileDevice) {
      event.stopPropagation();
    }
  };

  const onSelectAction = (action, event) => {
    onAction(action);

    setAnchorEl(null);
    if (isMobileDevice) {
      event.stopPropagation();
    }
  };

  return (
    <div className="justify-content-end d-flex">
      {actions.length > 0 ? (
        <>
          <IconButton onClick={handleOpenActionMenu}>
            <MoreHorizIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleCloseActionMenu}>
            {actions.map((option, index) => (
              <MenuItem
                key={index}
                onClick={(event) => onSelectAction(option, event)}
              >
                {option.action}
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : null}
    </div>
  );
}

ActionMenu.propTypes = {
  actions: PropTypes.array,
  onAction: PropTypes.func,
};

ActionMenu.defaultProps = {
  actions: EMPTY_ARRAY,
  onAction: noop,
};

export default ActionMenu;
