import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_SELECTED_PAGE, EMPTY_ARRAY } from '../../../constants';
import SORT_BY from '../../../constants/sortBy';
import Jobs from '../Jobs';
import { getPostedJob } from '../jobs.service';
import JOB_TYPE from '../../../constants/jobType';

function EmployerJobs(props) {
  const { employerIdParam } = props;

  const [selectedPage, setSelectedPage] = useState(DEFAULT_SELECTED_PAGE);

  const [isSummarySkeletonShow, setIsSummarySkeletonShow] = useState(false);

  const [jobs, setJobs] = useState(EMPTY_ARRAY);

  const [count, setCount] = useState();

  const getJobEmployer = (employerId, page, sortBy) => {
    setIsSummarySkeletonShow(true);
    getPostedJob(employerId, page, sortBy)
      .then((res) => {
        setJobs(res.job);
        setCount(res.count);
      })
      .finally(() => setIsSummarySkeletonShow(false));
  };

  useEffect(() => {
    getJobEmployer(employerIdParam, selectedPage, SORT_BY.RELEVANCE);
  }, EMPTY_ARRAY);

  const paginationRequestToServer = (page) => {
    getJobEmployer(employerIdParam, page, SORT_BY.RELEVANCE);
    setSelectedPage(page);
  };

  const sortByRequestToServer = (sortBy) => {
    getJobEmployer(employerIdParam, DEFAULT_SELECTED_PAGE, sortBy);
    setSelectedPage(DEFAULT_SELECTED_PAGE);
  };

  return (
    <div>
      <Jobs
        selectedPage={selectedPage}
        paginationRequestToServer={paginationRequestToServer}
        sortByRequestToServer={sortByRequestToServer}
        jobsSummary={jobs}
        count={count}
        pageType={JOB_TYPE.NEW}
        isSummarySkeletonShow={isSummarySkeletonShow}
      />
    </div>
  );
}

EmployerJobs.propTypes = {
  employerIdParam: PropTypes.string,
};

EmployerJobs.defaultProps = {
  employerIdParam: undefined,
};

export default EmployerJobs;
