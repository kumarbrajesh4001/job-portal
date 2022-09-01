import React from 'react';
import PropTypes from 'prop-types';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import UI from '../../../constants/ui';
import {
  getCompanySize,
  getCompanyStage,
  getEngineerSize,
  getFunding,
} from '../../../formatter/commonBootstrap';
import { getDateInMMMYY } from '../../../formatter/date';
import { EMPTY_OBJECT } from '../../../constants';
import HeadingLabelValueView from '../../../components/headingLabelValueView';
import LabelValueView from '../../../components/labelValueView';
import Content from '../../../components/content';

function EmployerProfile(props) {
  const { employerDetail: employer } = props;

  return (
    <div className="px-3 pb-4">
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
  );
}

EmployerProfile.propTypes = {
  employerDetail: PropTypes.object,
};

EmployerProfile.defaultProps = {
  employerDetail: EMPTY_OBJECT,
};

export default EmployerProfile;
