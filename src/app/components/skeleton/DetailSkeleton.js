import Skeleton from '@mui/material/Skeleton';

function DetailSkeleton() {
  return (
    <div className="col-12 col-md-6 ps-3 pt-2 pe-2 pb-1  bg-white border mb-3 rounded-3 mt-1 ms-3">
      <Skeleton variant="circular" width={70} height={70} />
      <Skeleton variant="text" width={300} height={20} className="mt-3" />
      <Skeleton variant="text" width={250} height={20} />
      <Skeleton
        variant="rectangular"
        width={150}
        height={40}
        className="mt-3"
      />
      <hr className="mt-3" />
      <Skeleton variant="text" width={300} height={20} className="mt-3" />
      <Skeleton variant="text" width={250} height={20} className="mb-3" />

      <Skeleton variant="text" width={300} height={20} className="mt-3" />
      <Skeleton variant="text" width={250} height={20} />
    </div>
  );
}
export default DetailSkeleton;
