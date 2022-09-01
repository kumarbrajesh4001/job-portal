const mergeCountWithData = (postedJobs, columnId, key, countResponse) =>
  postedJobs.map((postedJob) => {
    if (postedJob?.id === key) {
      return { ...postedJob, [columnId]: countResponse?.count };
    }
    return postedJob;
  });

export default mergeCountWithData;
