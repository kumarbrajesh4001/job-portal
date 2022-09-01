import React from 'react';
import last from 'lodash/last';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import { EMPTY_OBJECT } from '../../constants';
import Content from '../content';
import UI from '../../constants/ui';

function Remark(props) {
  const { state } = props;
  const remarkText = last(state.empstate)?.remark || state.candstate?.remark;

  return (
    <Content condition={!!remarkText}>
      <div className="d-flex mt-2">
        <span className="color-5B5B5B subtitle-2">{UI.REMARKS}:</span>
        <Tooltip title={remarkText || ''}>
          <div className="text-truncate body-2 color-1F2830 ms-1">
            {remarkText}
          </div>
        </Tooltip>
      </div>
    </Content>
  );
}

Remark.propTypes = {
  state: PropTypes.object,
};

Remark.defaultProps = {
  state: EMPTY_OBJECT,
};

export default Remark;
