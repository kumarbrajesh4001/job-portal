import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Divider from '@mui/material/Divider';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Content from '../../../components/content';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../../constants';
import { API_URL } from '../../../constants/apiUrls';
import { getCandidateActions } from '../employers.helper';
import { getDateInMMMYY } from '../../../formatter/date';
import ActionMenu from '../../../components/actionMenu';
import getPrefixAndUpperName from '../../../helpers/ prefixAndUpperName';
import {
  getCompanySize,
  getCompanyStage,
  getEngineerSize,
  getFunding,
} from '../../../formatter/commonBootstrap';

import EmployerTypesStatusAndTime from '../EmployerTypesStatusAndTime';
import HeadingLabelValueView from '../../../components/headingLabelValueView';
import LabelValueView from '../../../components/labelValueView';
import UI from '../../../constants/ui';
import Remark from '../../../components/remark';

function EmployerDetail(props) {
  const { detail: employer, onAction } = props;
  const [candidateActions, setCandidateActions] = useState(EMPTY_ARRAY);

  useEffect(() => {
    const updatedCandidateActions = getCandidateActions(employer);
    setCandidateActions(updatedCandidateActions);
  }, [employer]);

  return (
    <>
      <div className="px-4 pt-3 pb-2">
        <div className="d-flex justify-content-between">
          <div>
            {employer?.name && (
              <div>
                {employer?.logo ? (
                  <img
                    src={`${API_URL.PHOTO_PRE}${employer?.logo}`}
                    alt={UI.ALT_LOGO}
                    className="logo-detail-size logo"
                  />
                ) : (
                  <span className="justify-content-center d-flex logo">
                    {getPrefixAndUpperName(employer?.name)}
                  </span>
                )}
              </div>
            )}
          </div>
          <div>
            <ActionMenu actions={candidateActions} onAction={onAction} />
          </div>
        </div>

        <div className="row mt-2">
          <Content condition={employer?.name}>
            <div className="col-12  headline-5-bold">{employer.name}</div>
          </Content>

          <Content condition={employer?.city?.shortname}>
            <div className="col-12  subtitle-1 color-5B5B5B">
              {employer.city.shortname}
            </div>
          </Content>
        </div>

        <div className="mt-3">
          <EmployerTypesStatusAndTime employer={employer} />
        </div>
        <Remark state={employer} />
      </div>
      <Divider />

      <div className="px-4 pb-4">
        <HeadingLabelValueView label={UI.COMPANY_DETAILS}>
          <LabelValueView
            condition={employer?.tagline}
            label={UI.COMPANY_TAGLINE}
            value={employer.tagline}
          />

          <LabelValueView
            condition={employer?.brief}
            label={UI.COMPANY_BRIEF}
            value={employer.brief}
            isValueHTML
          />

          <LabelValueView
            condition={employer?.founded}
            label={UI.FOUNDED_ON}
            value={getDateInMMMYY(employer.founded)}
          />
        </HeadingLabelValueView>

        <HeadingLabelValueView label={UI.CONTACT_DETAILS}>
          <LabelValueView
            condition={employer?.contactperson}
            label={UI.CONTACT_PERSON}
            value={employer.contactperson}
          />

          <LabelValueView
            condition={employer?.address}
            label={UI.ADDRESS}
            value={employer.address}
          />

          <LabelValueView
            condition={employer?.city?.name}
            label={UI.CITY}
            value={employer?.city?.name}
          />

          <LabelValueView
            condition={employer?.website}
            label={UI.WEBSITE}
            value={
              <a
                className="ms-1"
                href={employer?.website}
                target="_blank"
                rel="noreferrer noopener"
              >
                {employer?.website}
              </a>
            }
          />

          <LabelValueView
            condition={employer?.contactrole}
            label={UI.ROLE}
            value={employer?.contactrole}
          />
        </HeadingLabelValueView>

        <HeadingLabelValueView label={UI.OTHER_DETAILS}>
          <LabelValueView
            condition={employer?.companysize}
            label={UI.COMPANY_SIZE}
            value={getCompanySize(employer.companysize)}
          />

          <LabelValueView
            condition={employer?.funding}
            label={UI.FUNDING}
            value={getFunding(employer.funding)}
          />

          <LabelValueView
            condition={employer?.companystage}
            label={UI.COMPANY_STAGE}
            value={getCompanyStage(employer.companystage)}
          />

          <LabelValueView
            condition={employer?.engineersize}
            label={UI.ENGINEERS_SIZE}
            value={getEngineerSize(employer.engineersize)}
          />

          <LabelValueView
            condition={employer?.techstack}
            label={UI.TECHNOLOGY_STACK}
            value={employer?.techstack?.join(', ')}
          />

          <LabelValueView
            condition={
              employer?.linkedin || employer?.facebook || employer?.twitter
            }
            label={UI.SOCIAL}
            value={
              <>
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
                  <a
                    href={employer?.twitter}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <TwitterIcon />
                  </a>
                </Content>
              </>
            }
          />
        </HeadingLabelValueView>
      </div>
    </>
  );
}

EmployerDetail.propTypes = {
  detail: PropTypes.object,
  onAction: PropTypes.func,
};

EmployerDetail.defaultProps = {
  detail: EMPTY_OBJECT,
  onAction: noop,
};

export default EmployerDetail;
