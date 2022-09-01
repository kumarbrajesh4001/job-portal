import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useSearchParams } from 'react-router-dom';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../../constants';
import { API_URL } from '../../../constants/apiUrls';
import UI from '../../../constants/ui';
import getPrefixAndUpperName from '../../../helpers/ prefixAndUpperName';
import { getEmployerDetail } from '../../employers/employers.services';
import TABS from './employer.constant';
import EmployerProfile from './EmployerProfile';
import EmployerJobs from './EmployerJobs';

function Employer() {
  const tabs = [{ value: TABS.PROFILE }, { value: TABS.EMPLOYER_JOBS }];

  const [employerDetail, setEmployerDetail] = useState(EMPTY_OBJECT);

  const [selectedTab, setSelectedTab] = useState(0);

  const [searchParams] = useSearchParams();
  const employerIdParam = searchParams.get('employerId');

  useEffect(() => {
    getEmployerDetail(employerIdParam).then(setEmployerDetail);
  }, EMPTY_ARRAY);

  const handleChange = (event, value) => {
    setSelectedTab(value);
  };

  return (
    <div className="container card-border">
      <div className="px-3 mt-3">
        {employerDetail?.logo ? (
          <img
            src={`${API_URL.PHOTO_PRE}${employerDetail?.logo}`}
            alt={UI.ALT_LOGO}
            className="logo-detail-size logo"
          />
        ) : (
          <span className="justify-content-center d-flex logo-detail-size logo-text logo">
            {getPrefixAndUpperName(employerDetail?.name)}
          </span>
        )}
      </div>
      <div className="headline-5-bold mt-2 px-3">{employerDetail?.name}</div>
      <div className="subtitle-1 color-5B5B5B px-3">
        {employerDetail?.address}
      </div>

      <div className="mt-3 mb-3">
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs value={selectedTab} onChange={handleChange} centered>
            {tabs.map((val, index) => (
              <Tab label={val.value} key={index} />
            ))}
          </Tabs>
        </Box>
        <hr />
      </div>
      {!selectedTab ? (
        <EmployerProfile employerDetail={employerDetail} />
      ) : (
        <EmployerJobs employerIdParam={employerIdParam} />
      )}
    </div>
  );
}

export default Employer;
