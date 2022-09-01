import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import noop from 'lodash/noop';
import { Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Select from '../select';
import {
  getRatingList,
  getExperienceList,
} from '../../formatter/commonBootstrap';
import SkillsRatingsExpView from './SkillsRatingsExpView';
import { EMPTY_ARRAY, RATING_BEGINNER } from '../../constants';
import AutoSuggestion from '../autoSuggestion';
import ERROR_MESSAGE from '../../constants/errorMsgs';
import { extractSkillId } from '../../helpers/skillId';
import getIsItemExists from '../../helpers/getIsItemExists';
import UI from '../../constants/ui';

const DEFAULT_SKILL = {
  id: undefined,
  rating: RATING_BEGINNER,
  exp: undefined,
  skill: undefined,
};

function SkillsRatingsExp(props) {
  const { getSkillData, skillWithRatingList } = props;
  const [ratingKey, setRatingKey] = useState();
  const [skill, setSkill] = useState(null);
  const [isSkillWithRatingExists, setIsSkillWithRatingExists] = useState(false);
  const [skillWithRatingExp, setSkillWithRatingExp] = useState(DEFAULT_SKILL);

  const {
    handleSubmit,
    getValues,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onAdd = () => {
    const skillData = getValues();
    const skillWithRating = { ...skillWithRatingExp };

    skillWithRating.rating = skillData?.rating;
    skillWithRating.exp = skillData?.exp;

    const isSkillExists = getIsItemExists(skillWithRatingList, skillWithRating);

    setIsSkillWithRatingExists(isSkillExists);
    if (isSkillExists) {
      return;
    }
    const skillsWithRating = [...skillWithRatingList, skillWithRating];

    setSkillWithRatingExp(DEFAULT_SKILL);
    setSkill(undefined);
    getSkillData(skillsWithRating);
  };

  useEffect(() => {
    setRatingKey(new Date().getTime());
    reset(DEFAULT_SKILL);
  }, [skillWithRatingList]);

  useEffect(() => {
    const skillId = extractSkillId(skill);
    setSkillWithRatingExp({
      name: skill,
      id: skillId,
    });
  }, [skill]);

  const handleDelete = (index) => {
    const updatedSkillWithRatingList = [...skillWithRatingList];
    updatedSkillWithRatingList.splice(index, 1);
    getSkillData(updatedSkillWithRatingList);
  };

  return (
    <Grid
      container
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      columnSpacing={2}
    >
      <Grid item xs={12} md={3.5}>
        {/* Skill */}
        <div className="col-md-12">
          <label htmlFor="name" className="form-label col-12">
            {UI.SKILL}
            <AutoSuggestion
              id="name"
              name="name"
              values={skill}
              setValues={setSkill}
              placeholder={ERROR_MESSAGE.SKILL_PLACEHOLDER}
              control={control}
              isRequired
            />
          </label>
        </div>
      </Grid>
      <Grid item xs={5} md={3.5}>
        {/* Rating */}
        <div className="col-md-12">
          <label htmlFor="rating" className="form-label col-12">
            {UI.RATING}
            <Select
              inputId="rating"
              name="rating"
              control={control}
              options={getRatingList()}
              isClearableHidden
            />
          </label>
          {errors.rating && (
            <span className="mandatory">{errors.rating.message}</span>
          )}
        </div>
      </Grid>
      <Grid item xs={5} md={3.5}>
        {/* Rating */}
        <div className="col-md-12">
          <label htmlFor="exp" className="form-label col-12">
            {UI.EXPERIENCE}
            <Select
              inputId="exp"
              name="exp"
              control={control}
              options={getExperienceList()}
              key={ratingKey}
            />
          </label>
          {errors.exp && (
            <span className="mandatory">{errors.exp.message}</span>
          )}
        </div>
      </Grid>
      <Grid item xs={2} md={1.5}>
        {/* ADD Button */}
        <Button
          sx={{ mt: 2 }}
          type="button"
          color="success"
          onClick={handleSubmit(onAdd)}
          variant="outlined"
          disabled={!skillWithRatingExp?.name}
        >
          <AddIcon />
        </Button>
      </Grid>
      {isSkillWithRatingExists ? (
        <span className="mandatory ms-3">
          {ERROR_MESSAGE.DUPLICATE_SKILL_ERROR_MESSAGE}
        </span>
      ) : (
        ''
      )}
      <Grid item xs={12} md={12}>
        <SkillsRatingsExpView
          skillWithRatingList={skillWithRatingList}
          onDelete={handleDelete}
          isExpShow
        />
      </Grid>
    </Grid>
  );
}

SkillsRatingsExp.propTypes = {
  getSkillData: PropTypes.func,
  skillWithRatingList: PropTypes.array,
};

SkillsRatingsExp.defaultProps = {
  getSkillData: noop,
  skillWithRatingList: EMPTY_ARRAY,
};

export default SkillsRatingsExp;
