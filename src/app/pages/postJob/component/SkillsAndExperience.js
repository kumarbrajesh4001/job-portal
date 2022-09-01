import { Box, Grid } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash';
import { useFormContext } from 'react-hook-form';
import Select from '../../../components/select';
import { getExperienceList } from '../../../formatter/commonBootstrap';
import { EMPTY_ARRAY } from '../../../constants';
import UI from '../../../constants/ui';

function SkillsAndExperience(props) {
  const { skillWithRatingList, setSkillWithRatingList, SkillsRatingsExp } =
    props;

  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <>
      {/*  Overall Experience */}
      <div className="col-md-7">
        <span htmlFor="experience" className="form-label">
          {UI.OVERALL_EXPERIENCE}
          <Box component="span" sx={{ color: '#d32f2f' }}>
            *
          </Box>
          <Select
            inputId="experience"
            name="exp"
            control={control}
            options={getExperienceList()}
            isRequired
          />
        </span>
        {errors.exp && <span className="mandatory">{errors.exp.message}</span>}
      </div>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="top"
      >
        <Grid
          item
          xs
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs sx={{ mt: 2 }}>
            {/* skills */}
            <div className="col-md-12">
              <span htmlFor="skills">
                {UI.SKILLS_EXPERIENCE}
                <Box component="span" sx={{ color: '#d32f2f' }}>
                  *
                </Box>
                <div className="mandatory">
                  {errors.skills ? errors.skills.message : <>&nbsp;</>}
                </div>
                <SkillsRatingsExp
                  getSkillData={setSkillWithRatingList}
                  skillWithRatingList={skillWithRatingList}
                />
              </span>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
SkillsAndExperience.propTypes = {
  skillWithRatingList: PropTypes.array,
  setSkillWithRatingList: PropTypes.func,
  SkillsRatingsExp: PropTypes.func,
};

SkillsAndExperience.defaultProps = {
  skillWithRatingList: EMPTY_ARRAY,
  setSkillWithRatingList: noop,
  SkillsRatingsExp: noop,
};
export default SkillsAndExperience;
