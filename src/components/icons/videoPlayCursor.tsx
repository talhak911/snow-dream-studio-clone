// components/icons/VideoPlayCursor.tsx
import * as React from "react";

const VideoPlayCursor = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 100 100"
    {...props}
  >
    <rect width="100" height="100" fill="white" rx="8" />
    <polygon points="40,30 70,50 40,70" fill="#00CFF7" />
  </svg>
);

export default VideoPlayCursor;
