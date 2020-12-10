import React from "react";
import { withRouter } from "react-router-dom";
import "./CreateCourse.scss";
import PropTypes from "prop-types";

function CreateCourse({ handleSubmit }) {
  return (
    <div className='create-course'>
      <h1 className='create-course__title'>Create Course</h1>
      <form className='create-course-form' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Course Title'
          className='create-course-form__input'
        />
        <textarea
          type='text'
          placeholder='Course Description'
          className='create-course-form__text-area'></textarea>
        <input
          type='text'
          placeholder='Course Slug'
          className='create-course-form__input'
        />
        <select className='create-course-form__category'>
          <option>Please Select a Category</option>
        </select>
        <button className='create-course-form__button'>SUBMIT</button>
      </form>
    </div>
  );
}

CreateCourse.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default withRouter(CreateCourse);
