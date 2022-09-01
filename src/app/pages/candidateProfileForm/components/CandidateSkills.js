import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { Box, Grid } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  getRatingList,
  getWhereUsedtList,
} from '../../../formatter/commonBootstrap';
import EditDeleteList from '../../../components/editDeleteList';
import CompleteSkillView from '../../../components/candidateComponent/CompleteSkillView';
import { EMPTY_ARRAY } from '../../../constants';
import { extractSkillId } from '../../../helpers/skillId';
import Select from '../../../components/select';
import ERROR_MESSAGE from '../../../constants/errorMsgs';
import VALIDATION_VALUES from '../../../constants/validationValues';
import getSanitizedValues from '../../../helpers/emptyFieldsValidation';
import { getDateInMMYY, getDateInYYMMDD } from '../../../formatter/date';
import AutoSuggestion from '../../../components/autoSuggestion';
import PortalDatePicker from '../../../components/portalDatePicker';
import {
  DISABLED_FUTURE_DATE_AND_MONTH_FORMAT,
  MONTH_YEAR,
} from '../../../constants/datepicker';
import UI from '../../../constants/ui';
import getIsItemExists from '../../../helpers/getIsItemExists';

const DEFAULT_SKILLS = {
  name: null,
  id: null,
  experience: null,
  rating: null,
  lastused: null,
  where: null,
};

const SKILL_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .required(ERROR_MESSAGE.REQ_ERROR_MSG)
    .nullable()
    .min(
      VALIDATION_VALUES.MIN_VALUE,
      ERROR_MESSAGE.MIN_ERROR_MSG + VALIDATION_VALUES.MIN_VALUE
    )
    .max(
      VALIDATION_VALUES.MAX_VALUE_64,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_64
    ),
  experience: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .nullable()
    .min(
      VALIDATION_VALUES.ZERO_VALUE,
      ERROR_MESSAGE.MIN_VALUE_MSG + VALIDATION_VALUES.ZERO_VALUE
    )
    .max(
      VALIDATION_VALUES.MAX_POSITIVE_INTEGER_VALUE,
      ERROR_MESSAGE.MAX_VALUE_MSG + VALIDATION_VALUES.MAX_POSITIVE_INTEGER_VALUE
    )
    .required(ERROR_MESSAGE.REQ_ERROR_MSG),
  rating: yup.number().required(ERROR_MESSAGE.REQ_ERROR_MSG).nullable(),
  where: yup.number().required(ERROR_MESSAGE.REQ_ERROR_MSG).nullable(),
});

