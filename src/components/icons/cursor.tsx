import * as React from "react";

const Cursor = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    {...props}
  >
    {/* Optional transparent background for debugging */}
    {/* <rect width="100%" height="100%" fill="transparent" /> */}

    <rect
      width="20"
      height="20"
      x="2.5"
      y="2.5"
      fill="#00CFF7"
      stroke="#000"
      strokeWidth="1"
      rx="2"
    />
  </svg>
);

export default Cursor;
