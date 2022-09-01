/* eslint-disable no-nested-ternary */

import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import noop from 'lodash/noop';
import compact from 'lodash/compact';
import PropTypes from 'prop-types';
import last from 'lodash/last';
import { getRequest } from '../../services';
import { DEFAULT_RATING, EMPTY_ARRAY } from '../../constants';
import isStringEmpty from '../../helpers/isStringEmpty';
import {
  getIsSameSkill,
  getSkillObject,
  getUpdatedSkillNames,
} from './searchForm.helper';
import KEY_CODES from '../../constants/keyCodes';
import ERROR_MESSAGE from '../../constants/errorMsgs';

export default function KeywordsAutocomplete(props) {
  const {
    keywords,
    setKeywords,
    ratingId,
    setSnackbarOpen,
    onEnterInKeywordsAutocomplete,
    isEmployer,
  } = props;

  const [keywordsTextFieldValue, setKeywordsTextFieldValue] = useState('');
  const [dataAutosuggest, setDataAutosuggest] = useState(EMPTY_ARRAY);
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    if (!isStringEmpty(searchKey)) {
      getRequest(`/autosuggest/tech?q=${searchKey}`).then((tech) =>
        setDataAutosuggest(tech)
      );
    } else {
      setDataAutosuggest(EMPTY_ARRAY);
    }
  }, [searchKey]);

  const deb = useCallback(
    debounce((key) => {
      setSearchKey(key);
    }, 200),
    EMPTY_ARRAY
  );

  const handleSearchKey = (keys) => {
    deb(keys);
  };

  const removeOption = useCallback(
    (index) => {
      const updatedkeywords = [...keywords];
      updatedkeywords.splice(index, 1);
      setKeywords(updatedkeywords);
    },
    [keywords]
  );

  const onChange = useCallback(
    (e, valuesFromAutocomplete) => {
      if (valuesFromAutocomplete.length > keywords.length) {
        setDataAutosuggest(EMPTY_ARRAY);

        let skill = last(valuesFromAutocomplete);
        if (typeof skill === 'string') {
          skill = skill.trim();
        }
        if (skill) {
          const keywordsHolder = [...keywords];
          const isSameSkill = getIsSameSkill(keywords, skill);

          if (isSameSkill) {
            setSnackbarOpen({
              setopen: true,
              message: ERROR_MESSAGE.DUPLICATE_SKILL_ERROR_MESSAGE,
              severity: 'warning',
            });
          } else {
            const skillObject = getSkillObject(skill, ratingId);
            keywordsHolder.push(skillObject);
            setKeywords(keywordsHolder);
            return keywordsHolder;
          }
        }
        return keywords;
      }
      if (!valuesFromAutocomplete.length) {
        setKeywords(EMPTY_ARRAY);
        return EMPTY_ARRAY;
      }
      return valuesFromAutocomplete;
    },
    [keywords, ratingId]
  );

  const onInputChange = (event, newInputValue) => {
    if (!newInputValue.includes(',')) {
      handleSearchKey(newInputValue.trim());
    }
    const options = newInputValue.split(',');
    if (options.length > 1) {
      const compactList = compact(options);
      const values = getUpdatedSkillNames(keywords, compactList[0]);
      onChange(event, values);
      setKeywordsTextFieldValue('');
    } else {
      setKeywordsTextFieldValue(newInputValue);
    }
  };

  return (
    <Stack spacing={3}>
      <Autocomplete
        multiple
        freeSolo
        size="small"
        options={dataAutosuggest}
        getOptionLabel={(option) => option.dispName}
        value={keywords.map((keyword) => keyword.displayName)}
        onChange={onChange}
        inputValue={keywordsTextFieldValue}
        onInputChange={onInputChange}
        onBlur={(e) => {
          if (keywordsTextFieldValue !== '') {
            const values = getUpdatedSkillNames(
              keywords,
              keywordsTextFieldValue
            );
            setKeywordsTextFieldValue('');
            onChange(e, values);
          }
        }}
        onKeyDown={(e) => {
          if (
            e.keyCode === KEY_CODES.BACKSPACE_CODE &&
            !keywordsTextFieldValue
          ) {
            const index = keywords.length - 1;
            removeOption(index);
          } else if (e.keyCode === KEY_CODES.ENTER_CODE) {
            const keywordsHolder = [...keywords, keywordsTextFieldValue];
            const newKeywords = onChange(e, keywordsHolder);
            onEnterInKeywordsAutocomplete(newKeywords);
          }
        }}
        renderTags={() =>
          keywords.map((tag, index) => (
            <Chip
              key={tag.displayName}
              size="small"
              label={tag.displayName}
              className="ms-1 subtitle-2-bold color-1F2830"
              onDelete={() => {
                removeOption(index);
              }}
            />
          ))
        }
        sx={{
          '& .MuiAutocomplete-input': {
            marginRight: '1.75rem',
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            autoFocus
            variant="outlined"
            placeholder={
              keywords.length
                ? ''
                : isEmployer
                ? 'Skills/Position'
                : 'Skills/Position'
            }
          />
        )}
      />
    </Stack>
  );
}
KeywordsAutocomplete.propTypes = {
  keywords: PropTypes.array,
  setKeywords: PropTypes.func,
  ratingId: PropTypes.number,
  setSnackbarOpen: PropTypes.func,
  onEnterInKeywordsAutocomplete: PropTypes.func,
  isEmployer: PropTypes.bool,
};

KeywordsAutocomplete.defaultProps = {
  keywords: EMPTY_ARRAY,
  setKeywords: noop,
  ratingId: DEFAULT_RATING,
  setSnackbarOpen: noop,
  onEnterInKeywordsAutocomplete: noop,
  isEmployer: false,
};