function CandidateSkills(props) {
  const { skills, setSkills } = props;

  const [editIndex, setEditIndex] = useState(-1);
  const [isSkillWithRatingExists, setIsSkillWithRatingExists] = useState(false);

  const {
    register,
    getValues,
    reset,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_SKILLS,
    resolver: yupResolver(SKILL_SCHEMA),
    mode: 'onChange',
  });

  const setSkill = (name) => {
    setValue('name', name);
    setIsSkillWithRatingExists(false);
  };

  const addSkill = () => {
    const skill = getValues();

    const isSkillExists = getIsItemExists(skills, skill);

    setIsSkillWithRatingExists(isSkillExists);
    if (isSkillExists) {
      return;
    }

    if (skill?.name) {
      const skillId = extractSkillId(skill.name);
      const skillsWithId = { ...skill, id: skillId };
      const lastUsedDate = skillsWithId.lastused;
      if (lastUsedDate) {
        skillsWithId.lastused = getDateInYYMMDD(lastUsedDate);
      }
      const sanitizedData = getSanitizedValues(skillsWithId);
      setSkills([...skills, sanitizedData]);
    }
    reset(DEFAULT_SKILLS);
  };

  const editSkill = () => {
    const existingSkills = getValues();

    const isSkillExists = getIsItemExists(skills, existingSkills);

    setIsSkillWithRatingExists(isSkillExists);
    if (isSkillExists) {
      return;
    }

    const updatedSkills = [...skills];
    const skillId = extractSkillId(getValues().name);
    const lastUsedDate = existingSkills.lastused;
    if (lastUsedDate) {
      existingSkills.lastused = getDateInYYMMDD(lastUsedDate);
    }
    updatedSkills[editIndex] = getSanitizedValues(existingSkills);
    updatedSkills[editIndex] = { ...updatedSkills[editIndex], id: skillId };
    setSkills(updatedSkills);
    setEditIndex(-1);
    reset(DEFAULT_SKILLS);
  };

  const updateSkills = () => {
    if (editIndex > -1) {
      editSkill();
    } else {
      addSkill();
    }
  };

  const handleEdit = (index) => {
    const skill = skills[index];
    const lastUsedDate = skill?.lastused;
    if (lastUsedDate) {
      skill.lastused = getDateInMMYY(lastUsedDate);
    }
    reset(skill);
    setEditIndex(index);
  };

  return (
    <>
      <span className="subtitle-1-bold">
        {UI.SKILLS}
        <Box component="span" sx={{ color: '#d32f2f' }}>
          *
        </Box>
      </span>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="top"
        spacing={2}
      >
        <Grid item xs={12} md={6}>
          <div>
            <div className="row p-2 rounded">
              <div className="col-md-12">
                <label htmlFor="name" className="form-label col-12">
                  {UI.SKILL}
                  <Box component="span" sx={{ color: '#d32f2f' }}>
                    *
                  </Box>
                  <AutoSuggestion
                    id="name"
                    name="name"
                    values={getValues('name')}
                    setValues={setSkill}
                    placeholder={ERROR_MESSAGE.SKILL_PLACEHOLDER}
                    control={control}
                    isRequired
                  />
                  {errors.name ? (
                    <span className="mandatory">{errors.name.message}</span>
                  ) : (
                    isSkillWithRatingExists && (
                      <span className="mandatory">
                        {ERROR_MESSAGE.DUPLICATE_SKILL_ERROR_MESSAGE}
                      </span>
                    )
                  )}
                </label>
              </div>
              <div className="col-md-12">
                <label htmlFor="rating" className="form-label col-12">
                  {UI.RATING}
                  <Box component="span" sx={{ color: '#d32f2f' }}>
                    *
                  </Box>
                  <Select
                    inputId="rating"
                    name="rating"
                    control={control}
                    options={getRatingList()}
                    isRequired
                  />
                  {errors.rating && (
                    <span className="mandatory">{errors.rating.message}</span>
                  )}
                </label>
              </div>
              <div className="col-md-12 ">
                <label htmlFor="experience" className="form-label col-12">
                  {UI.EXPERIENCE}{' '}
                  <span className="color-AAAAAA">({UI.IN_MONTHS})</span>
                  <Box component="span" sx={{ color: '#d32f2f' }}>
                    *
                  </Box>
                  <input
                    id="experience"
                    name="experience"
                    type="number"
                    placeholder={UI.IN_MONTH}
                    className="form-control"
                    {...register('experience')}
                  />
                  {errors.experience && (
                    <span className="mandatory">
                      {errors.experience.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="col-md-12">
                <label htmlFor="where" className="form-label col-12">
                  {UI.WHERE}
                  <Box component="span" sx={{ color: '#d32f2f' }}>
                    *
                  </Box>
                  <Select
                    inputId="where"
                    name="where"
                    control={control}
                    options={getWhereUsedtList()}
                    isRequired
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {errors.where && (
                    <span className="mandatory">{errors.where.message}</span>
                  )}
                </label>
              </div>
              <div className="col-md-12">
                <label htmlFor="lastused" className="form-label col-12">
                  {UI.LAST_USED} <br />
                  <PortalDatePicker
                    control={control}
                    fields={MONTH_YEAR}
                    name="lastused"
                    id="lastused"
                    error={errors.lastused}
                    config={DISABLED_FUTURE_DATE_AND_MONTH_FORMAT}
                  />
                </label>
              </div>

              <div className="col-md-12 mt-1 ">
                <button
                  type="button"
                  onClick={handleSubmit(updateSkills)}
                  className="float-start btn btn-primary"
                >
                  {editIndex > -1 ? UI.UPDATE : UI.ADD}
                </button>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={6} mt={4}>
          <EditDeleteList
            component={CompleteSkillView}
            onEdit={handleEdit}
            list={skills}
            setList={setSkills}
          />
        </Grid>
      </Grid>
    </>
  );
}
CandidateSkills.propTypes = {
  setSkills: PropTypes.func,
  skills: PropTypes.array,
};

CandidateSkills.defaultProps = {
  skills: EMPTY_ARRAY,
  setSkills: noop,
};

export default CandidateSkills;
