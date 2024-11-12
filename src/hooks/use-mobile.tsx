import { useEffect, useState } from "react";

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

type BreakpointKey = keyof typeof breakpoints;
export const useMediaQuery = (breakpointName: BreakpointKey) => {
  const minWidth = breakpoints[breakpointName];

  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const onResize = () => {
      setMatches(window.innerWidth >= minWidth);
    };

    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [minWidth]);

  return matches;
};
