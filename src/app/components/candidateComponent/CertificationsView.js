import React from 'react';
import PropTypes from 'prop-types';
import Content from '../content';
import { EMPTY_OBJECT } from '../../constants';
import { getDateInMMMYY } from '../../formatter/date';
import UI from '../../constants/ui';
import getPluralize from '../../helpers/plural';
import LabelValueView from '../labelValueView';

function CertificationsView(props) {
  const { item: certifications } = props;

  return (
    <div className="skillView">
      <Content condition={certifications?.name}>
        <div>
          <span className="body-1 color-000000">{certifications.name}</span>
        </div>
      </Content>
      <Content condition={certifications?.desc}>
        <div className="subtitle-1 color-1F2830 mt-1">
          {certifications.desc}
        </div>
      </Content>
      <div className="d-flex justify-content-between">
        <div>
          <LabelValueView
            condition={certifications?.date}
            label={UI.DATE}
            value={getDateInMMMYY(certifications.date)}
            isCompact
          />
        </div>
        <div>
          <LabelValueView
            condition={certifications?.duration}
            label={UI.VALIDITY}
            value={`${certifications.duration} ${getPluralize(
              UI.MONTH,
              certifications.duration
            )}`}
            isCompact
          />
        </div>
      </div>
    </div>
  );
}
CertificationsView.propTypes = {
  item: PropTypes.object,
};

CertificationsView.defaultProps = {
  item: EMPTY_OBJECT,
};
export default CertificationsView;
