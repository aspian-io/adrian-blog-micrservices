import React from 'react';
import Image from 'next/image';
import showcase from './img/showcase.svg';

function AdrianShowcase() {
  return (
    <div className="container">
      <div className="row d-sm-flex align-items-center justify-content-between">
        <div className="col me-0 me-sm-5">
          <h1>
            Become a <span className="text-warning">Web Developer</span>
          </h1>
          <p className="lead my-4">
            We focus on teaching our students the fundamentals of the latest and
            greatest technologies to prepare them for their first dev role
          </p>
          <button
            className="btn btn-info btn-lg mb-4"
            data-bs-toggle="modal"
            data-bs-target="#enroll"
          >
            Start The Enrollment
          </button>
          <div
            className="modal fade"
            id="enroll"
            tabIndex={-1}
            aria-labelledby="enrollLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog text-primary">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="enrollLabel">
                    Enrollment Form
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="lead">
                    Fill out this form and we will get back to you
                  </p>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="first-name" className="col-form-label">
                        First Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="first-name"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="last-name" className="col-form-label">
                        Last Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="last-name"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="col-form-label">
                        Email:
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email-name"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="col-form-label">
                        Phone:
                      </label>
                      <input type="tel" className="form-control" id="phone" />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col d-none d-sm-flex mt-5">
          <Image src={showcase} alt="Showcase" width={700} height={380} />
        </div>
      </div>
    </div>
  );
}

export default AdrianShowcase;
