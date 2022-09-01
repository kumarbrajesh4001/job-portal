import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function CommonSkeleton() {
  return (
    <Box className="m-4">
      <h1>
        <Skeleton />
        <Skeleton animation="wave" />

        <Skeleton animation={false} />
      </h1>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <h1>
        <Skeleton />
        <Skeleton animation="wave" />

        <Skeleton animation={false} />
      </h1>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
}
