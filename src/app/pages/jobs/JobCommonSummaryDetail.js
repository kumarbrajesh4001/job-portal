import React from 'react';
import PropTypes from 'prop-types';
import Content from '../../components/content';
import PopoverComponent from '../../components/subHeader/PopoverComponent';
import { EMPTY_OBJECT, OTHER_SALARY_ID } from '../../constants';
import UI from '../../constants/ui';
import { getSalary } from '../../formatter/candidateBootstrap';
import { getExperience } from '../../formatter/commonBootstrap';
import { getFormattedCurrencyRangePerAnnum } from '../../formatter/number';
import getPluralize from '../../helpers/plural';

function JobCommonSummaryDetail(props) {
  const { job } = props;

  return (
    <div className="row mt-3">
      <div className="d-flex justify-content-between">
        <div className="col-4 subtitle-2 color-5B5B5B">
          <Content condition={job?.exp}>{UI.EXPERIENCE}</Content>
        </div>
        <div className="col-4 subtitle-2 color-5B5B5B">
          <Content condition={job?.salary}>{UI.SALARY}</Content>
        </div>
        <div className="col-4 subtitle-2 color-5B5B5B">
          <Content condition={job?.joblocations}>
            {getPluralize(UI.LOCATION, job?.joblocations?.length)}
          </Content>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="col-4 subtitle-2-bold color-1F2830 mt-1">
          {getExperience(job?.exp)}
        </div>
        <div className="col-4 subtitle-2-bold color-1F2830 mt-1">
          {job?.salary?.id !== OTHER_SALARY_ID
            ? getSalary(job?.salary?.id)
            : getFormattedCurrencyRangePerAnnum(
                job?.salary?.min,
                job?.salary?.max
              )}
        </div>

        <div className="col-4 d-flex flex-wrap mt-1">
          <Content condition={job?.joblocations?.length}>
            {job?.joblocations?.map((location, index, arr) => {
              if (index < 2) {
                return (
                  <div
                    key={index}
                    className="subtitle-2-bold color-1F2830 me-1"
                  >
                    {location.shortname}
                    {arr.length > 1 && index === 0 && ','}
                  </div>
                );
              }

              if (index === 2) {
                return (
                  <PopoverComponent
                    className="d-flex align-items-center"
                    filterField={arr.map((loc) => ({ name: loc.shortname }))}
                    key={index}
                  />
                );
              }

              return null;
            })}
          </Content>
        </div>
      </div>
    </div>
  );
}

JobCommonSummaryDetail.propTypes = {
  job: PropTypes.object,
};

JobCommonSummaryDetail.defaultProps = {
  job: EMPTY_OBJECT,
};

export default JobCommonSummaryDetail;
