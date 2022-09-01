import React, { useState, useEffect } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../../constants';
import ActionMenu from '../../../components/actionMenu';
import { API_URL } from '../../../constants/apiUrls';
import getPrefixAndUpperName from '../../../helpers/ prefixAndUpperName';
import { getCandidateActions } from '../employers.helper';
import Content from '../../../components/content';
import UI from '../../../constants/ui';
import EmployerTypesStatusAndTime from '../EmployerTypesStatusAndTime';
import Remark from '../../../components/remark';

function EmployerSummary(props) {
  const { onAction, item: employer } = props;
  const [candidateActions, setCandidateActions] = useState(EMPTY_ARRAY);

  useEffect(() => {
    const updatedCandidateActions = getCandidateActions(employer);
    setCandidateActions(updatedCandidateActions);
  }, [employer]);

  return (
    <>
      <div className="d-flex">
        <div className="me-1 me-md-3">
          {employer?.logo ? (
            <img
              src={`${API_URL.PHOTO_PRE}${employer.logo}`}
              alt={UI.ALT_LOGO}
              className="logo-summary-size logo"
            />
          ) : (
            <span className="justify-content-center d-flex logo">
              {getPrefixAndUpperName(employer?.name)}
            </span>
          )}
        </div>

        <div className="col text-truncate">
          <Content condition={employer?.name}>
            <span className="ps-4 ps-md-0 headline-5-bold">
              {employer.name}
            </span>
          </Content>
          <Content condition={employer?.city?.shortname}>
            <div className="ps-4 ps-md-0 subtitle-1 color-5B5B5B">
              {employer.city.shortname}
            </div>
          </Content>
        </div>
        <div>
          <ActionMenu actions={candidateActions} onAction={onAction} />
        </div>
      </div>

      <div className="mt-2">
        <a href={employer?.website} target="_blank" rel="noreferrer noopener">
          {employer?.website}
        </a>
      </div>

      <div className="my-2">
        <Content condition={employer?.linkedin}>
          <a
            href={employer?.linkedin}
            target="_blank"
            rel="noreferrer noopener"
          >
            <LinkedInIcon />
          </a>
        </Content>
        <Content condition={employer?.facebook}>
          <a
            href={employer?.facebook}
            target="_blank"
            rel="noreferrer noopener"
          >
            <FacebookIcon />
          </a>
        </Content>

        <Content condition={employer?.twitter}>
          <a href={employer?.twitter} target="_blank" rel="noreferrer noopener">
            <TwitterIcon />
          </a>
        </Content>
      </div>

      <div className="mt-3">
        <EmployerTypesStatusAndTime employer={employer} />
      </div>
      <Remark state={employer} />
    </>
  );
}

EmployerSummary.propTypes = {
  item: PropTypes.object,
  onAction: PropTypes.func,
};

EmployerSummary.defaultProps = {
  item: EMPTY_OBJECT,
  onAction: noop,
};

export default EmployerSummary;
