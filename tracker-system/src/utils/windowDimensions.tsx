import { useEffect, useState } from "react";

function getWindowSize(): {
  innerWidth: number;
  innerHeight: number;
} {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

export default function windowDimensions(): {
  innerWidth: number;
  innerHeight: number;
} {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize(): void {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return windowSize;
}
