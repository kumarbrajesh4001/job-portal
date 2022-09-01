import { Box, Button, Grid, Stack, Typography, styled } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';

import { BsDownload } from 'react-icons/bs';
import { getFileName } from '../../../helpers/general';
import { getRelativeTime } from '../../../formatter/date';
import UI from '../../../constants/ui';
import { downloadFile } from '../../../services';

const Input = styled('input')({
  display: 'none',
});

function UploadFile(props) {
  const {
    onChange,
    onDelete,
    fileName,
    label,
    htmlFor,
    id,
    downloadTitle,
    deleteTitle,
    name,
    accept,
    uploadedTime,
    isLoading,
    supportedFormats,
    downloadPath,
  } = props;

  return (
    <div className=" mb-3 col-md-12">
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item xs={9} md={9}>
          <Typography>{label}</Typography>
          <span className="d-block caption color-5B5B5B">
            {UI.SUPPORTED_FORMATS} {supportedFormats}
          </span>
        </Grid>
        <Grid item xs={3} md={3} container justifyContent="flex-end">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box fullWidth component="label" htmlFor={htmlFor}>
              <Input
                accept={accept}
                id={id}
                name={name}
                type="file"
                onChange={onChange}
              />
              <Button
                color="error"
                variant="outlined"
                component="span"
                disabled={isLoading}
                startIcon={
                  isLoading && <CircularProgress size="1rem" color="inherit" />
                }
              >
                {UI.UPLOAD}
              </Button>
            </Box>
          </Stack>
        </Grid>

        {fileName && (
          <Grid item xs={8} md={9}>
            <Tooltip title={getFileName(fileName)}>
              <div style={{ width: '300px' }} className="body-1 text-truncate">
                {getFileName(fileName)}
              </div>
            </Tooltip>
            {uploadedTime && (
              <span className="d-block caption color-5B5B5B">
                {UI.UPLOADED_ON} {getRelativeTime(uploadedTime)}
              </span>
            )}
          </Grid>
        )}
        {fileName && (
          <Grid
            item
            xs={4}
            md={3}
            container
            justifyContent="flex-end"
            direction="row"
            alignItems="flex-end"
          >
            <Tooltip title={downloadTitle}>
              <span>
                <IconButton
                  aria-label="download"
                  color="primary"
                  onClick={() => {
                    downloadFile(downloadPath, getFileName(fileName));
                  }}
                >
                  <BsDownload />
                </IconButton>
              </span>
            </Tooltip>
            &nbsp;
            <Tooltip title={deleteTitle}>
              <span>
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => onDelete(name, fileName)}
                >
                  <DeleteIcon name="filedelete" />
                </IconButton>
              </span>
            </Tooltip>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
UploadFile.propTypes = {
  onChange: PropTypes.func,
  fileName: PropTypes.string,
  label: PropTypes.string,
  htmlFor: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  accept: PropTypes.string,
  supportedFormats: PropTypes.string,
  uploadedTime: PropTypes.string,
  downloadPath: PropTypes.string,
  downloadTitle: PropTypes.string,
  deleteTitle: PropTypes.string,
  onDelete: PropTypes.func,
  isLoading: PropTypes.bool,
};

UploadFile.defaultProps = {
  onChange: noop,
  fileName: undefined,
  label: undefined,
  htmlFor: undefined,
  id: undefined,
  name: undefined,
  accept: undefined,
  supportedFormats: undefined,
  uploadedTime: undefined,
  downloadPath: undefined,
  downloadTitle: undefined,
  deleteTitle: undefined,
  onDelete: noop,
  isLoading: false,
};
export default UploadFile;
