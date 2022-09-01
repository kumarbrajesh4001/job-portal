import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { getRequest } from '../../services';
import {
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  DEFAULT_SELECTED_PAGE,
} from '../../constants';
import PostedJobDetails from './postedJobDetails';
import PostedJobSummary from './postedJobSummary';
import SummaryDetail from '../../components/summaryDetail';
import ErrorSnackBar from '../../components/snackBar/ErrorSnackBar';
import {
  getJob,
  updateJobsSummary,
  getJobDetail,
  updateJobStateInJobDetail,
} from './postedJobs.helper';
import ACTIONS from '../../constants/summaryDetail.actionTypes';
import SORT_BY from '../../constants/sortBy';
import UI from '../../constants/ui';

function PostedJobs() {
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(DEFAULT_SELECTED_PAGE);
  const [jobPostedData, setJobPostedData] = useState(EMPTY_ARRAY);

  const [jobDetail, setJobDetail] = useState(EMPTY_OBJECT);
  const [count, setCount] = useState();

  const [isSummarySkeletonShow, setIsSummarySkeletonShow] = useState();
  const [isDetailSkeletonShow, setIsDetailSkeletonShow] = useState();

  const [opensnackbar, setSnackbarOpen] = useState();

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen({ setopen: false });
  };

  const getPostedJobs = (
    page = DEFAULT_SELECTED_PAGE,
    sortBy = SORT_BY.RELEVANCE
  ) => {
    setIsSummarySkeletonShow(true);
    getRequest(`/employer/posted/job?page=${page}&sortby=${sortBy}`).then(
      (postedJobs) => {
        const jobs = postedJobs.job;
        setJobPostedData(jobs);
        setCount(postedJobs.count);
        setIsSummarySkeletonShow(false);
      }
    );
  };

  const paginationRequestToServer = (page) => {
    getPostedJobs(page);
    setSelectedPage(page);
  };

  const sortByRequestToServer = (sortBy) => {
    getPostedJobs(sortBy);
  };

  useEffect(() => {
    getPostedJobs(DEFAULT_SELECTED_PAGE);
  }, EMPTY_ARRAY);

  const onAction = ({ type, payload }) => {
    if (type === ACTIONS.ON_ACTION) {
      const { action, selectedId } = payload;
      const job = getJob(jobPostedData, selectedId);
      updateJobsSummary(
        jobPostedData,
        action.id,
        job,
        setSnackbarOpen,
        navigate
      ).then(([updatedJobs, updatedJobDetail]) => {
        setJobPostedData(updatedJobs);
        if (updatedJobDetail) {
          setJobDetail(updatedJobDetail);
        }
      });
    } else if (type === ACTIONS.ON_SELECT) {
      const { selectedId } = payload;

      if (selectedId) {
        const job = getJob(jobPostedData, selectedId);
        setIsDetailSkeletonShow(true);
        getJobDetail(job).then((jobDetailResponse) => {
          const updatedJobDetail = updateJobStateInJobDetail(
            jobPostedData,
            jobDetailResponse
          );
          setJobDetail(updatedJobDetail);
          setIsDetailSkeletonShow(false);
        });
      } else {
        setJobDetail();
      }
    } else if (type === ACTIONS.ON_PAGE_CHANGE) {
      const { page } = payload;
      paginationRequestToServer(page);
    } else if (type === ACTIONS.ON_SORT_BY) {
      const { sortBy } = payload;
      sortByRequestToServer(sortBy);
    }
  };

  return (
    <div>
      <div className="mt-3">
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs value={0} centered>
            <Tab label={UI.POSTED_JOB} />
          </Tabs>
        </Box>
        <hr />
      </div>
      <SummaryDetail
        selectedPage={selectedPage}
        list={jobPostedData}
        onAction={onAction}
        count={count}
        detail={jobDetail}
        summaryView={PostedJobSummary}
        detailView={PostedJobDetails}
        isSummarySkeletonShow={isSummarySkeletonShow}
        isDetailSkeletonShow={isDetailSkeletonShow}
      />
      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
    </div>
  );
}

export default PostedJobs;
