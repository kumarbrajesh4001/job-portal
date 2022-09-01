import React from 'react';
import PropTypes from 'prop-types';

import Content from '../../components/content';
import PopoverComponent from '../../components/subHeader/PopoverComponent';
import { EMPTY_OBJECT, FRESHER_ID } from '../../constants';
import UI from '../../constants/ui';
import { getFormattedCurrencyPerAnnum } from '../../formatter/number';
import getPluralize from '../../helpers/plural';
import { getSkillsRatingsView } from './candidates.helper';
import SkillRatingView from '../../components/candidateComponent/SkillRatingView';

function SummarySkillsRating(props) {
  const { candidate } = props;

  return (
    <>
      <div className="row mt-3">
        <div className="col-4 subtitle-2 color-5B5B5B">
          <Content condition={candidate?.jobexp}>{UI.EXPERIENCE}</Content>
        </div>
        <div className="col-4 subtitle-2 color-5B5B5B">
          <Content condition={candidate?.expSalary}>
            {UI.EXPECTED_SALARY}
          </Content>
        </div>
        <div className="col-4 subtitle-2 color-5B5B5B">
          <Content
            condition={
              candidate?.joblocations?.length || candidate?.anyjoblocation
            }
          >
            {UI.DESIRED_LOCATION}
          </Content>
        </div>

        <div className="col-4 d-flex flex-wrap mt-2">
          <Content condition={candidate?.jobexp}>
            <span className="subtitle-2-bold color-1F2830">
              {candidate?.jobexp === FRESHER_ID
                ? UI.FRESHER
                : `${candidate?.jobexp} ${getPluralize(
                    UI.YEAR,
                    candidate?.jobexp
                  )}`}
            </span>
          </Content>
        </div>
        <div className="col-4 d-flex flex-wrap mt-2">
          <Content condition={candidate?.expSalary}>
            <span className="subtitle-2-bold color-1F2830">
              {candidate?.expSalary?.any
                ? UI.ANY_SALARY
                : getFormattedCurrencyPerAnnum(candidate?.expSalary?.salary)}
            </span>
          </Content>
        </div>
        <div className="col-4 d-flex flex-wrap mt-2">
          <Content condition={candidate?.anyjoblocation}>
            <span className="subtitle-2-bold color-1F2830">
              {UI.ANY_LOCATION}
            </span>
          </Content>

          <Content condition={candidate?.joblocations?.length}>
            {candidate?.joblocations?.map((cityName, index, arr) => {
              if (index < 2) {
                return (
                  <div
                    key={index}
                    className=" subtitle-2-bold color-1F2830 me-1"
                  >
                    {cityName.shortname}
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

      <div className="row mt-3">
        <Content condition={candidate?.skills || candidate?.assessments}>
          <SkillRatingView
            skills={getSkillsRatingsView(
              candidate.assessments,
              candidate.skills
            )}
          />
        </Content>
      </div>
    </>
  );
}

SummarySkillsRating.propTypes = {
  candidate: PropTypes.object,
};
SummarySkillsRating.defaultProps = {
  candidate: EMPTY_OBJECT,
};

export default SummarySkillsRating;
