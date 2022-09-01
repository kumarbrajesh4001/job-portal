import Skeleton from '@mui/material/Skeleton';
import useMobileDevice from '../../hooks/useMobileDevice';

function SummarySkeleton() {
  const isMobile = useMobileDevice();

  return (
    <div className="col-12 col-md-5 me-2">
      <div className="d-flex justify-content-between">
        <Skeleton variant="text" width={100} height={18} />
        <div className="d-flex">
          <Skeleton variant="text" width={100} height={18} />
          <Skeleton variant="text" width={100} height={18} className="ms-2" />
        </div>
      </div>
      {(isMobile ? [1, 2, 3, 4, 5] : [1, 2, 3]).map((val) => (
        <div
          className="ps-3 pt-2 pe-2 pb-1  bg-white border mb-3 rounded-3 mt-1"
          key={val}
        >
          <div className="d-flex">
            <Skeleton
              variant="circular"
              width={50}
              height={50}
              className="me-3"
            />
            <div>
              <Skeleton variant="text" width={200} height={20} />
              <Skeleton variant="text" width={150} height={20} />
            </div>
          </div>
          <div className="mt-3 mb-3">
            <Skeleton variant="text" width={275} height={20} />
            <Skeleton variant="text" width={200} height={20} />
          </div>
        </div>
      ))}
    </div>
  );
}
export default SummarySkeleton;
