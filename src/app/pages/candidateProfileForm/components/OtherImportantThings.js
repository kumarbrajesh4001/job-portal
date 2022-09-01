import React from 'react';
import { Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import noop from 'lodash/noop';
import { EditorController } from '../../../components/RichTextEditor';

import MultiList from '../../../components/multiList';
import MultiInput from '../../../components/multiInput';
import { EMPTY_ARRAY } from '../../../constants';
import UI from '../../../constants/ui';
import { minToolbar } from '../../../constants/toolbar.constants';

function OtherImportantThings(props) {
  const { setCommunity, community, setLanguage, language } = props;
  const {
    formState: { errors },
    register,
    control,
  } = useFormContext();

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="top"
        spacing={2}
      >
        <Grid item xs={12} md={12}>
          <span className="subtitle-1-bold">{UI.OTHER}</span>
        </Grid>
        <Grid item xs={12} md={6}>
          {/*    Achievements */}
          <div className="col-md-12">
            <label htmlFor="achievements" className="form-label col-12">
              {UI.ACHIEVEMENTS}

              <EditorController
                name="achievements"
                control={control}
                toolbarOptions={minToolbar}
                error={errors.achievements}
              />
            </label>
          </div>
          {/* Academic excellence */}
          <div className="col-md-12">
            <label htmlFor="acadexcellence" className="form-label col-12">
              {UI.ACADEMIC_EXCELLENCE}

              <EditorController
                name="acadexcellence"
                control={control}
                toolbarOptions={minToolbar}
                error={errors.acadexcellence}
              />
            </label>
          </div>
          {/* community */}
          <span>{UI.OPEN_SOURCE_COMMUNITY_CONTRIBUTION}</span>
          <MultiList setList={setCommunity} list={community} maxLength={64} />
        </Grid>
        <Grid item xs={12} md={6}>
          {/*  Projects */}
          <div className="col-md-12">
            <label htmlFor="projects" className="form-label col-12">
              {UI.PROJECTS}
              <EditorController
                name="projects"
                control={control}
                toolbarOptions={minToolbar}
                error={errors.projects}
              />
            </label>
          </div>
          {/*  Hobbies */}
          <div className="col-md-12">
            <label htmlFor="hobbies" className="form-label col-12">
              {UI.HOBBIES}
              <EditorController
                name="hobbies"
                control={control}
                toolbarOptions={minToolbar}
                error={errors.hobbies}
              />
            </label>
          </div>
          {/*   Patents */}
          <div className="col-md-12">
            <label htmlFor="patents" className="form-label col-12">
              {UI.PATENTS}
              <EditorController
                name="patents"
                control={control}
                toolbarOptions={minToolbar}
                error={errors.patents}
              />
            </label>
          </div>
          <span>{UI.LANGUAGE}</span>
          <MultiInput setValue={setLanguage} value={language} />
        </Grid>
      </Grid>
      <Grid
        container
        flexDirection="row"
        justifyContent="space-between"
        alignItems="top"
        spacing={2}
      >
        <Grid item xs={12} md={12} mt={2}>
          {/* Online profile url: */}
          <label htmlFor="profile">{UI.ONLINE_PROFILE_URL}</label>
          <TextField
            id="profile"
            {...register('profile')}
            type="url"
            name="profile"
            fullWidth
            placeholder={UI.PROFILE_LINK}
            size="small"
            error={!!errors.profile?.message}
            helperText={errors.profile?.message}
          />
          <label htmlFor="linkedin" className="mt-2">
            {UI.LINKEDIN}
          </label>
          <TextField
            id="linkedin"
            {...register('linkedin')}
            type="url"
            name="linkedin"
            fullWidth
            placeholder={UI.LINKEDIN_LINK}
            size="small"
            error={!!errors.linkedin?.message}
            helperText={errors.linkedin?.message}
          />
          <label htmlFor="github" className="mt-2">
            {UI.GITHUB}
          </label>
          <TextField
            id="github"
            {...register('github')}
            type="url"
            name="github"
            fullWidth
            placeholder={UI.GITHUB_LINK}
            size="small"
            error={!!errors.github?.message}
            helperText={errors.github?.message}
          />
        </Grid>
      </Grid>
    </>
  );
}
OtherImportantThings.propTypes = {
  setCommunity: PropTypes.func,
  community: PropTypes.array,
  setLanguage: PropTypes.func,
  language: PropTypes.array,
};

OtherImportantThings.defaultProps = {
  setCommunity: noop,
  community: EMPTY_ARRAY,
  setLanguage: noop,
  language: EMPTY_ARRAY,
};
export default OtherImportantThings;
