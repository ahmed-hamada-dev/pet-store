"use client";

import React from "react";

const Loader = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-md z-9999"
      role="status"
      aria-label="Loading"
    >
      <div className="relative p-10 bg-card border border-border rounded-3xl shadow-xl flex flex-col items-center animate-in fade-in zoom-in duration-500">
        {/* Running Cat and Laser Animation */}
        <div className="relative w-36 h-24 mb-6 flex items-center">
          <style jsx>{`
            .laser {
              width: 24px;
              height: 4px;
              background: linear-gradient(to right, #fb7185, #f43f5e);
              border-radius: 2px;
              position: absolute;
              top: 40px;
              left: 90px;
              box-shadow: 0 0 12px rgba(244, 63, 94, 0.9),
                0 0 20px rgba(244, 63, 94, 0.6);
              animation: chase 0.5s ease-in-out infinite;
            }
            .laser::after {
              content: "";
              position: absolute;
              width: 48px;
              height: 4px;
              background: linear-gradient(
                to left,
                rgba(251, 113, 133, 0.5),
                transparent
              );
              left: -48px;
              border-radius: 2px;
              opacity: 0.7;
              animation: trail 0.5s ease-in-out infinite;
            }
            @keyframes chase {
              0%, 100% { transform: translateX(0) scale(1); opacity: 0.6; }
              50% { transform: translateX(10px) scale(1.15); opacity: 1; }
            }
            @keyframes trail {
              0%, 100% { opacity: 0.5; transform: scaleX(1); }
              50% { opacity: 0.8; transform: scaleX(1.2); }
            }
            .ground {
              width: 120%;
              height: 2px;
              background: linear-gradient(to right, #6b7280, #9ca3af);
              position: absolute;
              bottom: -2px;
              left: -10%;
              opacity: 0.4;
              border-radius: 1px;
              transform: perspective(500px) rotateX(60deg);
            }
            .ground-shadow {
              width: 80%;
              height: 6px;
              background: radial-gradient(
                ellipse at center,
                rgba(75, 85, 99, 0.3) 0%,
                transparent 70%
              );
              position: absolute;
              bottom: -4px;
              left: 10%;
              filter: blur(3px);
              border-radius: 3px;
            }
            .cat-container {
              animation: cat-run 0.3s infinite ease-in-out;
            }
            @keyframes cat-run {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-4px); }
            }
          `}</style>

          {/* Laser Beam */}
          <div className="laser" />

          {/* Running Cat (SVG) */}
          <div className="absolute w-20 h-20 left-6 top-2 cat-container">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <style>
                {`
                  .cat-body { animation: bounce 0.3s infinite; }
                  .cat-head { animation: tilt 0.6s infinite; }
                  .cat-leg-front, .cat-leg-back { animation: run-front 0.3s infinite; }
                  .cat-leg-front-2, .cat-leg-back-2 { animation: run-back 0.3s infinite 0.15s; }
                  .cat-tail { animation: wag 0.5s ease-in-out infinite alternate; }
                  @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-2px); }
                  }
                  @keyframes tilt {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(2deg); }
                  }
                  @keyframes run-front {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-4px) rotate(15deg); }
                  }
                  @keyframes run-back {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-4px) rotate(-15deg); }
                  }
                  @keyframes wag {
                    0% { transform: rotate(-10deg); }
                    100% { transform: rotate(10deg); }
                  }
                `}
              </style>
              <rect className="cat-body text-muted-foreground" x="20" y="32" width="40" height="20" rx="10" fill="currentColor" />
              <circle className="cat-head text-muted-foreground" cx="60" cy="28" r="10" fill="currentColor" />
              <path className="text-muted-foreground" d="M58 20L62 14L66 20H58Z" fill="currentColor" />
              <rect className="cat-tail text-muted-foreground" x="14" y="40" width="20" height="5" rx="2.5" fill="currentColor" transform="rotate(-12 14 40)" />
              <rect className="cat-leg-front text-muted-foreground" x="30" y="48" width="8" height="14" rx="4" fill="currentColor" />
              <rect className="cat-leg-front-2 text-muted-foreground" x="42" y="48" width="8" height="14" rx="4" fill="currentColor" />
              <rect className="cat-leg-back text-muted-foreground" x="22" y="48" width="8" height="14" rx="4" fill="currentColor" />
              <rect className="cat-leg-back-2 text-muted-foreground" x="50" y="48" width="8" height="14" rx="4" fill="currentColor" />
            </svg>
          </div>

          {/* Ground Line and Shadow */}
          <div className="ground" />
          <div className="ground-shadow" />
        </div>

        {/* Chasing Text */}
        <p className="text-sm font-semibold text-primary animate-pulse">
          Chasing...
        </p>
      </div>
    </div>
  );
};

export default Loader;
