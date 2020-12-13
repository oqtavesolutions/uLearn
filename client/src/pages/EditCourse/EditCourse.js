import React, { useEffect, useState } from "react";
import "./EditCourse.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import LectureList from "./components/LectureList";

const validationSchema = Yup.object().shape({
  course_title: Yup.string().required("Required"),
  course_description: Yup.string().required("Required"),
  course_categories: Yup.string()
    .oneOf(
      [
        "IT & Software",
        "Business",
        "Finance & Accounting",
        "Productivity",
        "Design",
        "Marketing",
        "Health",
        "Music",
        "Others",
      ],
      "Please choose category"
    )
    .required("Please choose category"),
});

function EditCourse({
  handleGetCourseEdit,
  match,
  success,
  course,
  handleGetCourseLectures,
  handleUpdateCourse,
  updateSuccess,
  lectures,
}) {
  const [editCourseCollapsible, setEditCourseCollapsible] = useState(false);
  const [editCourseDetails, setEditCourseDetails] = useState(false);
  const [editCourseLecturesList, setEditCourseLecturesList] = useState(false);

  useEffect(() => {
    handleGetCourseEdit(match.params.courseId);
  }, [handleGetCourseEdit, match]);

  useEffect(() => {
    updateSuccess && setEditCourseDetails(false);
  }, [updateSuccess, editCourseDetails]);

  const handleShowEditCourseCollapsible = () => {
    setEditCourseCollapsible(!editCourseCollapsible);
  };

  const handleShowEditCourseDetails = (e) => {
    e.preventDefault();
    setEditCourseDetails(!editCourseDetails);
  };

  const handleShowEditLecturesList = () => {
    handleGetCourseLectures(match.params.courseId);
    setEditCourseLecturesList(!editCourseLecturesList);
  };

  const handleFormSubmit = (values) => {
    handleUpdateCourse({
      ...values,
      course_id: match.params.courseId,
    });
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

          {success && editCourseDetails && (
            <div className='edit-course-details-form-container'>
              <h1 className='edit-course-details-form-container__title'>
                Editing Course
              </h1>
              <Formik
                initialValues={{
                  course_title: course.course_title,
                  course_description: course.course_description,
                  course_slug: course.course_slug,
                  course_categories: course.course_categories,
                }}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}>
                {({ isSubmitting }) => (
                  <Form className='edit-course-details-form'>
                    <Field
                      type='text'
                      name='course_title'
                      placeholder='Course Title'
                      className='edit-course-details-form__input'
                    />
                    <ErrorMessage name='course_title' component='div' />
                    <Field
                      as='textarea'
                      name='course_description'
                      placeholder='Course Description'
                      className='edit-course-details-form__text-area'
                    />
                    <ErrorMessage name='course_description' component='div' />
                    <Field
                      type='text'
                      name='course_slug'
                      placeholder='Course Slug'
                      className='edit-course-details-form__input edit-course-details-form__input--disabled'
                      disabled={true}
                    />
                    <ErrorMessage name='course_slug' component='div' />
                    <Field
                      as='select'
                      name='course_categories'
                      className='edit-course-details-form__category'>
                      <option>Please Select a Category</option>
                      <option value='IT & Software'>IT & Software</option>
                      <option value='Business'>Business</option>
                      <option value='Finance & Accounting'>
                        Finance & Accounting
                      </option>
                      <option value='Productivity'>Productivity</option>
                      <option value='Design'>Design</option>
                      <option value='Marketing'>Marketing</option>
                      <option value='Health'>Health</option>
                      <option value='Music'>Music</option>
                      <option value='Others'>Others</option>
                    </Field>
                    <ErrorMessage name='course_categories' component='div' />
                    <div className='edit-course-details-form__buttons'>
                      <button
                        disabled={isSubmitting}
                        type='submit'
                        className='edit-course-details-form__button'>
                        Save
                      </button>
                      <Link
                        to='/'
                        className='edit-course-details-form__button edit-course-details-form__button--cancel'
                        onClick={handleShowEditCourseDetails}>
                        Cancel
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
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
            <Link
              to={"/create/" + match.params.courseId + "/lecture"}
              className='edit-course-lectures-card__button'
              onClick={handleShowEditLecturesList}>
              Create Lecture
            </Link>
            <button
              className='edit-course-lectures-card__button'
              onClick={handleShowEditLecturesList}>
              {editCourseLecturesList ? "Cancel" : "View"}
            </button>
          </article>
          {editCourseLecturesList && (
            <div className='edit-course-lectures-list'>
              {lectures &&
                lectures.map((lecture) => (
                  <LectureList key={lecture.id} lecture={lecture} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

EditCourse.propTypes = {
  handleGetCourseEdit: PropTypes.func.isRequired,
  handleGetCourseLectures: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  success: PropTypes.bool.isRequired,
  course: PropTypes.object.isRequired,
  handleUpdateCourse: PropTypes.func.isRequired,
  updateSuccess: PropTypes.bool.isRequired,
  lectures: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    course: state.getCourseEdit.course,
    updateSuccess: state.getCourseEdit.updatedCourse.success,
    lectures: state.getCourseEdit.lectures.lectures,
  };
};

export default connect(mapStateToProps)(withRouter(EditCourse));
