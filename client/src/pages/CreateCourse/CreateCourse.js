import React from "react";
import "./CreateCourse.scss";

function CreateCourse() {
  return (
    <div className='create-course'>
      <h1 className='create-course__title'>Create Course</h1>
      <form className='create-course-form'>
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
        <button className='create-course-form__button'>SUBMIT</button>
      </form>
    </div>
  );
}

export default CreateCourse;
