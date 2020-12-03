import React, { useState } from "react";
import "./EditCourse.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function EditCourse() {
  const [editCourseCollapsible, setEditCourseCollapsible] = useState(false);
  const [editCourseDetails, setEditCourseDetails] = useState(false);
  const [editCourseLecturesList, setEditCourseLecturesList] = useState(false);
  const [
    editCourseLecturesCollapsible,
    setEditCourseLecturesCollapsible,
  ] = useState(false);

  const handleShowEditCourseCollapsible = () => {
    editCourseCollapsible
      ? setEditCourseCollapsible(false)
      : setEditCourseCollapsible(true);
  };

  const handleShowEditCourseDetails = () => {
    editCourseDetails
      ? setEditCourseDetails(false)
      : setEditCourseDetails(true);
  };

  const handleShowEditLecturesList = () => {
    editCourseLecturesList
      ? setEditCourseLecturesList(false)
      : setEditCourseLecturesList(true);
    setEditCourseLecturesCollapsible(false);
  };

  const handleShowEditLecturesCollapsible = () => {
    editCourseLecturesCollapsible
      ? setEditCourseLecturesCollapsible(false)
      : setEditCourseLecturesCollapsible(true);
  };

  return (
    <div className='edit-course'>
      <div className='edit-course-collapsible'>
        <h1 className='edit-course-collapsible__title'>Edit Course</h1>
        <FontAwesomeIcon
          icon={faEllipsisH}
          className='edit-course-collapsible__nav-bar'
          onClick={handleShowEditCourseCollapsible}
        />
        {editCourseCollapsible && (
          <ul className='edit-course-collapsible__items'>
            <li className='edit-course-collapsible__item'>View Subscribers</li>
            <li className='edit-course-collapsible__item'>Duplicate</li>
            <li className='edit-course-collapsible__item'>Delete</li>
          </ul>
        )}
      </div>

      <div className='edit-course-container'>
        <div className='edit-course-details-card-container'>
          <article className='edit-course-details-card'>
            <p className='edit-course-details-card__description'>
              <span className='edit-course-details-card__title'>
                Course Details
              </span>
              <span className='edit-course-details-card__date'>
                Date Created: 12/03/2020
              </span>
            </p>
            {!editCourseDetails && (
              <button
                className='edit-course-details-card__button'
                onClick={handleShowEditCourseDetails}>
                Edit
              </button>
            )}
          </article>

          {editCourseDetails && (
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
                  <button className='edit-course-details-form__button'>
                    Save
                  </button>
                  <Link
                    className='edit-course-details-form__button edit-course-details-form__button--cancel'
                    onClick={handleShowEditCourseDetails}>
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className='edit-course-lectures-card-container'>
          <article className='edit-course-lectures-card'>
            <p className='edit-course-lectures-card__description'>
              <span className='edit-course-lectures-card__title'>
                Lecture List
              </span>
              <span className='edit-course-lectures-card__date'>
                Date Created: 12/03/2020
              </span>
            </p>
            <button
              className='edit-course-lectures-card__button'
              onClick={handleShowEditLecturesList}>
              {editCourseLecturesList ? "Cancel" : "View"}
            </button>
          </article>

          {editCourseLecturesList && (
            <div className='edit-course-lectures-list'>
              <article className='edit-course-lectures-list-card'>
                <p className='edit-course-lectures-list-card__description'>
                  <span className='edit-course-lectures-list-card__title'>
                    Lecture #1
                  </span>
                </p>
                <FontAwesomeIcon
                  icon={faEllipsisH}
                  className='edit-course-lectures-list-card__collapsible'
                  onClick={handleShowEditLecturesCollapsible}
                />

                {editCourseLecturesCollapsible && (
                  <ul className='edit-course-lectures-list-card__items'>
                    <li className='edit-course-lectures-list-card__item'>
                      Edit
                    </li>
                    <li className='edit-course-lectures-list-card__item'>
                      Duplicate
                    </li>
                    <li className='edit-course-lectures-list-card__item'>
                      Delete
                    </li>
                  </ul>
                )}
              </article>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
