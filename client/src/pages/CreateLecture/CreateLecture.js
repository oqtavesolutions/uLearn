import React from "react";
import { withRouter } from "react-router-dom";
import "./CreateLecture.scss";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthenticatedRequest } from "../../utils/axios";

const validationSchema = Yup.object().shape({
  lecture_title: Yup.string().required("Required"),
  lecture_description: Yup.string().required("Required"),
  lecture_slug: Yup.string()
    .matches(/^[a-zA-Z0-9-_]+$/, {
      excludeEmptyString: true,
      message: "Cannot contain space or characters except for _ and -",
    })
    .test("checkDuplSlug", "Slug already exists", function (value) {
      return new Promise(async (resolve, reject) => {
        try {
          await AuthenticatedRequest.get(
            "/lecture/content/validation/" + value
          );
          return resolve(false);
        } catch (error) {
          resolve(true);
        }
      });
    })
    .required("Required"),
});

function CreateLecture({ handleCreateLecture, match, loading }) {
  const handleSubmit = ({
    lecture_title,
    lecture_description,
    lecture_slug,
    lecture_content,
    lecture_google_slide,
    lecture_video_embed,
    lecture_attachment,
  }) => {
    handleCreateLecture({
      lecture_title,
      lecture_description,
      lecture_slug,
      lecture_content,
      lecture_google_slide,
      lecture_video_embed,
      lecture_attachment,
      course_id: match.params.courseId,
    });
  };
  return (
    <div className='create-lecture-page'>
      <ToastContainer />
      <h1 className='create-lecture__title'>Create Lecture</h1>
      <Formik
        initialValues={{
          lecture_title: "",
          lecture_description: "",
          lecture_slug: "",
          lecture_content: "",
          lecture_google_slide: "",
          lecture_video_embed: "",
          lecture_attachment: "",
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className='create-lecture-form'>
            <div className='create-lecture-form__input-container'>
              <Field
                type='text'
                name='lecture_title'
                placeholder='Title'
                className='create-lecture-form__input'
              />
              <ErrorMessage
                name='lecture_title'
                component='div'
                className='edit-course-details-form__input-error'
              />
            </div>
            <div className='create-lecture-form__input-container'>
              <Field
                as='textarea'
                name='lecture_description'
                placeholder='Description'
                className='create-lecture-form__text-area'
              />
              <ErrorMessage
                name='lecture_description'
                component='div'
                className='edit-course-details-form__input-error'
              />
            </div>
            <div className='create-lecture-form__input-container'>
              <Field
                as='textarea'
                name='lecture_content'
                placeholder='Content'
                className='create-lecture-form__text-area'
              />
              <ErrorMessage
                name='lecture_content'
                component='div'
                className='edit-course-details-form__input-error'
              />
            </div>
            <div className='create-lecture-form__input-container'>
              <Field
                type='text'
                name='lecture_google_slide'
                placeholder='Google Slide Embed Code'
                className='create-lecture-form__input'
              />
              <ErrorMessage
                name='lecture_google_slide'
                component='div'
                className='edit-course-details-form__input-error'
              />
            </div>

            <div className='create-lecture-form__input-container'>
              <Field
                type='text'
                name='lecture_video_embed'
                placeholder='Video Embed Code'
                className='create-lecture-form__input'
              />
              <ErrorMessage
                name='lecture_video_embed'
                component='div'
                className='edit-course-details-form__input-error'
              />
            </div>

            <div className='create-lecture-form__input-container'>
              <Field
                type='text'
                name='lecture_slug'
                placeholder='Slug'
                className='create-lecture-form__input'
              />
              <ErrorMessage
                name='lecture_slug'
                component='div'
                className='edit-course-details-form__input-error'
              />
            </div>

            <div className='create-lecture-form__input-container'>
              <Field
                type='text'
                name='lecture_attachment'
                placeholder='Attachment'
                className='create-lecture-form__input'
              />
              <ErrorMessage
                name='lecture_attachment'
                component='div'
                className='edit-course-details-form__input-error'
              />
            </div>

            <button
              type='submit'
              className='create-lecture-form__button'
              disabled={loading}>
              SUBMIT
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

CreateLecture.propTypes = {
  handleCreateLecture: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default withRouter(CreateLecture);
