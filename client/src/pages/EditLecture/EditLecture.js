import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./EditLecture.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import CustomContentLoader from "../../components/CustomContentLoader/CustomContentLoader";
import ReactQuill from "react-quill";
import EditorFooter from "../../components/EditorFooter/EditorFooter";
import CourseEditorIconContainer from "../../components/CourseEditorIconContainer/CourseEditorIconContainer";

const validationSchema = Yup.object().shape({
  lecture_title: Yup.string().required("Required"),
  lecture_description: Yup.string().required("Required"),
  lecture_type: Yup.string()
    .oneOf(["Text", "Slide", "Video"], "Please choose a type")
    .required("Please choose a type"),
  lecture_length: Yup.string()
    .matches(/^[0-9:]+$/, {
      excludeEmptyString: true,
      message:
        "Please enter number followed by : e.g. 1:56 for 1 minute 56 seconds",
    })
    .required("Required"),
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
  handleGetCourseEdit,
  course,
}) {
  useEffect(() => {
    handleGetLectureEdit({
      courseId: match.params.courseId,
      lectureId: match.params.lectureId,
    });
    handleGetCourseEdit(match.params.courseId);
  }, [handleGetLectureEdit, handleGetCourseEdit, match]);

  const handleSubmit = ({
    lecture_title,
    lecture_content,
    lecture_google_slide,
    lecture_video_embed,
    lecture_length,
    lecture_type,
  }) => {
    handleUpdateLecture({
      lecture_title,
      lecture_content,
      lecture_google_slide,
      lecture_video_embed,
      lecture_length,
      lecture_type,
      course_id: match.params.courseId,
      lecture_id: match.params.lectureId,
    });
  };

  useEffect(() => {
    location.search && toast.dark("Lecture has been created successfully");
  }, [location]);

  return (
    <div className='edit-lecture-detail-page'>
      <ToastContainer />

      <CourseEditorIconContainer
        courseId={match.params.courseId}
        course={course}
      />

      {!success && loading && <CustomContentLoader />}
      {success && (
        <Formik
          initialValues={{
            lecture_title: lecture.lecture_title,
            lecture_slug: lecture.lecture_slug,
            lecture_content: lecture.lecture_content || "",
            lecture_google_slide: lecture.lecture_google_slide || "",
            lecture_video_embed: lecture.lecture_video_embed || "",
            lecture_attachment: lecture.lecture_attachment || "",
            lecture_length: lecture.lecture_length || "",
            lecture_type: lecture.lecture_type || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting, values }) => (
            <Form className='edit-lecture-detail-form'>
              <div className='edit-lecture-detail-form__input-container'>
                <label
                  htmlFor='Lecture Title'
                  className='edit-lecture-detail-form__input-label'>
                  Title
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
                  className='edit-lecture-detail-form__input-error'
                />
              </div>

              <div className='edit-lecture-detail-form__input-container'>
                <label
                  htmlFor='Lecture Type'
                  className='edit-lecture-detail-form__input-label'>
                  Please choose a type
                </label>

                <label className='edit-lecture-detail-form__input-label-radio'>
                  <Field name='lecture_type' type='radio' value='Text' /> Text
                </label>
                <label className='edit-lecture-detail-form__input-label-radio'>
                  <Field name='lecture_type' type='radio' value='Video' /> Video
                </label>
                <label className='edit-lecture-detail-form__input-label-radio'>
                  <Field name='lecture_type' type='radio' value='Slide' /> Slide
                </label>
                <ErrorMessage
                  name='lecture_type'
                  component='div'
                  className='edit-lecture-detail-form__input-error'
                />
              </div>

              {values.lecture_type === "Text" && (
                <div className='edit-lecture-detail-form__input-container'>
                  <label
                    htmlFor='Lecture Content'
                    className='edit-lecture-detail-form__input-label'>
                    Content
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
                    className='edit-lecture-detail-form__input-error'
                  />
                </div>
              )}
              {values.lecture_type === "Slide" && (
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
                    className='edit-lecture-detail-form__input-error'
                  />
                </div>
              )}
              {values.lecture_type === "Video" && (
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
                    className='edit-lecture-detail-form__input-error'
                  />
                </div>
              )}

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
                  htmlFor='Lecture Length'
                  className='edit-lecture-detail-form__input-label'>
                  Lecture Length
                </label>
                <Field
                  type='text'
                  name='lecture_length'
                  placeholder='Lecture Length'
                  className='edit-lecture-detail-form__input'
                />
                <ErrorMessage
                  name='lecture_length'
                  component='div'
                  className='edit-lecture-detail-form__input-error'
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
    course: state.getCourseEdit.course,
  };
};

export default connect(mapStateToProps)(withRouter(EditLecture));
