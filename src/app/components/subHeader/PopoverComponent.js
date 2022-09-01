import { useState } from 'react';
import PropTypes from 'prop-types';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { EMPTY_ARRAY } from '../../constants';
import UI from '../../constants/ui';

function PopoverComponent(props) {
  const { filterField, className } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={`ms-2 ${className}`}>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        variant="span"
        className="caption color-5EADF"
      >
        +{filterField.length - 2} {UI.MORE}
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {filterField.map((value, index) => {
          if (index > 1) {
            return (
              <Typography sx={{ px: 1, my: 1 }} key={index}>
                {value.name}
              </Typography>
            );
          }
          return null;
        })}
      </Popover>
    </div>
  );
}

PopoverComponent.propTypes = {
  filterField: PropTypes.array,
  className: PropTypes.string,
};

PopoverComponent.defaultProps = {
  filterField: EMPTY_ARRAY,
  className: undefined,
};

export default PopoverComponent;
