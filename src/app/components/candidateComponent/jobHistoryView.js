import React from 'react';
import PropTypes from 'prop-types';
import Content from '../content';
import { EMPTY_OBJECT } from '../../constants';
import {
  getFormattedCurrencyPerAnnum,
  getFormattedDurationFromRangeTo,
} from '../../formatter/number';
import UI from '../../constants/ui';
import LabelValueView from '../labelValueView';

function JobHistoryView(props) {
  const { item: jobs } = props;
  return (
    <div className="skillView">
      <Content condition={jobs?.title}>
        <span className="body-1 color-000000">{jobs.title}</span>
      </Content>

      <Content condition={jobs?.company}>
        <div className="subtitle-1 color-1F2830 mt-1">{jobs.company}</div>
      </Content>

      <Content condition={jobs?.city}>
        <div className="subtitle-1 color-1F2830 mt-1">{jobs.city?.name}</div>
      </Content>

      <div className="d-flex justify-content-between">
        <div>
          <LabelValueView
            condition={jobs?.from || jobs?.to || jobs?.atpresent}
            label={UI.FROM_TO}
            value={getFormattedDurationFromRangeTo(jobs)}
            isCompact
          />
        </div>
        <div>
          <LabelValueView
            condition={jobs?.ctc}
            label={UI.CTC_PLACEHOLDER}
            value={getFormattedCurrencyPerAnnum(jobs.ctc)}
            isCompact
          />
        </div>
      </div>
      <div className="mt-2">
        <LabelValueView
          condition={jobs?.roles}
          label={UI.ROLES}
          value={jobs.roles}
          isCompact
        />
      </div>
    </div>
  );
}
JobHistoryView.propTypes = {
  item: PropTypes.object,
};
JobHistoryView.defaultProps = {
  item: EMPTY_OBJECT,
};
export default JobHistoryView;
