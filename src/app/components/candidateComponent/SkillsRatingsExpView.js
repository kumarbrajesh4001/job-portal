import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { Grid, IconButton } from '@mui/material';

import remove from '../../assets/images/remove.svg';
import {
  getSkill,
  getRating,
  getExperience,
} from '../../formatter/commonBootstrap';
import { DEFAULT_RATING, EMPTY_ARRAY } from '../../constants';
import CommonChipsView from '../commonChips';
import Content from '../content';
import ratingColor from '../../helpers/colorCode';
import UI from '../../constants/ui';

function SkillsRatingsExpView(props) {
  const { skillWithRatingList, onDelete, isExpShow } = props;

  return (
    <div className="d-flex flex-wrap">
      {skillWithRatingList?.map((skillWithExp, index) => {
        const ratingName = getRating(skillWithExp?.rating);
        let label = skillWithExp?.name;
        const skillName = skillWithExp?.name;
        const experience = getExperience(skillWithExp?.exp);
        if (!label) {
          label = getSkill(skillWithExp?.id);
        }

        if (skillWithExp.rating !== ratingName) {
          label = `${label} - ${ratingName}`;
        }
        return (
          <span key={index}>
            {isExpShow ? (
              <div className="col-4 me-3 mb-3">
                <Grid
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="top"
                  sx={{
                    width: '14.5rem',
                    height: '5.2rem',
                    mt: 0.2,
                    background: ' #ffffff',
                    boxShadow: '0px 3px 8px rgba(72, 178, 255, 0.16)',
                    borderRadius: '8px',
                  }}
                >
                  <Grid item xs={12} md={12} px={1.5}>
                    <Grid item md={12}>
                      <div className="d-flex justify-content-between w-100 pt-2">
                        <span className="subtitle-1-bold">{skillName}</span>
                        <IconButton
                          aria-label="delete"
                          id={index}
                          onClick={() => onDelete(index)}
                          className="p-0"
                        >
                          <img
                            color="error"
                            src={remove}
                            alt={UI.ALT_DELETE_ICON}
                          />
                        </IconButton>
                      </div>
                    </Grid>
                    <Content
                      condition={skillWithExp?.rating !== DEFAULT_RATING}
                    >
                      <Grid item md={12}>
                        <span
                          className="subtitle-2"
                          style={{ color: '#AAAAAA' }}
                        >
                          {UI.RATING}
                        </span>
                        <span
                          className={`subtitle-2-bold ms-1 ${ratingColor(
                            skillWithExp?.rating
                          )}`}
                        >
                          {ratingName}
                        </span>
                      </Grid>
                    </Content>
                    <Content condition={experience}>
                      <Grid item md={12}>
                        <span
                          className="subtitle-2"
                          style={{ color: '#AAAAAA' }}
                        >
                          {UI.EXPERIENCE}
                        </span>
                        <span className="subtitle-2-bold ms-1">
                          {experience}
                        </span>
                      </Grid>
                    </Content>
                  </Grid>
                </Grid>
              </div>
            ) : (
              <CommonChipsView label={label} index={index} />
            )}
          </span>
        );
      })}
    </div>
  );
}
SkillsRatingsExpView.propTypes = {
  skillWithRatingList: PropTypes.array,
  onDelete: PropTypes.func,
  isExpShow: PropTypes.bool,
};

SkillsRatingsExpView.defaultProps = {
  skillWithRatingList: EMPTY_ARRAY,
  onDelete: noop,
  isExpShow: false,
};
export default SkillsRatingsExpView;
