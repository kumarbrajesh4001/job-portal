import React from 'react';
import PropTypes from 'prop-types';
import Content from '../content';
import { EMPTY_OBJECT } from '../../constants';
import UI from '../../constants/ui';
import LabelValueView from '../labelValueView';
import { getFormattedDurationFromRangeTo } from '../../formatter/number';
import { getVisibilityFormatter } from '../../formatter/candidateForm';

function BreakView(props) {
  const { item: breaks, isVisibility } = props;

  return (
    <div className="skillView">
      <div>
        <Content condition={breaks?.reason}>
          <span className="body-1 color-000000">{breaks.reason}</span>
        </Content>
      </div>

      <LabelValueView
        condition={breaks?.from || breaks?.to}
        label={UI.FROM_TO}
        value={getFormattedDurationFromRangeTo(breaks)}
        isCompact
      />

      {isVisibility && (
        <LabelValueView
          condition
          label={UI.VISIBILITY}
          value={getVisibilityFormatter(breaks?.visibility)}
          isCompact
        />
      )}
    </div>
  );
}

BreakView.propTypes = {
  item: PropTypes.object,
  isVisibility: PropTypes.bool,
};

BreakView.defaultProps = {
  item: EMPTY_OBJECT,
  isVisibility: false,
};

export default BreakView;
