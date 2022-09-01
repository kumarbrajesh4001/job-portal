import React from 'react';
import PropTypes from 'prop-types';
import { getClass } from '../../formatter/commonBootstrap';

import Content from '../content';
import { EMPTY_OBJECT } from '../../constants';
import UI from '../../constants/ui';
import LabelValueView from '../labelValueView';

function SchoolingView(props) {
  const { item: schooling } = props;
  return (
    <div className="skillView">
      <div className="body-1 color-000000">
        <Content condition={schooling?.name}>{schooling.name}</Content>
        <Content condition={getClass(schooling?.candidateClass)}>
          <div className="subtitle-1 color-1F2830 mt-1">
            {getClass(schooling.candidateClass)}
          </div>
        </Content>
      </div>

      <div className="mt-1">
        <Content condition={schooling?.board}>
          <span className="subtitle-1 color-1F2830">{schooling.board}</span>
        </Content>
        <Content condition={schooling?.city}>
          <span className="subtitle-1 color-1F2830">
            -{schooling?.city?.name},
          </span>
        </Content>
      </div>

      <LabelValueView
        condition={schooling?.pct}
        label={UI.PERCENTAGE_NAME}
        value={`${schooling.pct}${UI.PERCENT_SIGN}`}
        isCompact
      />
    </div>
  );
}
SchoolingView.propTypes = {
  item: PropTypes.object,
};

SchoolingView.defaultProps = {
  item: EMPTY_OBJECT,
};

export default SchoolingView;
