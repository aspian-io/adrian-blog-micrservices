import React from 'react';

const AdrianSpinner = () => {
  return (
    <div
      className="d-flex vh-100 vw-100 align-items-center justify-content-center bg-light m-0 p-0"
      style={{ zIndex: 2000 }}
    >
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default AdrianSpinner;
