import React from "react";
import { Link } from "react-router-dom";
import "./EditLecture.scss";

function EditLecture() {
  return (
    <div className='edit-lecture-detail-form-container'>
      <h1 className='edit-lecture-detail-form-container__title'>
        Editing Lecture
      </h1>
      <form className='edit-lecture-detail-form'>
        <input
          type='text'
          placeholder='Course Title'
          className='edit-lecture-detail-form__input'
        />
        <textarea
          type='text'
          placeholder='Course Description'
          className='edit-lecture-detail-form__text-area'></textarea>
        <input
          type='text'
          placeholder='Course Slug'
          className='edit-lecture-detail-form__input'
        />
        <div className='edit-lecture-detail-form__buttons'>
          <button className='edit-lecture-detail-form__button'>Save</button>
          <Link
            to='/'
            className='edit-lecture-detail-form__button edit-lecture-detail-form__button--cancel'>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditLecture;
