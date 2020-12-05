import React from "react";
import { Link } from "react-router-dom";
import "./EditLecture.scss";

function EditLecture() {
  return (
    <div className='edit-course-details-form-container'>
      <h1 className='edit-course-details-form-container__title'>
        Editing Course
      </h1>
      <form className='edit-course-details-form'>
        <input
          type='text'
          placeholder='Course Title'
          className='edit-course-details-form__input'
        />
        <textarea
          type='text'
          placeholder='Course Description'
          className='edit-course-details-form__text-area'></textarea>
        <input
          type='text'
          placeholder='Course Slug'
          className='edit-course-details-form__input'
        />
        <div className='edit-course-details-form__buttons'>
          <button className='edit-course-details-form__button'>Save</button>
          <Link
            to='/'
            className='edit-course-details-form__button edit-course-details-form__button--cancel'>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditLecture;
