import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';

function CommonChipsView(props) {
  const { label, index, onDelete } = props;

  return (
    <Chip
      key={index}
      className="m-1"
      label={label}
      variant="outlined"
      onDelete={onDelete}
    />
  );
}

CommonChipsView.propTypes = {
  label: PropTypes.string,
  index: PropTypes.number,
  onDelete: PropTypes.func,
};

CommonChipsView.defaultProps = {
  label: undefined,
  index: null,
  onDelete: undefined,
};

export default CommonChipsView;
