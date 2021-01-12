import React, { Fragment, useEffect } from "react";
import "./EditCourse.scss";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import CustomContentLoader from "../../components/CustomContentLoader/CustomContentLoader";
import ReactQuill from "react-quill";

import CourseEditorIconContainer from "../../components/CourseEditorIconContainer/CourseEditorIconContainer";
import EditorFooter from "../../components/EditorFooter/EditorFooter";

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
  loading,
  handleUpdateCourse,
  updateSuccess,
  location,
}) {
  useEffect(() => {
    handleGetCourseEdit(match.params.courseId);
  }, [handleGetCourseEdit, match]);

  useEffect(() => {
    location.search && toast.dark("Course has been created successfully");
  }, [location]);

  const handleFormSubmit = (values) => {
    handleUpdateCourse({
      ...values,
      course_id: match.params.courseId,
    });
  };

  return (
    <Fragment>
      {loading && <CustomContentLoader />}
      {success && (
        <div className='edit-course'>
          <ToastContainer />
          <div className='edit-course-collapsible'>
            <h1 className='edit-course-collapsible__title'>
              {course.course_title}
            </h1>
          </div>
          <CourseEditorIconContainer courseId={match.params.courseId} />
          <div className='edit-course-container'>
            <div className='edit-course-details-form-container'>
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
                      <EditorFooter />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

EditCourse.propTypes = {
  handleGetCourseEdit: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  success: PropTypes.bool.isRequired,
  course: PropTypes.object.isRequired,
  handleUpdateCourse: PropTypes.func.isRequired,
  //  updateSuccess: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    course: state.getCourseEdit.course,
    updateSuccess: state.getCourseEdit.updatedCourse.success,
  };
};

export default connect(mapStateToProps)(withRouter(EditCourse));
