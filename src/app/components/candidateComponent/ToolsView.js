import React from 'react';
import PropTypes from 'prop-types';
import Content from '../content';
import { EMPTY_OBJECT } from '../../constants';
import { getRating, getWhereUsed } from '../../formatter/commonBootstrap';
import { getDateInMMMYY } from '../../formatter/date';
import getPluralize from '../../helpers/plural';
import ratingColor from '../../helpers/colorCode';
import UI from '../../constants/ui';
import LabelValueView from '../labelValueView';

function ToolsView(props) {
  const { item: tools } = props;

  return (
    <div className="skillView">
      <Content condition={tools.name}>
        <div>
          <span className="body-1 color-000000"> {tools.name}</span> -
          <span className={`${ratingColor(tools.rating)} ms-1`}>
            {getRating(tools.rating)}
          </span>
        </div>
      </Content>

      <div className="row">
        <div className="col-4">
          <LabelValueView
            condition={tools.experience}
            label={UI.EXPERIENCE}
            value={`${tools.experience} ${getPluralize(
              UI.MONTH,
              tools.experience
            )}`}
            isCompact
          />
        </div>
        <div className="col-4">
          <LabelValueView
            condition={tools.where}
            label={UI.WHERE}
            value={getWhereUsed(tools.where)}
            isCompact
          />
        </div>
        <div className="col-4">
          <LabelValueView
            condition={tools.lastused}
            label={UI.LAST_USED}
            value={getDateInMMMYY(tools.lastused)}
            isCompact
          />
        </div>
      </div>
    </div>
  );
}
ToolsView.propTypes = {
  item: PropTypes.object,
};

ToolsView.defaultProps = {
  item: EMPTY_OBJECT,
};

export default ToolsView;
