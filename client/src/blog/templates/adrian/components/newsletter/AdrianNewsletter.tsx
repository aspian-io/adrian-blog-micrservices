import React from 'react';

const AdrianNewsletter = () => {
  return (
    <div className="container">
      <div className="row d-md-flex justify-content-between align-items-center">
        <div className="col-md">
          <h3 className="mb-3 mb-md-0">Sign Up For Our Newsletter</h3>
        </div>

        <div className="col-md input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Email"
          />
          <button className="btn btn-primary btn-lg" type="button">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdrianNewsletter;
