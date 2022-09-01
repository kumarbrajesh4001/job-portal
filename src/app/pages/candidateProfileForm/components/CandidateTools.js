import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  getRatingList,
  getWhereUsedtList,
} from '../../../formatter/commonBootstrap';

import EditDeleteList from '../../../components/editDeleteList';
import ToolsView from '../../../components/candidateComponent/ToolsView';
import { EMPTY_ARRAY } from '../../../constants';
import VALIDATION_VALUES from '../../../constants/validationValues';
import Select from '../../../components/select';
import ERROR_MESSAGE from '../../../constants/errorMsgs';
import getSanitizedValues from '../../../helpers/emptyFieldsValidation';
import { getDateInMMYY, getDateInYYMMDD } from '../../../formatter/date';
import PortalDatePicker from '../../../components/portalDatePicker';
import {
  DISABLED_FUTURE_DATE_AND_MONTH_FORMAT,
  MONTH_YEAR,
} from '../../../constants/datepicker';
import UI from '../../../constants/ui';
import getIsItemExists from '../../../helpers/getIsItemExists';

const DEFAULT_TOOLS = {
  name: '',
  experience: null,
  rating: null,
  lastused: '',
  where: null,
};

const TOOLS_SCHEMA = yup.object().shape({
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

function CandidateTools(props) {
  const { setTools, tools } = props;
  const [editIndex, setEditIndex] = useState(-1);
  const [isToolsWithRatingExists, setIsToolsWithRatingExists] = useState(false);

  const {
    register,
    getValues,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_TOOLS,
    resolver: yupResolver(TOOLS_SCHEMA),
    mode: 'onChange',
  });

  const addTools = () => {
    const tool = getValues();

    const isToolsExists = getIsItemExists(tools, tool);

    setIsToolsWithRatingExists(isToolsExists);
    if (isToolsExists) {
      return;
    }

    if (tool?.name) {
      const lastUsedDate = tool.lastused;
      if (lastUsedDate) {
        tool.lastused = getDateInYYMMDD(lastUsedDate);
      }
      const sanitizedData = getSanitizedValues(tool);
      setTools([...tools, sanitizedData]);
    }
    reset(DEFAULT_TOOLS);
  };

  const editTools = () => {
    const editedToolData = getValues();

    const isToolsExists = getIsItemExists(tools, editedToolData);

    setIsToolsWithRatingExists(isToolsExists);
    if (isToolsExists) {
      return;
    }

    const updatedTools = [...tools];

    const lastUsedDate = editedToolData.lastused;
    if (lastUsedDate) {
      editedToolData.lastused = getDateInYYMMDD(lastUsedDate);
    }
    updatedTools[editIndex] = getSanitizedValues(editedToolData);
    setTools(updatedTools);
    reset(DEFAULT_TOOLS);
    setEditIndex(-1);
  };

  const updateTools = () => {
    if (editIndex > -1) {
      editTools();
    } else {
      addTools();
    }
  };

  const handleEdit = (index) => {
    const tool = tools[index];
    const lastUsedDate = tool.lastused;
    if (lastUsedDate) {
      tool.lastused = getDateInMMYY(lastUsedDate);
    }
    reset(tool);
    setEditIndex(index);
  };

  return (
    <>
      <span className="subtitle-1-bold">{UI.TOOLS}</span>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="top"
        sx={{ mb: 1 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={12} md={6}>
          <div>
            <div className="row  mb-2">
              {/* Tools */}
              <div className="col-md-12">
                <label htmlFor="name" className="form-label col-12">
                  {UI.TOOL}
                  <Box component="span" sx={{ color: '#d32f2f' }}>
                    *
                  </Box>
                  <input
                    {...register('name')}
                    id="name"
                    name="name"
                    placeholder={UI.TOOLS_PLACEHOLDER}
                    className="form-control"
                  />
                  {errors.name ? (
                    <span className="mandatory">{errors.name.message}</span>
                  ) : (
                    isToolsWithRatingExists && (
                      <span className="mandatory">
                        {ERROR_MESSAGE.DUPLICATE_TOOLS_ERROR_MESSAGE}
                      </span>
                    )
                  )}
                </label>
              </div>
              {/*   Self rating */}
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
              {/*  Experience (in months) */}
              <div className="col-md-12 ">
                <label htmlFor="experience" className="form-label col-12">
                  {UI.EXPERIENCE}{' '}
                  <span className="color-AAAAAA">({UI.IN_MONTHS})</span>
                  <Box component="span" sx={{ color: '#d32f2f' }}>
                    *
                  </Box>
                  <input
                    id="experience"
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
              {/*  Last used(where) */}
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
                  />
                  {errors.where && (
                    <span className="mandatory">{errors.where.message}</span>
                  )}
                </label>
              </div>

              {/* Last used(when) */}
              <div className="col-md-12">
                <label htmlFor="lastused" className="form-label col-12">
                  {UI.LAST_USED}
                  <br />
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
              {/*  {/* 'Update' and {UI.ADD} button */}
              <div className="col-md-12  mt-2">
                <button
                  type="button"
                  value="add"
                  onClick={handleSubmit(updateTools)}
                  className="btn btn-primary"
                >
                  {editIndex > -1 ? UI.UPDATE : UI.ADD}
                </button>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} mt={3}>
          <EditDeleteList
            component={ToolsView}
            onEdit={handleEdit}
            list={tools}
            setList={setTools}
          />
        </Grid>
      </Grid>
    </>
  );
}
CandidateTools.propTypes = {
  setTools: PropTypes.func,
  tools: PropTypes.array,
};

CandidateTools.defaultProps = {
  setTools: noop,
  tools: EMPTY_ARRAY,
};
export default CandidateTools;
