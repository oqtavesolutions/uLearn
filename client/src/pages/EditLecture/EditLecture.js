import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import "./EditLecture.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  lecture_title: Yup.string().required("Required"),
  lecture_description: Yup.string().required("Required"),
});

function EditLecture({
  handleGetLectureEdit,
  match,
  lecture,
  success,
  handleUpdateLecture,
  updatedSuccess,
  history,
  location,
  updatedLoading,
}) {
  useEffect(() => {
    handleGetLectureEdit({
      courseId: match.params.courseId,
      lectureId: match.params.lectureId,
    });
  }, [handleGetLectureEdit, match]);

  const handleSubmit = ({ lecture_title, lecture_description }) => {
    handleUpdateLecture({
      lecture_title,
      lecture_description,
      course_id: match.params.courseId,
      lecture_id: match.params.lectureId,
    });
  };

  useEffect(() => {
    location.search && toast.dark("Lecture has been created successfully");
  }, [location]);

  return (
    <div className='edit-lecture-detail-form-container'>
      <ToastContainer />
      <h1 className='edit-lecture-detail-form-container__title'>
        Editing Lecture
      </h1>

      {success && (
        <Formik
          initialValues={{
            lecture_title: lecture.lecture_title,
            lecture_description: lecture.lecture_description,
            lecture_slug: lecture.lecture_slug,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className='edit-lecture-detail-form'>
              <div className='edit-lecture-detail-form__input-container'>
                <Field
                  type='text'
                  name='lecture_title'
                  placeholder='Lecture Title'
                  className='edit-lecture-detail-form__input'
                />
                <ErrorMessage
                  name='lecture_title'
                  component='div'
                  className='edit-lecture-detail-form__input-error'
                />
              </div>{" "}
              <div className='edit-lecture-detail-form__input-container'>
                <Field
                  as='textarea'
                  name='lecture_description'
                  placeholder='Lecture Description'
                  className='edit-lecture-detail-form__text-area'
                />
                <ErrorMessage
                  name='lecture_description'
                  component='div'
                  className='edit-lecture-detail-form__input-error'
                />
              </div>
              <div className='edit-lecture-detail-form__input-container'>
                <Field
                  type='text'
                  name='lecture_slug'
                  placeholder='Lecture Slug'
                  className='edit-lecture-detail-form__input edit-lecture-detail-form__input--disabled'
                  disabled={true}
                />
                <ErrorMessage
                  name='lecture_slug'
                  component='div'
                  className='edit-lecture-detail-form__input-error'
                />
              </div>
              <div className='edit-lecture-detail-form__buttons'>
                <button
                  disabled={updatedLoading}
                  type='submit'
                  className='edit-lecture-detail-form__button'>
                  Save
                </button>
                <Link
                  to='/'
                  className='edit-lecture-detail-form__button edit-lecture-detail-form__button--cancel'
                  onClick={history.goBack}>
                  Cancel
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

EditLecture.propTypes = {
  handleGetLectureEdit: PropTypes.func.isRequired,
  handleUpdateLecture: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  lecture: PropTypes.object.isRequired,
  success: PropTypes.bool.isRequired,
  updatedSuccess: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  updatedLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    updatedSuccess: state.getLectureEdit.updatedLecture.success,
    updatedLoading: state.getLectureEdit.updatedLecture.loading,
  };
};

export default connect(mapStateToProps)(withRouter(EditLecture));
