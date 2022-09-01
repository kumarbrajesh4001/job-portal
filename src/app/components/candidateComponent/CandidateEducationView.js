import React from 'react';
import PropTypes from 'prop-types';
import { getEducation } from '../../formatter/commonBootstrap';
import Content from '../content';
import { EMPTY_OBJECT } from '../../constants';
import UI from '../../constants/ui';
import LabelValueView from '../labelValueView';
import { getFormattedDurationFromRangeTo } from '../../formatter/number';

function CandidateEducationView(props) {
  const { item: education } = props;
  return (
    <div className="skillView">
      <div className="row">
        <div className="col-10 body-1 color-000000">
          <Content condition={getEducation(education?.degree)}>
            {getEducation(education.degree)}
          </Content>
          <Content condition={education?.course}>
            <div className="subtitle-1 color-1F2830 mt-1">
              {education.course}
            </div>
          </Content>
        </div>
      </div>
      <div className="mt-1">
        <Content condition={education?.college}>
          <span className="subtitle-1 color-1F2830">{education.college}</span>
        </Content>
        <Content condition={education?.city?.name}>
          <span className="subtitle-1 color-1F2830">
            -{education?.city?.name}
          </span>
        </Content>
      </div>
      <div className="row">
        <Content
          condition={education?.from || education?.to || education?.atpresent}
        >
          <div className="col-6">
            <LabelValueView
              condition={
                education?.from || education?.to || education?.atpresent
              }
              label={UI.FROM_TO}
              value={getFormattedDurationFromRangeTo(education)}
              isCompact
            />
          </div>
        </Content>
        <div className="col">
          <LabelValueView
            condition={education?.pct}
            label={UI.PERCENTAGE_NAME}
            value={`${education.pct}${UI.PERCENT_SIGN}`}
            isCompact
          />

          <LabelValueView
            condition={education?.cgpa}
            label={UI.CGPA}
            value={education.cgpa}
            isCompact
          />
        </div>
      </div>
    </div>
  );
}
CandidateEducationView.propTypes = {
  item: PropTypes.object,
};

CandidateEducationView.defaultProps = {
  item: EMPTY_OBJECT,
};

export default CandidateEducationView;
