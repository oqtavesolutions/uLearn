import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import "./EditLecture.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CustomContentLoader from "../../components/CustomContentLoader/CustomContentLoader";
import ReactQuill from "react-quill";
import EditorFooter from "../../components/EditorFooter/EditorFooter";

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
  loading,
}) {
  useEffect(() => {
    handleGetLectureEdit({
      courseId: match.params.courseId,
      lectureId: match.params.lectureId,
    });
  }, [handleGetLectureEdit, match]);

  const handleSubmit = ({
    lecture_title,
    lecture_description,
    lecture_content,
    lecture_google_slide,
    lecture_video_embed,
    lecture_attachment,
  }) => {
    handleUpdateLecture({
      lecture_title,
      lecture_description,
      lecture_content,
      lecture_google_slide,
      lecture_video_embed,
      lecture_attachment,
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
      <Link
        to={`/edit/course/${match.params.courseId}/lectures`}
        className='edit-lecture-detail-form-container__link'>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className='edit-lecture-detail-form-container__icon'
          size='1x'
        />
        <h1 className='edit-lecture-detail-form-container__title'>
          Editing Lecture
        </h1>
      </Link>{" "}
      {!success && loading && <CustomContentLoader />}
      {success && (
        <Formik
          initialValues={{
            lecture_title: lecture.lecture_title,
            lecture_description: lecture.lecture_description,
            lecture_slug: lecture.lecture_slug,
            lecture_content: lecture.lecture_content || "",
            lecture_google_slide: lecture.lecture_google_slide || "",
            lecture_video_embed: lecture.lecture_video_embed || "",
            lecture_attachment: lecture.lecture_attachment || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className='edit-lecture-detail-form'>
              <div className='edit-lecture-detail-form__input-container'>
                <label
                  htmlFor='Lecture Title'
                  className='edit-lecture-detail-form__input-label'>
                  Category
                </label>
                <Field
                  type='text'
                  name='lecture_title'
                  placeholder='Title'
                  className='edit-lecture-detail-form__input'
                />
                <ErrorMessage
                  name='lecture_title'
                  component='div'
                  className='edit-course-details-form__input-error'
                />
              </div>
              <div className='edit-lecture-detail-form__input-container'>
                <label
                  htmlFor='Lecture Description'
                  className='edit-lecture-detail-form__input-label'>
                  Short Description
                </label>
                <Field name='lecture_description'>
                  {({ field }) => (
                    <ReactQuill
                      value={field.value}
                      onChange={field.onChange(field.name)}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name='lecture_description'
                  component='div'
                  className='edit-course-details-form__input-error'
                />
              </div>
              <div className='edit-lecture-detail-form__input-container'>
                <label
                  htmlFor='Lecture Content'
                  className='edit-lecture-detail-form__input-label'>
                  Content (This is what students see in their lectures as
                  content)
                </label>
                <Field name='lecture_content'>
                  {({ field }) => (
                    <ReactQuill
                      value={field.value}
                      onChange={field.onChange(field.name)}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name='lecture_content'
                  component='div'
                  className='edit-course-details-form__input-error'
                />
              </div>
              <div className='edit-lecture-detail-form__input-container'>
                <label
                  htmlFor='Lecture Google Slide'
                  className='edit-lecture-detail-form__input-label'>
                  Google Slide
                </label>
                <Field
                  type='text'
                  name='lecture_google_slide'
                  placeholder='Google Slide Embed Url'
                  className='edit-lecture-detail-form__input'
                />
                <ErrorMessage
                  name='lecture_google_slide'
                  component='div'
                  className='edit-course-details-form__input-error'
                />
              </div>

              <div className='edit-lecture-detail-form__input-container'>
                <label
                  htmlFor='Lecture Vimeo Url'
                  className='edit-lecture-detail-form__input-label'>
                  Vimeo Url
                </label>
                <Field
                  type='text'
                  name='lecture_video_embed'
                  placeholder='Video Embed Url'
                  className='edit-lecture-detail-form__input'
                />
                <ErrorMessage
                  name='lecture_video_embed'
                  component='div'
                  className='edit-course-details-form__input-error'
                />
              </div>

              <div className='edit-lecture-detail-form__input-container'>
                <label
                  htmlFor='Lecture Slug'
                  className='edit-lecture-detail-form__input-label'>
                  Slug
                </label>
                <Field
                  type='text'
                  name='lecture_slug'
                  placeholder='Slug'
                  className='edit-lecture-detail-form__input edit-lecture-detail-form__input--disabled'
                  disabled={true}
                />
                <ErrorMessage
                  name='lecture_slug'
                  component='div'
                  className='edit-lecture-detail-form__input edit-lecture-detail-form__input--disabled'
                />
              </div>

              <div className='edit-lecture-detail-form__input-container'>
                <label
                  htmlFor='Lecture Attachment'
                  className='edit-lecture-detail-form__input-label'>
                  Attachment Url
                </label>
                <Field
                  type='text'
                  name='lecture_attachment'
                  placeholder='Attachment'
                  className='edit-lecture-detail-form__input'
                />
                <ErrorMessage
                  name='lecture_attachment'
                  component='div'
                  className='edit-course-details-form__input-error'
                />
              </div>

              <div className='edit-lecture-detail-form__buttons'>
                <EditorFooter />
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
