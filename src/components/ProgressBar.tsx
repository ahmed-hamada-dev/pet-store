"use client";

import { AppProgressBar as NextNProgress } from "next-nprogress-bar";

export default function ProgressBar() {
  return (
    <NextNProgress
      color="#3B82F6"
      startPosition={0.2}
      stopDelay={400}
      height="4px"
      options={{ showSpinner: false }}
    />
  );
}
