import React from 'react';
import PropTypes from 'prop-types';
import { EMPTY_OBJECT } from '../../constants';
import { getRating, getWhereUsed } from '../../formatter/commonBootstrap';
import Content from '../content';
import { getDateInMMMYY } from '../../formatter/date';
import ratingColor from '../../helpers/colorCode';
import getPluralize from '../../helpers/plural';
import UI from '../../constants/ui';
import LabelValueView from '../labelValueView';

function CompleteSkillView(props) {
  const { item: skills } = props;

  return (
    <div className="skillView">
      <div>
        <Content condition={skills?.name}>
          <span className="subtitle-1 color-000000">{skills.name}</span> -
          <span className={`${ratingColor(skills.rating)} ms-1`}>
            {getRating(skills.rating)}
          </span>
        </Content>
      </div>

      <div className="row mt-1">
        <div className="col-4">
          <LabelValueView
            condition={skills?.experience}
            label={UI.EXPERIENCE}
            value={`${skills.experience} ${getPluralize(
              UI.MONTH,
              skills.experience
            )}`}
            isCompact
          />
        </div>
        <div className="col-4">
          <LabelValueView
            condition={skills?.where}
            label={UI.WHERE}
            value={getWhereUsed(skills.where)}
            isCompact
          />
        </div>
        <div className="col-4">
          <LabelValueView
            condition={skills?.lastused}
            label={UI.LAST_USED}
            value={getDateInMMMYY(skills.lastused)}
            isCompact
          />
        </div>
      </div>
    </div>
  );
}
CompleteSkillView.propTypes = {
  item: PropTypes.object,
};

CompleteSkillView.defaultProps = {
  item: EMPTY_OBJECT,
};
export default CompleteSkillView;
