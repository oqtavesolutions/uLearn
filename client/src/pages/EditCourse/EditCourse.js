import React, { Fragment, useEffect, useRef, useState } from "react";
import "./EditCourse.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import LectureList from "./components/LectureList";
import { ToastContainer, toast } from "react-toastify";
import CustomContentLoader from "../../components/CustomContentLoader/CustomContentLoader";
import ReactQuill from "react-quill";

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
  location,
  lectures,
  lecturesLoading,
}) {
  const [editCourseCollapsible, setEditCourseCollapsible] = useState(false);
  const [
    editCourseDetailsCollapsible,
    setEditCourseDetailsCollapsible,
  ] = useState(false);
  const [editCourseDetails, setEditCourseDetails] = useState(false);
  const [editCourseLecturesList, setEditCourseLecturesList] = useState(false);

  useEffect(() => {
    handleGetCourseEdit(match.params.courseId);
  }, [handleGetCourseEdit, match]);

  useEffect(() => {
    updateSuccess && setEditCourseDetails(false);
  }, [updateSuccess, editCourseDetails]);

  useEffect(() => {
    location.search && toast.dark("Course has been created successfully");
  }, [location]);

  const handleShowEditCourseCollapsible = () => {
    setEditCourseCollapsible(!editCourseCollapsible);
  };

  const handleShowEditCourseDetailsCollapsible = () => {
    setEditCourseDetailsCollapsible(!editCourseDetailsCollapsible);
  };

  const handleShowEditCourseDetails = (e) => {
    e.preventDefault();
    setEditCourseDetails(!editCourseDetails);
    setEditCourseCollapsible(false);
  };

  const handleShowEditLecturesList = () => {
    handleGetCourseLectures(match.params.courseId);
    setEditCourseLecturesList(!editCourseLecturesList);
    setEditCourseDetailsCollapsible(false);
  };

  const handleFormSubmit = (values) => {
    handleUpdateCourse({
      ...values,
      course_id: match.params.courseId,
    });
  };

  const kebabWrapper = useRef(null);
  const detailsKebabWrapper = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (
        kebabWrapper.current !== null &&
        !kebabWrapper.current.contains(e.target)
      ) {
        setEditCourseCollapsible(false);
      }
    });
    // returned function will be called on component unmount
    return () => {
      document.removeEventListener("mousedown", () => {
        setEditCourseCollapsible(false);
      });
    };
  }, [kebabWrapper]);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (
        detailsKebabWrapper.current !== null &&
        !detailsKebabWrapper.current.contains(e.target)
      ) {
        setEditCourseDetailsCollapsible(false);
      }
    });
    // returned function will be called on component unmount
    return () => {
      document.removeEventListener("mousedown", () => {
        setEditCourseDetailsCollapsible(false);
      });
    };
  }, [kebabWrapper]);

  return (
    <div className='edit-course'>
      <ToastContainer />
      <div className='edit-course-collapsible'>
        <h1 className='edit-course-collapsible__title'>Edit Course</h1>
      </div>

      <div className='edit-course-container'>
        <div className='edit-course-details-card-container'>
          <article className='edit-course-details-card'>
            {!editCourseDetails && (
              <Fragment>
                <p className='edit-course-details-card__description'>
                  <span className='edit-course-details-card__title'>
                    Course Details
                  </span>
                  <span className='edit-course-details-card__sub'>
                    Edit your course details here.
                  </span>
                </p>

                <FontAwesomeIcon
                  icon={faEllipsisH}
                  className='edit-course-collapsible__nav-bar'
                  onClick={handleShowEditCourseCollapsible}
                />
              </Fragment>
            )}
            {editCourseCollapsible && (
              <ul className='edit-course-collapsible__items' ref={kebabWrapper}>
                <li
                  className='edit-course-collapsible__item'
                  onClick={handleShowEditCourseDetails}>
                  Edit
                </li>
                <li className='edit-course-collapsible__item'>
                  <Link to={"/course/" + course.course_slug}>View</Link>
                </li>
              </ul>
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
                    <div className='edit-course-details-form__input-container'>
                      <label
                        htmlFor='Course Title'
                        className='edit-course-details-form__input-label'>
                        Title
                      </label>
                      <Field
                        type='text'
                        name='course_title'
                        className='edit-course-details-form__input'
                        placeholder='Title'
                      />
                      <ErrorMessage
                        name='course_title'
                        component='div'
                        className='edit-course-details-form__input-error'
                      />
                    </div>
                    <div className='edit-course-details-form__input-container'>
                      <label
                        htmlFor='Description'
                        className='edit-course-details-form__input-label'>
                        Description
                      </label>
                      <Field name='course_description'>
                        {({ field }) => (
                          <ReactQuill
                            value={field.value}
                            onChange={field.onChange(field.name)}
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name='course_description'
                        component='div'
                        className='edit-course-details-form__input-error'
                      />
                    </div>
                    <div className='edit-course-details-form__input-container'>
                      <label
                        htmlFor='Course Slug'
                        className='edit-course-details-form__input-label'>
                        Slug
                      </label>
                      <Field
                        type='text'
                        name='course_slug'
                        placeholder='Slug'
                        className='edit-course-details-form__input edit-course-details-form__input--disabled'
                        disabled={true}
                      />
                      <ErrorMessage
                        name='course_slug'
                        component='div'
                        className='edit-course-details-form__input-error'
                      />
                    </div>
                    <div className='edit-course-details-form__input-container'>
                      <label
                        htmlFor='Course Category'
                        className='edit-course-details-form__input-label'>
                        Category
                      </label>
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
                      <ErrorMessage
                        name='course_categories'
                        component='div'
                        className='edit-course-details-form__input-error'
                      />
                    </div>
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
              <span className='edit-course-lectures-card__sub'>
                Create or edit lectures you have created
              </span>
            </p>
            <FontAwesomeIcon
              icon={faEllipsisH}
              className='edit-course-collapsible__nav-bar'
              onClick={handleShowEditCourseDetailsCollapsible}
            />

            {editCourseDetailsCollapsible && (
              <ul
                className='edit-course-collapsible__items'
                ref={detailsKebabWrapper}>
                <li
                  className='edit-course-collapsible__item'
                  onClick={handleShowEditCourseDetails}>
                  <Link
                    to={"/create/" + match.params.courseId + "/lecture"}
                    className='edit-course-collapsible__item-link'>
                    Create Lecture
                  </Link>
                </li>
                <li
                  className='edit-course-collapsible__item edit-course-collapsible__item-link'
                  onClick={handleShowEditLecturesList}>
                  View lectures
                </li>
              </ul>
            )}
          </article>
        </div>
        {editCourseLecturesList && (
          <div className='edit-course-lecture-list'>
            <p className='edit-course-lecture-list__title'>
              List of lectures created:
            </p>
            {lecturesLoading && <CustomContentLoader />}
            {!lecturesLoading && lectures && lectures.length === 0 && (
              <p className='edit-course-lecture-list__empty'>
                You have not created any lecture yet
              </p>
            )}

            {lectures &&
              lectures.length > 0 &&
              lectures.map((lecture) => (
                <LectureList key={lecture.id} lecture={lecture} />
              ))}
          </div>
        )}
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
  //  updateSuccess: PropTypes.bool.isRequired,
  lectures: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    course: state.getCourseEdit.course,
    updateSuccess: state.getCourseEdit.updatedCourse.success,
    lectures: state.getCourseEdit.lectures.lectures,
    lecturesLoading: state.getCourseEdit.lectures.loading,
  };
};

export default connect(mapStateToProps)(withRouter(EditCourse));
