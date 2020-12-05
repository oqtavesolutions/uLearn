import React from "react";
import "./Course.scss";

function Course() {
  return (
    <div className='course-landing-page'>
      <div className='course-landing-page-description'>
        <div className='course-landing-page-description__left'>
          <h1 className='course-landing-page-description__title'>
            How to learn javascript in 30 days
          </h1>
          <p className='course-landing-page-description__text'>
            Learning javascript in 30 days, learn data structure, algorithm and
            everything
          </p>
        </div>
        <button className='course-landing-page-description__button'>
          Enroll
        </button>
      </div>
      <div className='course-landing-page-modules'>
        <div className='course-landing-page-module'>
          <p className='course-landing-page-module__module-title'>Module 1</p>
          <p className='course-landing-page-module__module-title'>
            Module description
          </p>
        </div>
      </div>
      <div className='course-landing-page-author'>
        <div className='course-landing-page-author__avatar'></div>
        <div className='course-landing-page-author__description'>
          <p className='course-landing-page-author__name'>Author Name</p>
          <p className='course-landing-page-author__bio'>Author Description</p>
        </div>
      </div>
    </div>
  );
}

export default Course;
