import React from 'react';

function Spinner() {
  return (
    <div className="spinner">
      <svg
        style={{
          margin: 'auto',
          background: 'transparent none repeat scroll 0% 0%',
          display: 'block',
          shapeRendering: 'auto',
        }}
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle cx="50" cy="50" r="0" fill="none" stroke="#e1b0b2" strokeWidth="20">
          <animate attributeName="r" repeatCount="indefinite" dur="1.3333333333333333s" values="0;8" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"></animate>
          <animate attributeName="opacity" repeatCount="indefinite" dur="1.3333333333333333s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"></animate>
        </circle>
        <circle cx="50" cy="50" r="0" fill="none" stroke="#eee5b5" strokeWidth="20">
          <animate attributeName="r" repeatCount="indefinite" dur="1.3333333333333333s" values="0;8" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.6666666666666666s"></animate>
          <animate attributeName="opacity" repeatCount="indefinite" dur="1.3333333333333333s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.6666666666666666s"></animate>
        </circle>
      </svg>
    </div>
  );
}

export default Spinner;
